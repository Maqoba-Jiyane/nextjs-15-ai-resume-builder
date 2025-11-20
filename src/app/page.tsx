// app/(marketing)/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Sparkles,
  Zap,
  Lock,
  BadgeCheck,
  Shield,
  Clock,
  Handshake,
  ArrowRight,
} from "lucide-react";
import React from "react";
import BlurCarousel from "@/components/BlurCarousel";

const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <div className="py-20 text-center text-sm text-muted-foreground">
      Loading…
    </div>
  ),
});

const SHOW_GUARANTEE = true;

const benefits = [
  {
    title: "ATS-Friendly Designs",
    description:
      "Clean structure engineered to pass Applicant Tracking Systems.",
    icon: <CheckCircle className="size-5" aria-hidden="true" />,
  },
  {
    title: "Built for South Africa",
    description:
      "Localised styles, date formats, and sections SA recruiters expect.",
    icon: <Zap className="size-5" aria-hidden="true" />,
  },
  {
    title: "AI Summaries & Bullets",
    description:
      "Action verbs and quantified statements tailored to your experience.",
    icon: <Sparkles className="size-5" aria-hidden="true" />,
  },
  {
    title: "All Templates Included",
    description:
      "Try every layout and design while building — no paywall on templates.",
    icon: <Lock className="size-5" aria-hidden="true" />,
  },
  {
    title: "Multiple Resumes",
    description:
      "Create different versions of your CV for different roles before you download.",
    icon: <Lock className="size-5" aria-hidden="true" />,
  },
  {
    title: "Export-Ready PDF",
    description:
      "When you’re happy with your CV, download a clean PDF for just R10.",
    icon: <Lock className="size-5" aria-hidden="true" />,
  },
] as const;

const templates = [
  { name: "Classic", tag: "Clean & simple", image: "/assets/templates/Classic.jpg" },
  {
    name: "ATS Friendly",
    tag: "Optimised for parsing",
    image: "/assets/templates/ScienceEngineeringResume.png",
  },
  {
    name: "Classic Rich",
    tag: "Professional with subtle flair",
    image: "/assets/templates/ClassicResumeRich.png",
  },
  {
    name: "Dark Blue Frame",
    tag: "Bold, modern frame",
    image: "/assets/templates/DarkBlueFrameMinimalistResume.png",
  },
  {
    name: "Modern Sidebar",
    tag: "Strong visual hierarchy",
    image: "/assets/templates/MordernSidebarResume.png",
  },
  {
    name: "Blue Creative",
    tag: "Stand-out design",
    image: "/assets/templates/BlueCreativeResume.png",
  },
] as const;

const trustLogos = [
  { alt: "Finance", src: "/assets/trust/finance.png" },
  { alt: "Telecom", src: "/assets/trust/telecom.png" },
  { alt: "Retail", src: "/assets/trust/retail.png" },
  { alt: "Tech", src: "/assets/trust/tech.png" },
  { alt: "Energy", src: "/assets/trust/energy.jpg" },
];

// export const metadata = {
//   title: "Eon Resume — AI-Crafted, ATS-Optimized Resumes (R10 per CV)",
//   description:
//     "Build an ATS-friendly resume in minutes. Use all templates and AI features for free while you create. Only pay R10 per CV when you download your PDF.",
//   openGraph: {
//     title: "Eon Resume — AI-Crafted, ATS-Optimized (R10 per CV)",
//     description:
//       "Use the full resume builder and AI for free. Only pay R10 when you download your CV as a PDF. No subscriptions.",
//     type: "website",
//     url: "https://your-domain.com/",
//     images: [
//       { url: "/og/og-default.png", width: 1200, height: 630, alt: "Eon Resume" },
//     ],
//   },
//   alternates: { canonical: "https://your-domain.com/" },
// };

