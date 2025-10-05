// app/(marketing)/page.tsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Sparkles, Zap, Lock, BadgeCheck } from "lucide-react";

const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <div className="py-20 text-center text-sm text-muted-foreground">
      Loading…
    </div>
  ),
});

const benefits = [
  {
    title: "ATS-Friendly Designs",
    description: "Clean structure engineered to pass Applicant Tracking Systems.",
    icon: <CheckCircle className="size-5" aria-hidden="true" />,
    tier: "free",
  },
  {
    title: "Built for South Africa",
    description: "Localised styles, date formats, and sections SA recruiters expect.",
    icon: <Zap className="size-5" aria-hidden="true" />,
    tier: "free",
  },
  {
    title: "AI Summaries & Bullets",
    description: "Action verbs and quantified statements tailored to your experience.",
    icon: <Sparkles className="size-5" aria-hidden="true" />,
    tier: "free",
  },
  {
    title: "PDF Export + All Templates",
    description: "Use every template and export to PDF for bespoke tweaks.",
    icon: <Lock className="size-5" aria-hidden="true" />,
    tier: "pro",
  },
  {
    title: "Unlimited Resumes",
    description: "Create and manage as many versions as you need for each job.",
    icon: <Lock className="size-5" aria-hidden="true" />,
    tier: "pro",
  },
  {
    title: "Priority Support",
    description: "Fast help when you need it the most.",
    icon: <Lock className="size-5" aria-hidden="true" />,
    tier: "pro",
  },
] as const;

const templates = [
  { name: "Classic (FREE)", tier: "free", image: "/assets/templates/Classic.jpg" },
  { name: "ATS Friendly (FREE)", tier: "free", image: "/assets/templates/ScienceEngineeringResume.png" },
  { name: "Classic Rich (FREE)", tier: "free", image: "/assets/templates/ClassicResumeRich.png" },
  { name: "Dark Blue Frame (PRO)", tier: "pro", image: "/assets/templates/DarkBlueFrameMinimalistResume.png" },
  { name: "Modern Sidebar (PRO)", tier: "pro", image: "/assets/templates/MordernSidebarResume.png" },
  { name: "Blue Creative (PRO)", tier: "pro", image: "/assets/templates/BlueCreativeResume.png" },
] as const;

const trustLogos = [
  { alt: "Finance", src: "/assets/trust/finance.png" },
  { alt: "Telecom", src: "/assets/trust/telecom.png" },
  { alt: "Retail", src: "/assets/trust/retail.png" },
  { alt: "Tech", src: "/assets/trust/tech.png" },
  { alt: "Energy", src: "/assets/trust/energy.jpg" },
];

export const metadata = {
  title: "Eon Resume — AI-Crafted, ATS-Optimized Resumes (Free + Premium)",
  description:
    "Build an ATS-friendly resume in minutes. Free plan includes 1 resume and core templates. Premium from R149/week or R499/month unlocks unlimited resumes, all templates, and PDF export.",
  openGraph: {
    title: "Eon Resume — AI-Crafted, ATS-Optimized (Free + Premium)",
    description:
      "Free: 1 resume + core templates. Premium: unlimited resumes, all templates, PDF.",
    type: "website",
    url: "https://your-domain.com/",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: "Eon Resume" }],
  },
  alternates: { canonical: "https://your-domain.com/" },
};

