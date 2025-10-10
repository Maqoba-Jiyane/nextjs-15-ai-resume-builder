// --- Client portion ----------------------------------------------------------
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const FREE_FEATURES = [
  "Core editor",
  "ATS-friendly export",
  "1 active resume",
  "Standard PDF printing",
] as const;

export const PREMIUM_FEATURES = [
  "All Free features",
  "Premium templates",
  "Unlimited resumes",
  "Smart fill (AI): Professional summaries",
  "Smart fill (AI): Work experience bullets",
  "Faster PDF printing",
  "Priority email support",
] as const;

// Prices (in your currency)
const PRICE = {
  weekly: 149, // ZAR example
  monthly: 499, // ZAR example (12x with discount)
};

type BillingCycle = "weekly" | "monthly";

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const WEEKS_PER_MONTH = 4;
const monthlySavePct = Math.round(
  (1 - PRICE.monthly / (PRICE.weekly * WEEKS_PER_MONTH)) * 100
);

export function PricingTableClient({ resumeId }: { resumeId?: string }) {
  const [cycle, setCycle] = React.useState<BillingCycle>("weekly");
  const [coupon] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/yoco-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "premium",
          cycle,
          coupon: coupon || undefined,
          resumeId: resumeId || undefined, // attribution only
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Failed" }));
        throw new Error(error || "Failed to create checkout");
      }
      const { redirectUrl } = await res.json();
      window.location.href = redirectUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-10 grid gap-6 md:grid-cols-[1fr,1fr]">
      {/* Toggle */}
      <div className="md:col-span-2 flex items-center justify-center gap-3">
        <span className={cycle === "weekly" ? "font-semibold" : "text-muted-foreground"}>
          Weekly
        </span>
        <button
          className="relative inline-flex h-9 w-16 items-center rounded-full bg-muted transition"
          aria-label="Toggle billing cycle"
          onClick={() => setCycle(cycle === "weekly" ? "monthly" : "weekly")}
        >
          <span
            className={`absolute left-1 h-7 w-7 rounded-full bg-background shadow transition-transform ${
              cycle === "monthly" ? "translate-x-7" : ""
            }`}
          />
        </button>
        <span className={cycle === "monthly" ? "font-semibold" : "text-muted-foreground"}>
          Monthly <span className="ml-1 rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">Save {monthlySavePct}%</span>
        </span>
      </div>

      {/* Free plan */}
      <PlanCard
        title="Free"
        price="R0"
        period="/forever"
        cta={
          <Button asChild className="w-full" variant="outline">
            <Link href="/resumes">Get started</Link>
          </Button>
        }
        features={FREE_FEATURES}
        footnote="No credit card required"
      />

      {/* Premium plan */}
      <PlanCard
        title={
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Premium
          </span>
        }
        price={formatZAR(PRICE[cycle])}
        period={cycle === "weekly" ? "/week" : "/month"}
        highlight={cycle === "weekly"}
        cta={
          <Button className="w-full" onClick={onCheckout} disabled={loading}>
            {loading ? "Redirecting…" : "Upgrade now"}
          </Button>
        }
        features={PREMIUM_FEATURES}
        // footnote="7-day money-back guarantee"
      >
        {/* <div className="mt-3 flex items-center gap-2">
          <input
            inputMode="text"
            placeholder="Coupon code (optional)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Coupon code"
          />
          <Button variant="outline" onClick={onCheckout} disabled={loading}>
            Apply & Buy
          </Button>
        </div> */}
      </PlanCard>
    </section>
  );
}

// --- Presentational pieces ---------------------------------------------------

function PlanCard(props: {
  title: React.ReactNode;
  price: string;
  period: string;
  features: readonly string[];
  cta: React.ReactNode;
  highlight?: boolean;
  footnote?: string;
  children?: React.ReactNode;
}) {
  const { title, price, period, features, cta, highlight, footnote, children } = props;
  return (
    <div
      className={[
        "relative rounded-2xl border bg-card p-6 shadow-sm",
        highlight ? "ring-2 ring-primary" : "",
      ].join(" ")}
    >
      {highlight && (
        <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3 flex items-end gap-1">
        <div className="text-4xl font-bold leading-none">{price}</div>
        <div className="pb-1 text-sm text-muted-foreground">{period}</div>
      </div>

      <ul className="mt-6 grid gap-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">{cta}</div>
      {children}

      {footnote && <p className="mt-3 text-xs text-muted-foreground">{footnote}</p>}
    </div>
  );
}

export function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="mx-auto mt-16 max-w-3xl">
      <h2 className="text-center text-2xl font-semibold">Frequently asked questions</h2>
      <div className="mt-6 space-y-5">
        <QA
          q="Can I use the free plan forever?"
          a="Yes. You can create an ATS-friendly resume and export PDFs on the free plan. Upgrade anytime to unlock premium templates and faster printing."
        />
        <QA
          q="What’s included in Premium?"
          a="All free features plus premium templates, unlimited resumes, faster PDF generation, and priority support."
        />
        {/* <QA
          q="Do you offer refunds?"
          a="Yes, there’s a 7-day money-back guarantee. If it’s not for you, contact support and we’ll help."
        /> */}
        <QA
          q="Can I cancel anytime?"
          a="Yep. You can cancel from your account settings—your plan will remain active until the end of the billing period."
        />
      </div>
    </section>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="font-medium">{q}</div>
      <p className="mt-1 text-sm text-muted-foreground">{a}</p>
    </div>
  );
}