export default function LandingPage() {
  return (
    <main className="bg-white text-slate-900 w-full">
      {/* SEO JSON-LD */}
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Eon Resume",
          url: "https://your-domain.com/",
        })}
      </Script>
      <Script
        id="ld-product"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Eon Resume",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: [
            {
              "@type": "Offer",
              name: "Resume Builder (in-app use)",
              price: "0",
              priceCurrency: "ZAR",
              description:
                "Use all templates and AI features to create and preview your resume in the app at no cost.",
            },
            {
              "@type": "Offer",
              name: "CV Download (PDF)",
              price: "10",
              priceCurrency: "ZAR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                billingIncrement: 1,
                unitCode: "EACH",
              },
              description:
                "Pay R10 for each CV you download as a PDF. No subscriptions.",
            },
          ],
        })}
      </Script>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* on-brand blue glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(37,99,235,0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-blue-700 ring-1 ring-blue-200">
            <BadgeCheck className="size-4" />
            Use all features for free — pay only R10 per CV download
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Get <span className="text-blue-600">seen</span> by ATS & recruiters —
            build a job-ready resume in minutes.
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Try the full builder, AI suggestions, and all templates without
            paying. When you’re happy with your CV, download your PDF for{" "}
            <span className="font-semibold">just R10 per CV.</span>
          </p>

          {/* primary actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="text-base px-6 py-6 bg-blue-600 hover:bg-blue-900 text-white"
            >
              <Link href="/resumes" prefetch aria-label="Create my resume now">
                Start Building My CV
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-white border-blue-200 hover:bg-blue-600 px-6 py-6"
              aria-label="See pricing"
            >
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>

          {/* TRUST / SOCIAL PROOF */}
          <div className="mt-8">
            <p className="text-sm text-slate-500">
              Where users report landing interviews
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-90 logos">
              <BlurCarousel images={trustLogos} interval={3000} />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="py-14 sm:py-16 bg-white" id="benefits">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to stand out
            </h2>
            <p className="mt-2 text-slate-600">
              Full access while you build. Only pay when you download your CV.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border bg-white p-5 shadow-sm hover:shadow transition-shadow",
                )}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-blue-50 p-2 text-blue-700">
                  {b.icon}
                </div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{b.description}</p>
              </div>
            ))}
          </div>

          {/* micro value points */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <Clock className="size-4" />
                Built in minutes
              </div>
              <p className="mt-1 text-slate-600">
                Start with a template, paste a job link, and tailor instantly.
              </p>
            </div>
            <div className="rounded-lg border p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <Shield className="size-4" />
                ATS-safe structure
              </div>
              <p className="mt-1 text-slate-600">
                Readable by most Applicant Tracking Systems.
              </p>
            </div>
            <div className="rounded-lg border p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <Handshake className="size-4" />
                Built for SA hiring
              </div>
              <p className="mt-1 text-slate-600">
                Localised sections and date formats recruiters expect.
              </p>
            </div>
          </div>

          {/* reinforcement CTA */}
          <div className="mt-8 flex items-center justify-center">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/resumes" prefetch>
                Try the Builder Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                From blank page to job-ready in 3 steps
              </h2>
              <ol className="mt-6 space-y-5 text-slate-700">
                <li>
                  <span className="font-semibold">1. Pick a template</span> —
                  use any design you like.
                </li>
                <li>
                  <span className="font-semibold">2. Paste a job link</span> — we
                  align your resume to the role with AI.
                </li>
                <li>
                  <span className="font-semibold">3. Download & apply</span> —
                  when you’re happy, download your PDF for{" "}
                  <strong>R10 per CV</strong>.
                </li>
              </ol>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white "
                >
                  <Link href="/resumes" prefetch>
                    Start Building
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-xl ring-1 ring-slate-200 overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?q=80&w=1200&auto=format&fit=crop"
                  alt="Eon Resume editor screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTION BUSTERS */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Worried about these?
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-slate-700">
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">“Will ATS read my resume?”</h3>
              <p className="text-sm mt-2">
                We avoid tables/headers that break parsing and use clean sections
                recruiters scan fast.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">“I don’t know what to write.”</h3>
              <p className="text-sm mt-2">
                AI suggests quantified bullets and a crisp summary you can edit
                in seconds.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">
                “Do I have to pay before I see anything?”
              </h3>
              <p className="text-sm mt-2">
                No. You can build your entire CV, test AI features, and see the
                final layout before paying. You only pay{" "}
                <strong>R10 per CV</strong> if you decide to download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Choose a template</h2>
          <p className="mt-2 text-slate-600">
            Clear, modern, and ATS-safe designs. Use any template while you build
            — pay only when you download your CV.
          </p>

          <div className="templates-grid mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {templates.map((t, i) => (
              <div
                key={i}
                tabIndex={0}
                style={{ animationDelay: `${i * 90}ms` }}
                className="template-card group relative bg-white p-4 rounded-xl shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg focus-within:shadow-lg will-change-transform"
              >
                <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden bg-slate-50 ring-1 ring-slate-200">
                  <Image
                    src={t.image}
                    alt={`${t.name} template`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.tag}</p>
                  </div>
                  <span className="text-xxs uppercase tracking-wide rounded-full px-2 py-0.5 ring-1 bg-blue-50 text-blue-700 ring-blue-200">
                    Included
                  </span>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.14)" }}
                />
              </div>
            ))}

            {/* local CSS for stagger-in */}
            <style>{`
              .templates-grid .template-card {
                opacity: 0; transform: translateY(14px) scale(0.985);
                animation: cardFadeUp 520ms cubic-bezier(.22,.8,.2,1) forwards;
              }
              .templates-grid .template-card:hover,
              .templates-grid .template-card:focus-within {
                transform: translateY(-4px) scale(1.01);
              }
              @keyframes cardFadeUp { to { opacity: 1; transform: translateY(0) scale(1); } }
              @media (prefers-reduced-motion: reduce) {
                .templates-grid .template-card { animation: none; opacity: 1; transform: none; }
                .templates-grid .template-card:hover,
                .templates-grid .template-card:focus-within { transform: none; }
              }
            `}</style>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
              <Link href="/resumes" prefetch>
                Try All Templates
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
            >
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* GUARANTEE / RISK EXPLANATION */}
      {SHOW_GUARANTEE && (
        <section className="py-10 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl border ring-1 ring-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Shield className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold">
                See your CV before you pay
              </h3>
              <p className="text-slate-600 mt-2">
                Build your full CV, preview the final result, and only pay{" "}
                <strong>R10 per CV</strong> if you’re happy and want to download
                the PDF. No risk, no monthly contracts.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      <section id="pricing" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Simple pay-as-you-go pricing
          </h2>
          <p className="mt-2 text-slate-600">
            Use the full builder for free. Only pay when you download your CV.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Builder usage */}
            <div className="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-8 text-left shadow-sm">
              <h3 className="text-xl font-bold">Use the Builder</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">R0</p>
              <ul className="space-y-2 text-slate-700">
                <li>• Access to all templates</li>
                <li>• AI summaries & bullet suggestions</li>
                <li>• ATS-friendly structure</li>
                <li>• Create and edit as much as you like</li>
              </ul>
              <Button
                asChild
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white "
                aria-label="Start building"
              >
                <Link href="/resumes" prefetch>
                  Start Building
                </Link>
              </Button>
              <p className="mt-3 text-xs text-slate-500">
                You can see your final CV before deciding to pay.
              </p>
            </div>

            {/* Pay-as-you-go */}
            <div className="relative rounded-2xl ring-2 ring-blue-300 bg-white p-8 text-left shadow-lg">
              <span className="absolute -top-3 right-4 text-xxs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                Pay only when you download
              </span>
              <h3 className="text-xl font-bold">Download CV (PDF)</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">
                R10{" "}
                <span className="text-base font-medium text-slate-500">
                  / CV
                </span>
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Download your CV as a high-quality PDF</li>
                <li>• Use it for any job application</li>
                <li>• Keep the file forever</li>
                <li>• No monthly fees, no contracts</li>
              </ul>
              <Button
                asChild
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white "
                aria-label="Create a CV for R10"
              >
                <Link href="/resumes" prefetch>
                  Create a CV for R10
                </Link>
              </Button>
              <p className="mt-3 text-xs text-slate-500">
                You’re only charged when you choose to download your CV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Frequently asked questions
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-slate-700">
            <div>
              <h3 className="font-semibold">
                Do I have to pay before I build my CV?
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                No. You can use the full builder, AI features, and all templates
                without paying. You only pay{" "}
                <strong>R10 per CV</strong> when you decide to download your
                resume as a PDF.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How does the pricing work?</h3>
              <p className="text-sm text-slate-600 mt-1">
                There are no subscriptions. You pay a{" "}
                <strong>once-off R10</strong> for each CV you download. You can
                create and edit as many drafts as you like before paying.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Will my resume pass ATS?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Our layouts avoid common ATS pitfalls (tables, headers/footers)
                and use clean, machine-readable structure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Do I need an account?</h3>
              <p className="text-sm text-slate-600 mt-1">
                You can start immediately. Signing in helps you save and edit
                across devices and download later when you’re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Image
            src="/assets/founder.jpg"
            alt="Founder"
            width={72}
            height={72}
            className="mx-auto rounded-full ring-2 ring-slate-200"
          />
          <h3 className="mt-4 text-xl font-bold">A note from the founder</h3>
          <p className="mt-2 text-slate-600">
            Job hunting in SA is tough. I built Eon Resume to remove friction:
            one clean, ATS-safe resume that actually matches the job you
            want—without hours of rewriting. You can experience the full
            builder, then only pay when you’re ready to download your CV.
          </p>
          <div className="mt-4 text-slate-500 text-sm">— The Eon Resume team</div>
          <div className="mt-6">
            <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
              <Link href="/resumes" prefetch>
                Get Started <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 text-white text-center bg-gradient-to-b from-slate-900 via-slate-900 to-blue-900">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to build your CV?
        </h2>
        <p className="mb-6 opacity-90">
          Use all features for free. Pay only R10 when you download your CV.
        </p>
        <Button
          asChild
          className="text-lg px-8 py-4 text-white bg-blue-600 hover:bg-blue-700"
          aria-label="Create my CV"
        >
          <Link href="/resumes" prefetch>
            Start Building Now
          </Link>
        </Button>
      </section>
    </main>
  );
}
