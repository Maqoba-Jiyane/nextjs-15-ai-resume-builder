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
import CircularLogos from "@/components/BlurCarousel";

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

export default function LandingPage() {
  return (
    <main className="w-full bg-slate-950 text-slate-50">
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
      <section className="relative overflow-hidden border-b border-slate-900">
        {/* layered glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 -top-32 mx-auto h-80 max-w-4xl rounded-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_65%)] opacity-70" />
          <div className="absolute -right-40 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.25),_transparent_60%)] opacity-60 blur-2xl" />
          <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.35),_transparent_60%)] opacity-60 blur-2xl" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:py-20 lg:flex-row lg:items-center lg:py-24">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-sky-500/30">
              <BadgeCheck className="size-4" />
              Use all features for free — pay only{" "}
              <span className="font-semibold">R10 per CV download</span>
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              Get{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                seen
              </span>{" "}
              by ATS & recruiters —
              <br className="hidden sm:inline" />
              build a job-ready resume in minutes.
            </h1>

            <p className="mt-4 mx-auto max-w-xl text-sm text-slate-300 sm:text-base lg:mx-0">
              Try the full builder, AI suggestions, and all templates without
              paying. When you’re happy with your CV, download your PDF for{" "}
              <span className="font-semibold text-sky-300">
                just R10 per CV.
              </span>
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:text-sm">
              <Button
                asChild
                className="w-full max-w-xs bg-sky-500 text-base font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:bg-sky-600 sm:w-auto"
              >
                <Link href="/resumes" prefetch aria-label="Create my resume now">
                  Start Building My CV
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full max-w-xs border-slate-600 bg-slate-900/60 text-sm text-slate-100 hover:bg-slate-800 sm:w-auto"
                aria-label="See pricing"
              >
                <a href="#pricing">See Pricing</a>
              </Button>
            </div>

            <div className="mt-8 text-left lg:mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Where users report landing interviews
              </p>
              <div className="mt-4 flex max-w-md flex-wrap items-center gap-4 opacity-90">
              <CircularLogos logos={trustLogos} size={300} rotateSpeed={18} />
              </div>
            </div>
          </div>

          {/* Right: “Product” preview card */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-0.5 rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(56,189,248,0.8),rgba(37,99,235,0.7),rgba(56,189,248,0.8))] opacity-60 blur-xl" />
              <div className="relative rounded-3xl border border-slate-700/80 bg-slate-950/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-100">
                      Live resume preview
                    </p>
                    <p className="text-[0.65rem] text-slate-400">
                      Edit, refine, and see ATS-safe layout instantly.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[0.7rem] font-medium text-emerald-300">
                    No subscriptions
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
                  <Image
                    src="/assets/templates/DarkBlueFrameMinimalistResume.png"
                    alt="Eon Resume editor screenshot"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
                <div className="mt-4 grid gap-3 text-[0.7rem] text-slate-300 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="font-semibold text-slate-100">
                      ATS structure
                    </p>
                    <p className="mt-1 text-[0.65rem] text-slate-400">
                      We keep things clean, scannable, and machine-readable.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="font-semibold text-slate-100">
                      AI bullet helper
                    </p>
                    <p className="mt-1 text-[0.65rem] text-slate-400">
                      Turn duties into quantified achievements in seconds.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="font-semibold text-slate-100">SA-ready</p>
                    <p className="mt-1 text-[0.65rem] text-slate-400">
                      Formats and sections that feel familiar to SA recruiters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="border-b border-slate-900 bg-slate-950/90 py-14 sm:py-16" id="benefits">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                stand out
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Full access while you build. Only pay when you download your CV.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.9)]",
                )}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-sky-500/10 p-2 text-sky-300">
                  {b.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {/* micro value points */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-100">
                <Clock className="size-4" />
                Built in minutes
              </div>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                Start with a template, paste a job link, and tailor instantly.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-100">
                <Shield className="size-4" />
                ATS-safe structure
              </div>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                Readable by most Applicant Tracking Systems.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-100">
                <Handshake className="size-4" />
                Built for SA hiring
              </div>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                Localised sections and date formats recruiters expect.
              </p>
            </div>
          </div>

          {/* reinforcement CTA */}
          <div className="mt-8 flex items-center justify-center">
            <Button
              asChild
              className="bg-sky-500 text-white hover:bg-sky-600"
            >
              <Link href="/resumes" prefetch>
                Try the Builder Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-b border-slate-900 bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                From blank page to job-ready in{" "}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  3 steps
                </span>
              </h2>
              <ol className="mt-6 space-y-5 text-sm text-slate-300 sm:text-base">
                <li>
                  <span className="font-semibold text-slate-100">
                    1. Pick a template
                  </span>{" "}
                  — use any design you like.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    2. Paste a job link
                  </span>{" "}
                  — we align your resume to the role with AI.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    3. Download & apply
                  </span>{" "}
                  — when you’re happy, download your PDF for{" "}
                  <strong className="text-sky-300">R10 per CV</strong>.
                </li>
              </ol>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-sky-500 text-white hover:bg-sky-600"
                >
                  <Link href="/resumes" prefetch>
                    Start Building
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_60%)] opacity-70 blur-lg" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                <Image
                  src="/assets/templates/DarkBlueFrameMinimalistResume.png"
                  alt="Eon Resume editor screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTION BUSTERS */}
      <section className="border-b border-slate-900 bg-slate-950 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Worried about these?
          </h2>
          <div className="mt-8 grid gap-6 text-sm text-slate-200 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="font-semibold text-slate-50">
                “Will ATS read my resume?”
              </h3>
              <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                We avoid tables/headers that break parsing and use clean sections
                recruiters scan fast.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="font-semibold text-slate-50">
                “I don’t know what to write.”
              </h3>
              <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                AI suggests quantified bullets and a crisp summary you can edit
                in seconds.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="font-semibold text-slate-50">
                “Do I have to pay before I see anything?”
              </h3>
              <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                No. You can build your entire CV, test AI features, and see the
                final layout before paying. You only pay{" "}
                <strong className="text-sky-300">R10 per CV</strong> if you
                decide to download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="border-b border-slate-900 bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Choose a template</h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Clear, modern, and ATS-safe designs. Use any template while you build
            — pay only when you download your CV.
          </p>

          <div className="templates-grid mt-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
            {templates.map((t, i) => (
              <div
                key={i}
                tabIndex={0}
                style={{ animationDelay: `${i * 90}ms` }}
                className="template-card group relative rounded-xl bg-slate-900/90 p-4 ring-1 ring-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.9)] focus-within:shadow-[0_18px_35px_rgba(15,23,42,0.9)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-900 ring-1 ring-slate-800">
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
                    <p className="text-sm font-semibold text-slate-50">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{t.tag}</p>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-sky-300 ring-1 ring-sky-500/40">
                    Included
                  </span>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(56,189,248,0.18)" }}
                />
              </div>
            ))}

            {/* stagger animation */}
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
            <Button
              className="bg-sky-500 text-white hover:bg-sky-600"
              asChild
            >
              <Link href="/resumes" prefetch>
                Try All Templates
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-600 bg-slate-900/60 text-slate-100 hover:bg-slate-800"
            >
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-b border-slate-900 bg-slate-950">
        <TestimonialsSection />
      </section>

      {/* GUARANTEE / RISK EXPLANATION */}
      {SHOW_GUARANTEE && (
        <section className="border-b border-slate-900 bg-slate-950 py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-8 text-center shadow-[0_18px_35px_rgba(15,23,42,0.9)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <Shield className="text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-50">
                See your CV before you pay
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Build your full CV, preview the final result, and only pay{" "}
                <strong className="text-emerald-300">R10 per CV</strong> if
                you’re happy and want to download the PDF. No risk, no monthly
                contracts.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      <section id="pricing" className="border-b border-slate-900 bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Simple pay-as-you-go pricing
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Use the full builder for free. Only pay when you download your CV.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Builder usage */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-left shadow-sm">
              <h3 className="text-xl font-bold text-slate-50">
                Use the Builder
              </h3>
              <p className="mb-4 mt-2 text-4xl font-extrabold text-slate-50">
                R0
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Access to all templates</li>
                <li>• AI summaries & bullet suggestions</li>
                <li>• ATS-friendly structure</li>
                <li>• Create and edit as much as you like</li>
              </ul>
              <Button
                asChild
                className="mt-6 w-full bg-sky-500 text-white hover:bg-sky-600"
                aria-label="Start building"
              >
                <Link href="/resumes" prefetch>
                  Start Building
                </Link>
              </Button>
              <p className="mt-3 text-xs text-slate-400">
                You can see your final CV before deciding to pay.
              </p>
            </div>

            {/* Pay-as-you-go */}
            <div className="relative rounded-2xl border border-sky-400/60 bg-slate-900/90 p-8 text-left shadow-[0_18px_45px_rgba(56,189,248,0.25)]">
              <span className="absolute -top-3 right-4 rounded-full bg-sky-500 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                Pay only when you download
              </span>
              <h3 className="text-xl font-bold text-slate-50">
                Download CV (PDF)
              </h3>
              <p className="mb-4 mt-2 text-4xl font-extrabold text-slate-50">
                R10{" "}
                <span className="text-base font-medium text-slate-400">
                  / CV
                </span>
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Download your CV as a high-quality PDF</li>
                <li>• Use it for any job application</li>
                <li>• Keep the file forever</li>
                <li>• No monthly fees, no contracts</li>
              </ul>
              <Button
                asChild
                className="mt-6 w-full bg-sky-500 text-white hover:bg-sky-600"
                aria-label="Create a CV for R10"
              >
                <Link href="/resumes" prefetch>
                  Create a CV for R10
                </Link>
              </Button>
              <p className="mt-3 text-xs text-slate-400">
                You’re only charged when you choose to download your CV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-slate-900 bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 grid gap-6 text-sm text-slate-300 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-50">
                Do I have to pay before I build my CV?
              </h3>
              <p className="mt-1 text-slate-300">
                No. You can use the full builder, AI features, and all templates
                without paying. You only pay{" "}
                <strong className="text-sky-300">R10 per CV</strong> when you
                decide to download your resume as a PDF.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">
                How does the pricing work?
              </h3>
              <p className="mt-1 text-slate-300">
                There are no subscriptions. You pay a{" "}
                <strong className="text-sky-300">once-off R10</strong> for each CV
                you download. You can create and edit as many drafts as you like
                before paying.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">
                Will my resume pass ATS?
              </h3>
              <p className="mt-1 text-slate-300">
                Our layouts avoid common ATS pitfalls (tables, headers/footers)
                and use clean, machine-readable structure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">
                Do I need an account?
              </h3>
              <p className="mt-1 text-slate-300">
                You can start immediately. Signing in helps you save and edit
                across devices and download later when you’re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="border-b border-slate-900 bg-slate-950 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Image
            src="/assets/founder.jpg"
            alt="Founder"
            width={72}
            height={72}
            className="mx-auto rounded-full ring-2 ring-slate-700"
          />
          <h3 className="mt-4 text-xl font-bold text-slate-50">
            A note from the founder
          </h3>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Job hunting in SA is tough. I built Eon Resume to remove friction:
            one clean, ATS-safe resume that actually matches the job you
            want—without hours of rewriting. You can experience the full
            builder, then only pay when you’re ready to download your CV.
          </p>
          <div className="mt-4 text-sm text-slate-400">
            — The Eon Resume team
          </div>
          <div className="mt-6">
            <Button
              className="bg-sky-500 text-white hover:bg-sky-600"
              asChild
            >
              <Link href="/resumes" prefetch>
                Get Started <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 py-12 text-center text-slate-50">
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
          Ready to build your CV?
        </h2>
        <p className="mb-6 text-sm text-slate-300 sm:text-base">
          Use all features for free. Pay only R10 when you download your CV.
        </p>
        <Button
          asChild
          className="px-8 py-4 text-lg font-semibold bg-sky-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:bg-sky-600"
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
