// app/api/yoco-webhook/route.ts
import { NextRequest } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export const runtime = "nodejs";

// ---- Small helpers ----------------------------------------------------------

const WINDOW_SECONDS = 3 * 60; // 3 minutes clock skew tolerance

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function extractV1Signatures(header: string): string[] {
  // Accept: "v1,BASE64 v1,BASE64"
  return header
    .split(/\s+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(chunk => {
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
      return new Response("Missing signature headers", { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000);
    const tsNum = Number(ts);
    if (!Number.isFinite(tsNum) || tsNum + WINDOW_SECONDS < now) {
      return new Response("Request expired", { status: 400 });
    }

    // 2) Get raw body (must be BYTES, not parsed JSON)
    const rawBuf = Buffer.from(await req.arrayBuffer());
    const prefix = Buffer.from(`${id}.${ts}.`, "utf8");
    const signedBytes = Buffer.concat([prefix, rawBuf]);

    // 3) Build expected signature
    const fullSecret = process.env.WEBHOOK_SECRET;
    if (!fullSecret || !fullSecret.startsWith("whsec_")) {
      return new Response("Server misconfigured: WEBHOOK_SECRET", { status: 500 });
    }
    const secretBytes = Buffer.from(fullSecret.split("_")[1], "base64");
    const expected = crypto.createHmac("sha256", secretBytes).update(signedBytes).digest("base64");

    // 4) Compare against any v1 signature (timing-safe)
    const candidates = extractV1Signatures(sigHeader);
    const ok = candidates.some(sig => {
      const a = Buffer.from(expected);
      const b = Buffer.from(sig);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    });
    if (!ok) {
      // Minimal logging in prod; avoid leaking payload/signature
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
          checkoutId?: string
        };
      };
    };

    const eventType = body.type ?? "";
    const checkoutId = body.payload?.metadata?.checkoutId ?? null;
    const ref = parseReference(body.payload?.reference ?? null);
    const paymentIdFromRef = ref.paymentId; // we injected this when creating the checkout

    if (!checkoutId && !paymentIdFromRef) {
      return new Response("Missing identifiers", { status: 400 });
    }

    // 6) Idempotency: skip if we’ve already processed this webhook-id
    //    (Optional table; if you don't have one yet, you can skip this block.)
    await prisma.webhookEvent.create({ data: { eventId: id } }).catch(() => {
      return new Response("Already processed", { status: 200 });
    });

    // 7) Find the Payment row:
    //    Prefer paymentId from reference, fallback to checkoutId lookup.
    const payment = await prisma.payment.findFirst({ where: { checkoutId } });

    if (!payment) {
      // Don’t 404 webhooks in production; return 200 to avoid retries,
      // but log for investigation.
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

    // 9) Handle event types
    if (eventType === "payment.succeeded") {
      // In a transaction, mark payment PAID and bump user premium
      await prisma.$transaction(async (tx) => {
        const updated = await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.PAID,
            paidAt: new Date(),
            // webhookPayload: body,
            checkoutId: payment.checkoutId ?? checkoutId ?? undefined, // backfill if needed
          },
          include: { user: true },
        });

        // Extend premium starting from max(now, existing premiumUntil)
        const nowD = new Date();
        const base =
          updated.user.premiumUntil && updated.user.premiumUntil > nowD
            ? updated.user.premiumUntil
            : nowD;

        const extended =
          updated.cycle === "WEEKLY" ? addDays(base, 7) : addDays(base, 30);

        await tx.user.update({
          where: { userId: updated.userId },
          data: { plan: "PREMIUM", premiumUntil: extended },
        });
      });
    } else if (eventType === "payment.failed" || eventType === "payment.canceled") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED,/* webhookPayload: body*/ },
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
