// app/api/yoco-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { BillingCycle, PaymentStatus } from "@prisma/client";
import { z } from "zod";

const VAT_RATE = 0.15;

// R10 per CV (in cents)
const TOTAL_CENTS = 1000; // 10 * 100

// ---- Zod body validation ----------------------------------------------------
// For pay-as-you-go: user is paying to download a specific resume
const BodySchema = z.object({
  resumeId: z.string().trim(),
});

export async function POST(req: NextRequest) {
  try {
    // 1) Auth
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2) Parse/validate body
    const parsed = BodySchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { resumeId: resumeIdRaw } = parsed.data;

    // 4) Verify resume belongs to this user (compare against Clerk id)
    const resume = await prisma.resume.findFirst({
      where: { id: resumeIdRaw, userId: clerkUserId }, // Resume.userId holds Clerk ID
      select: { id: true },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const resumeId = resume.id;

    // 5) Server-side pricing (R10 total, VAT-inclusive)
    //
    // TOTAL_CENTS is final price (incl VAT).
    // Subtotal = total / (1 + VAT_RATE), VAT = total - subtotal.
    const subtotalCents = Math.round(TOTAL_CENTS / (1 + VAT_RATE));
    const taxCents = TOTAL_CENTS - subtotalCents;
    const discountCents = 0; // no coupons/discounts in pay-as-you-go model
    const totalCents = TOTAL_CENTS;

    // If you add ONCE_OFF to BillingCycle in Prisma, use that here.
    // Otherwise, pick whatever makes sense in your schema.
    const cycleEnum = BillingCycle.WEEKLY; // <-- ensure this exists in your schema

    // 6) Create Payment (PENDING)
    const payment = await prisma.payment.create({
      data: {
        provider: "YOCO",
        userId: clerkUserId,
        resumeId,
        plan: "FREE", // string field; adjust if you use an enum
        cycle: cycleEnum,
        currency: "ZAR",
        subtotalCents,
        discountCents,
        taxCents,
        totalCents,
        status: PaymentStatus.PENDING,
        requestPayload: {
          kind: "CV_DOWNLOAD",
          resumeId,
        },
      },
      select: { id: true },
    });

    // 7) Build Yoco checkout
    const origin = req.nextUrl.origin;
    const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
    if (!YOCO_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing YOCO_SECRET_KEY" },
        { status: 500 },
      );
    }

    const yocoRes = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: totalCents, // cents, VAT-inclusive
        currency: "ZAR",
        totalDiscount: discountCents, // cents
        totalTaxAmount: taxCents, // cents
        subtotalAmount: totalCents,
        lineItems: [
          {
            displayName: "CV Download (PDF)",
            quantity: 1,
            pricingDetails: {
              price: subtotalCents,
              taxAmount: taxCents,
            },
          },
        ],
        clientReferenceId: payment.id,
        metadata: {
          paymentId: payment.id,
          kind: "cv-download",
          resumeId,
        },
        successUrl: `${origin}/resumes`,
        cancelUrl: `${origin}/resumes`,
      }),
    });

    console.log("Yoco checkout response status:", yocoRes.status);

    if (!yocoRes.ok) {
      const errText = await yocoRes.text().catch(() => "");
      console.error("[Yoco checkout] API request failed", {
        status: yocoRes.status,
        body: errText,
      });
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
          responsePayload: { error: errText, status: yocoRes.status },
        },
      });
      return NextResponse.json(
        {
          error: `Yoco error ${yocoRes.status}: ${errText || "Unknown"}`,
        },
        { status: 502 },
      );
    }

    console.log("Yoco checkout response OK");

    const data = (await yocoRes.json()) as {
      id: string;
      redirectUrl: string;
    };

    await prisma.payment.update({
      where: { id: payment.id },
      data: { checkoutId: data.id, responsePayload: data },
    });

    // Keep the client minimal — just give the redirect target
    return NextResponse.json({ redirectUrl: data.redirectUrl, id: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