export default function LandingPage() {
  return (
    <main className="bg-white text-slate-900 w-full">
      {/* SEO JSON-LD */}
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Eon Resume",
          url: "https://your-domain.com/",
        })}
      </Script>
      <Script id="ld-product" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Eon Resume",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: [
            { "@type": "Offer", name: "Free", price: "0", priceCurrency: "ZAR" },
            {
              "@type": "Offer",
              name: "Premium Weekly",
              price: "149",
              priceCurrency: "ZAR",
              priceSpecification: { "@type": "UnitPriceSpecification", billingIncrement: 1, unitCode: "WEE" },
            },
            {
              "@type": "Offer",
              name: "Premium Monthly",
              price: "499",
              priceCurrency: "ZAR",
              priceSpecification: { "@type": "UnitPriceSpecification", billingIncrement: 1, unitCode: "MON" },
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
            Free plan: 1 resume & core templates
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            AI-Crafted, ATS-Optimized Resumes{" "}
            <span className="text-blue-600">that Get Seen</span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Start free in minutes. Upgrade to Premium (R149/week or R499/month) for unlimited resumes, all templates, and PDF export.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="text-base px-6 py-6 bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/resumes" prefetch aria-label="Create my resume now">
                Create My Resume
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="hover:text-blue-700 text-white border-blue-200 hover:bg-blue-50 px-6 py-6"
              aria-label="See pricing"
            >
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>

          {/* TRUST */}
          <p className="mt-8 text-sm text-slate-500">Where our users have landed interviews (self-reported)</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-90 logos">
            {trustLogos.map((l, i) => (
              <div
                key={i}
                className="logo group rounded-md px-2 py-1 ring-1 ring-slate-200/70 bg-white/60 backdrop-blur-[1px] will-change-transform"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={110}
                  height={30}
                  className="opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
            <style>{`
              .logos .logo { opacity: 0; transform: translateY(12px) scale(0.98); animation: fadeUp .48s ease-out forwards; }
              .logos .logo:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 6px 16px rgba(15,23,42,.08); transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms; }
              @keyframes fadeUp { to { opacity: 1; transform: translateY(0) scale(1); } }
              @media (prefers-reduced-motion: reduce) {
                .logos .logo { animation: none; opacity: 1; transform: none; }
                .logos .logo:hover { transform: none; box-shadow: none; }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="benefits" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to stand out</h2>
            <p className="mt-2 text-slate-600">Free core tools, powerful Premium upgrades.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border bg-white p-5 shadow-sm hover:shadow transition-shadow",
                  b.tier === "pro" && "relative"
                )}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-blue-50 p-2 text-blue-700">
                  {b.icon}
                </div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{b.description}</p>
                {b.tier === "pro" && (
                  <span className="absolute top-4 right-4 text-xxs uppercase tracking-wide rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 ring-1 ring-slate-200">
                    Premium
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">From blank page to job-ready in 3 steps</h2>
              <ol className="mt-6 space-y-5 text-slate-700">
                <li><span className="font-semibold">1. Pick a template</span> — FREE or PRO.</li>
                <li><span className="font-semibold">2. Paste a job link</span> — we align your resume to the role.</li>
                <li><span className="font-semibold">3. Export & apply</span> — PDF on Free and Premium.</li>
              </ol>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white ">
                  <Link href="/resumes" prefetch>Start for Free</Link>
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

      {/* TEMPLATES */}
      <section id="templates" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Choose a template</h2>
          <p className="mt-2 text-slate-600">Clear, modern, and ATS-safe. FREE and PRO options.</p>

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
                  <p className="font-semibold">{t.name}</p>
                  <span
                    className={cn(
                      "text-xxs uppercase tracking-wide rounded-full px-2 py-0.5 ring-1 transition-transform duration-300 group-hover:-translate-y-0.5",
                      t.tier === "free"
                        ? "bg-blue-50 text-blue-700 ring-blue-200"
                        : "bg-slate-100 text-slate-700 ring-slate-200"
                    )}
                  >
                    {t.tier === "free" ? "Free" : "Pro"}
                  </span>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.14)" }} // blue-500
                />
              </div>
            ))}

            {/* local CSS for stagger-in; plain <style> so it's RSC-safe */}
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
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/resumes" prefetch>Start Free</Link>
            </Button>
            <Button asChild variant="outline" className="text-white hover:text-blue-700 border-blue-200 hover:bg-blue-50">
              <a href="#pricing">Go Premium</a>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PRICING */}
      <section id="pricing" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Pricing that grows with you</h2>
          <p className="mt-2 text-slate-600">Start free. Upgrade anytime.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-8 text-left shadow-sm">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">R0</p>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>1 resume</strong> (limit on free plan)</li>
                <li>• Core FREE templates</li>
                <li>• PDF export</li>
                <li>• ATS-friendly structure</li>
                <li>• AI summaries & bullets</li>
              </ul>
              <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white " aria-label="Start free">
                <Link href="/resumes" prefetch>Start Free</Link>
              </Button>
              <p className="mt-3 text-xs text-slate-500">Upgrade later to unlock PRO features.</p>
            </div>

            {/* Weekly */}
            <div className="relative rounded-2xl ring-2 ring-blue-300 bg-white p-8 text-left shadow-lg">
              <span className="absolute -top-3 right-4 text-xxs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                Most Flexible
              </span>
              <h3 className="text-xl font-bold">Premium — Weekly</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">
                R149 <span className="text-base font-medium text-slate-500">/week</span>
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Unlimited resumes</strong></li>
                <li>• All PRO templates</li>
                <li>• PDF export</li>
                <li>• Priority support</li>
              </ul>
              <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white " aria-label="Upgrade to Premium Weekly">
                <Link href="/pricing?plan=weekly">Upgrade — R149/week</Link>
              </Button>
              <p className="mt-3 text-xs text-slate-500">Cancel anytime.</p>
            </div>

            {/* Monthly */}
            <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-xl font-bold">Premium — Monthly</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">
                R499 <span className="text-base font-medium text-slate-500">/month</span>
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Unlimited resumes</strong></li>
                <li>• All PRO templates</li>
                <li>• PDF export</li>
                <li>• Priority support</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full text-white hover:text-blue-700 border-blue-200 hover:bg-blue-50" aria-label="Upgrade to Premium Monthly">
                <Link href="/pricing?plan=monthly">Upgrade — R499/month</Link>
              </Button>
              <p className="mt-3 text-xs text-slate-500">Best for ongoing job hunts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Frequently asked questions</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-slate-700">
            <div>
              <h3 className="font-semibold">Is it really free?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Yes. The Free plan lets you create <strong>one resume</strong> using core templates and export to PDF.
                Upgrade to Premium for unlimited resumes and all templates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">What do I get on Premium?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Unlimited resumes, every template (PRO), PDF export, and priority support.
                Premium Weekly is <strong>R149</strong>; Premium Monthly is <strong>R499</strong>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Will my resume pass ATS?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Our layouts avoid common ATS pitfalls (tables, headers/footers) and use clean, machine-readable structure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Do I need an account?</h3>
              <p className="text-sm text-slate-600 mt-1">
                You can start immediately. Signing in helps you save and edit across devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 text-white text-center bg-gradient-to-b from-slate-900 via-slate-900 to-blue-900">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to get started?</h2>
        <p className="mb-6 opacity-90">Create your first resume free. Upgrade anytime.</p>
        <Button asChild className="text-lg px-8 py-4 text-white bg-blue-600 hover:bg-blue-700" aria-label="Create my free resume">
          <Link href="/resumes" prefetch>Create My Free Resume</Link>
        </Button>
      </section>
    </main>
  );
}
