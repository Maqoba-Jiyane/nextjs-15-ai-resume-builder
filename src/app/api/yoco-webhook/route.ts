// app/api/yoco-webhook/route.ts
import { NextRequest } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ---- Email setup -----------------------------------------------------------

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

// ---- Small helpers ---------------------------------------------------------

const WINDOW_SECONDS = 3 * 60; // 3 minutes clock skew tolerance

function extractV1Signatures(header: string): string[] {
  // Accept: "v1,BASE64 v1,BASE64"
  return header
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [ver, sig] = chunk.split(",", 2);
      return ver?.toLowerCase() === "v1" && sig ? sig.trim() : null;
    })
    .filter((s): s is string => !!s);
}

// Parse the compact reference we sent when creating the checkout
// e.g. "paymentId=...&plan=premium&cycle=monthly&resumeId=...&coupon=..."
function parseReference(ref?: string | null): Record<string, string> {
  if (!ref) return {};
  const out: Record<string, string> = {};
  const sp = new URLSearchParams(ref);
  sp.forEach((v, k) => (out[k] = v));
  return out;
}

// ---- Handler ---------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // 1) Headers
    const id = req.headers.get("webhook-id");
    const ts = req.headers.get("webhook-timestamp");
    const sigHeader = req.headers.get("webhook-signature");

    if (!id || !ts || !sigHeader) {
      console.log("Missing signature headers");
      return new Response("Missing signature headers", { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000);
    const tsNum = Number(ts);
    if (!Number.isFinite(tsNum) || tsNum + WINDOW_SECONDS < now) {
      console.log("Request expired");
      return new Response("Request expired", { status: 400 });
    }

    // 2) Get raw body (must be BYTES, not parsed JSON)
    const rawBuf = Buffer.from(await req.arrayBuffer());
    const prefix = Buffer.from(`${id}.${ts}.`, "utf8");
    const signedBytes = Buffer.concat([prefix, rawBuf]);

    // 3) Build expected signature
    const fullSecret = process.env.WEBHOOK_SECRET;
    if (!fullSecret || !fullSecret.startsWith("whsec_")) {
      return new Response("Server misconfigured: WEBHOOK_SECRET", {
        status: 500,
      });
    }
    const secretBytes = Buffer.from(fullSecret.split("_")[1], "base64");
    const expected = crypto
      .createHmac("sha256", secretBytes)
      .update(signedBytes)
      .digest("base64");

    // 4) Compare against any v1 signature (timing-safe)
    const candidates = extractV1Signatures(sigHeader);
    const ok = candidates.some((sig) => {
      const a = Buffer.from(expected);
      const b = Buffer.from(sig);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    });
    if (!ok) {
      console.warn("[Yoco webhook] signature mismatch", { id, ts });
      return new Response("Invalid signature", { status: 400 });
    }

    // 5) Verified — parse JSON now
    const body = JSON.parse(rawBuf.toString("utf8")) as {
      type?: string; // e.g. "payment.succeeded"
      payload?: {
        id?: string; // checkoutId
        reference?: string; // our compact metadata
        metadata?: {
          checkoutId?: string;
        };
      };
    };

    const eventType = body.type ?? "";
    const checkoutId = body.payload?.metadata?.checkoutId ?? null;
    const ref = parseReference(body.payload?.reference ?? null);
    const paymentIdFromRef = ref.paymentId; // we injected this when creating the checkout

    if (!checkoutId && !paymentIdFromRef) {
      console.log("Missing identifiers");
      return new Response("Missing identifiers", { status: 400 });
    }

    // 6) Idempotency: skip if we’ve already processed this webhook-id
    await prisma.webhookEvent.create({ data: { eventId: id } }).catch(() => {
      return new Response("Already processed", { status: 200 });
    });

    // 7) Find the Payment row
    const payment = await prisma.payment.findFirst({ where: { checkoutId } });

    console.log("payment: ", payment);

    if (!payment) {
      console.warn("[Yoco webhook] payment not found", {
        eventType,
        paymentIdFromRef,
        checkoutId,
      });
      return new Response("OK", { status: 200 });
    }

    // 8) If already PAID, treat as idempotent
    if (payment.status === PaymentStatus.PAID) {
      return new Response("OK", { status: 200 });
    }

    // We'll store affiliate email here during the transaction
    let affiliateEmail: string | null = null;

    // 9) Handle event types
    if (eventType === "payment.succeeded") {
      await prisma.$transaction(async (tx) => {
        const updated = await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.PAID,
            paidAt: new Date(),
            checkoutId: payment.checkoutId ?? checkoutId ?? undefined,
          },
        });

        // Mark resume as paid
        if (updated.resumeId) {
          await tx.resume.update({
            where: { id: updated.resumeId },
            data: { paid: true },
          });
        }

        // Get user with referredByCode
        const user = await tx.user.findUnique({
          where: { userId: updated.userId },
          select: {
            referredByCode: true,
            email: true
          },
        });

        if (user?.referredByCode) {
          // Update affiliate + capture affiliate email for email sending
          await tx.affiliate.update({
            where: { code: user.referredByCode },
            data: {
              totalPurchases: { increment: 1 },
              totalCommission: { increment: 400 }, // adjust if dynamic
            },
          });

          affiliateEmail = user.email ?? null;
        }
      });

      // Send commission email *after* transaction commits
      if (affiliateEmail) {
        try {
          const { subject, html } = affiliatePurchaseEmail({
            amount: 400, // cents or rand? adjust to your logic
            dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/earn-with-us/dashboard`,
          });

          const mailOptions: MailOptions = {
            from: `"Eon Resume" <${process.env.SMTP_USER}>`,
            to: affiliateEmail,
            subject,
            html,
          };

          await transporter.sendMail(mailOptions);
        } catch (emailErr) {
          console.error("Error sending affiliate purchase email:", emailErr);
        }
      }
    } else if (
      eventType === "payment.failed" ||
      eventType === "payment.canceled"
    ) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED },
      });
    } else {
      // Unknown/ignored event — store payload for audit, keep status
      await prisma.payment.update({
        where: { id: payment.id },
        data: { webhookPayload: body },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("🚨 Webhook Processing Error:", err);
    // Always return 2xx to prevent Yoco from retry storms in production,
    // unless you explicitly want retries.
    return new Response("OK", { status: 200 });
  }
}

/* -------------------------------------------------------------------------- */
/*                          EMAIL TEMPLATE FOR AFFILIATE                      */
/* -------------------------------------------------------------------------- */

function affiliatePurchaseEmail({
  amount,
  dashboardUrl,
}: {
  amount: number;
  dashboardUrl: string;
}) {
  return {
    subject: "💸 You Just Earned Commission with Eon Resume!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color:#f6f6f6;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
          <h2 style="margin-top:0;">💸 You Just Earned Commission!</h2>
          <p>Great news! A customer purchased using your Eon Resume affiliate link.</p>
          <p style="font-size: 18px; font-weight: bold;">
            Commission earned: R${(amount / 100).toFixed(2)}
          </p>
          <p>This amount has been added to your affiliate balance.</p>

          <p style="margin-top: 24px;">
            <a href="${dashboardUrl}"
               style="background:#2196f3;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;text-decoration:none;">
              View Your Affiliate Dashboard
            </a>
          </p>

          <p style="margin-top:16px;font-size:12px;color:#777;">
            If you believe this email was sent in error, please contact our support team.
          </p>
        </div>
      </div>
    `,
  };
}
