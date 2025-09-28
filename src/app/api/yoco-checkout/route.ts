// app/api/yoco-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { BillingCycle, PaymentStatus, } from "@prisma/client";
import { z } from "zod";

const PRICE = { weekly: 14900, monthly: 49900 } as const; // cents
type ClientCycle = keyof typeof PRICE; // "weekly" | "monthly"
const VAT_RATE = 0.15;

// ---- Zod body validation ----------------------------------------------------
const BodySchema = z.object({
  plan: z.literal("premium"),
  cycle: z.enum(["weekly", "monthly"]),
  coupon: z.string().trim().max(64).optional(),
  resumeId: z.string().trim().optional(),
});

function applyCoupon(subtotal: number, coupon?: string) {
  if (!coupon) return { discountCents: 0, code: undefined as string | undefined };
  const c = coupon.toUpperCase();
  if (c === "WELCOME10") {
    return { discountCents: Math.min(Math.round(subtotal * 0.1), subtotal), code: c };
  }
  return { discountCents: 0, code: undefined };
}

const CYCLE_MAP: Record<ClientCycle, BillingCycle> = {
  weekly: BillingCycle.WEEKLY,
  monthly: BillingCycle.MONTHLY,
};

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
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }
    const { plan, cycle: clientCycle, coupon, resumeId: resumeIdRaw } = parsed.data;

    // 3) Resolve internal user
    const user = await prisma.user.findUnique({
      where: { userId: clerkUserId }, // user.userId is the Clerk id
      select: { userId: true },           // internal ObjectId
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 4) (Optional) Verify resume belongs to this user (IMPORTANT: compare against Clerk id!)
    let resumeId: string | undefined;
    if (resumeIdRaw) {
      const resume = await prisma.resume.findFirst({
        where: { id: resumeIdRaw, userId: clerkUserId }, // Resume.userId holds Clerk ID
        select: { id: true },
      });
      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }
      resumeId = resume.id;
    }

    // 5) Server-side pricing
    const subtotalCents = PRICE[clientCycle];
    const { discountCents, code } = applyCoupon(subtotalCents, coupon);
    const discounted = Math.max(subtotalCents - discountCents, 0);
    const taxCents = Math.round(discounted * VAT_RATE);
    const totalCents = discounted + taxCents;
    if (!Number.isInteger(totalCents) || totalCents <= 0) {
      return NextResponse.json({ error: "Calculated amount invalid" }, { status: 400 });
    }
    const cycleEnum = CYCLE_MAP[clientCycle];

    // 6) Create Payment (PENDING)
    const payment = await prisma.payment.create({
      data: {
        provider: "YOCO",
        userId: user.userId,   // internal FK
        resumeId,          // optional
        plan: "PREMIUM",
        cycle: cycleEnum,
        currency: "ZAR",
        subtotalCents,
        discountCents,
        taxCents,
        totalCents,
        status: PaymentStatus.PENDING,
        requestPayload: { plan, cycle: clientCycle, coupon: code ?? null },
      },
      select: { id: true },
    });

    // 7) Build Yoco checkout
    const origin = req.nextUrl.origin;
    const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
    if (!YOCO_SECRET_KEY) {
      return NextResponse.json({ error: "Missing YOCO_SECRET_KEY" }, { status: 500 });
    }

    const reference = new URLSearchParams({
      paymentId: payment.id,
      plan,
      cycle: clientCycle,
      ...(resumeId ? { resumeId } : {}),
      ...(code ? { coupon: code } : {}),
    }).toString();

    const yocoRes = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: totalCents,           // cents
        currency: "ZAR",
        totalDiscount: discountCents, // cents
        totalTaxAmount: taxCents,     // cents
        lineItems: [
          {
            displayName: `Premium (${clientCycle === "weekly" ? "Weekly" : "Monthly"})`,
            quantity: 1,
            pricingDetails: { price: discounted }, // cents
          },
        ],
        reference,
        successUrl: `${origin}/resumes?upgraded=1`,
        cancelUrl: `${origin}/pricing?canceled=1`,
      }),
    });

    if (!yocoRes.ok) {
      const errText = await yocoRes.text().catch(() => "");
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
          responsePayload: { error: errText, status: yocoRes.status },
        },
      });
      return NextResponse.json(
        { error: `Yoco error ${yocoRes.status}: ${errText || "Unknown"}` },
        { status: 502 }
      );
    }

    const data = (await yocoRes.json()) as { id: string; redirectUrl: string };

    await prisma.payment.update({
      where: { id: payment.id },
      data: { checkoutId: data.id, responsePayload: data },
    });

    // Keep the client minimal — just give the redirect target
    return NextResponse.json({ redirectUrl: data.redirectUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
