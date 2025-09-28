import { updateResumeForPayment } from "@/app/(main)/resumes/actions";

// lib/payments/upgrade.ts
export type BillingCycle = "monthly" | "weekly";

type CreateCheckoutArgs = {
  plan: "premium";
  cycle: BillingCycle;
  coupon?: string;
  userId?: string; // optional: if you want to associate a payment with a specific resume
};

export async function startYocoCheckout(args: CreateCheckoutArgs) {
  const res = await fetch("/api/yoco-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to create checkout");
  }

  const data: { id: string; redirectUrl: string } = await res.json();

  // Optionally persist a "pending payment" id against the resume/user here if you want
  await updateResumeForPayment(args.userId!, data.id)

  window.location.href = data.redirectUrl;
}
