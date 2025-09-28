// app/pricing/page.tsx
import { Benefit, FAQ, PricingTableClient } from "@/components/Billing";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pricing | Eon Resume",
  description:
    "Choose Free or unlock Premium templates and faster PDF printing. Simple pricing, no surprises.",
};

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export default async function PricingPage({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Simple, honest pricing</h1>
        <p className="mt-3 text-balance text-muted-foreground">
          Start free. Upgrade anytime to unlock premium templates, faster printing, and more.
        </p>
      </header>

      <Suspense>
        {/* pass only non-sensitive info */}
        <PricingTableClient resumeId={resumeId} />
      </Suspense>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <Benefit title="Premium templates" body="Unlock polished, recruiter-ready templates with refined layouts and typography." />
        <Benefit title="Priority rendering" body="Faster, consistent PDF generation with optimized print pipeline." />
        <Benefit title="Unlimited resumes" body="Create, duplicate, and export as many resumes as you need." />
      </section>

      <FAQ />
    </main>
  );
}
