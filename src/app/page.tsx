import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// ⬇️ Lazy-load heavy testimonials (client-only)
const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-20 text-center text-sm text-muted-foreground">Loading…</div>,
});

// ⬇️ Move benefits up (fix TDZ) + update copy to reflect FREE
const benefits = [
  {
    title: "💸 100% Free — Unlimited Downloads",
    description: "Build and download your resume at no cost. No credit card. No subscription.",
  },
  {
    title: "📄 ATS-Friendly Designs",
    description: "Professional templates built to pass Applicant Tracking Systems.",
  },
  {
    title: "🧠 Tailored to Job Descriptions",
    description: "Paste a job post and we’ll align your resume with the right keywords.",
  },
  {
    title: "🎯 SMART Skills & Summaries",
    description: "AI suggests action-oriented bullets based on your actual experience.",
  },
  {
    title: "⚡ Instant, On-Demand",
    description: "Start building immediately. Export in minutes.",
  },
  {
    title: "🌍 Built for South Africans",
    description: "Localised styles and content structure that recruiters expect.",
  },
] as const;

const templates = [
  { name: "Classic", image: "/assets/templates/Classic.jpg" },
  { name: "ATS Friendly", image: "/assets/templates/ScienceEngineeringResume.png" },
  { name: "Modern", image: "/assets/templates/ClassicResumeRich.png" },
] as const;

export default function LandingPage() {
  return (
    <main className="bg-gray-50 text-gray-900 w-full">
      {/* Hero */}
      <section className="bg-white py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center">
        <Image
          src="/assets/logo.png"
          alt="Eon Resume"
          width={200}
          height={100}
          priority
        />
        {/* FREE badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-emerald-700 ring-1 ring-emerald-200">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium">Resumes are FREE — unlimited downloads</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 max-w-3xl leading-tight">
          AI-Crafted, ATS-Optimized Resumes in Minutes — Free Forever
        </h1>
        <p className="text-lg mt-4 max-w-2xl text-gray-600">
          Professional templates, localised for South Africa. Start now — no sign-up required.
        </p>

        <Button asChild className="mt-6 text-lg px-8 py-4" aria-label="Create my resume now">
          <Link href="/resumes" prefetch>
            Create My Resume — It’s Free
          </Link>
        </Button>

        {/* Social proof mini */}
        <p className="mt-3 text-xs text-gray-500">
          No ads. No paywalls. Export as PDF or DOCX.
        </p>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Eon Resume?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {benefits.map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle className="mt-1 size-5 text-emerald-600" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-gray-100 py-16 px-6 sm:px-12 text-center">
        <h2 className="text-3xl font-bold mb-10">Choose a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {templates.map((t, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden ring-1 ring-gray-200">
                <Image
                  src={t.image}
                  alt={`${t.name} resume template`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
        <Button asChild className="mt-8">
          <Link href="/resumes" prefetch>
            Start for Free
          </Link>
        </Button>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* “Pricing” → Free Forever */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-600 mb-10">Everything you need to get hired — at no cost.</p>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg ring-1 ring-gray-200">
              <h3 className="text-xl font-bold text-emerald-700">Free Forever</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">R0</p>
              <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700">
                <li>• Unlimited resume builds & downloads (PDF)</li>
                <li>• ATS-ready templates</li>
                <li>• AI summaries & bullet suggestions</li>
                <li>• Match keywords to job descriptions</li>
              </ul>
              <Button asChild className="mt-6" aria-label="Build your free resume">
                <Link href="/resumes" prefetch>
                  Build Your Free Resume
                </Link>
              </Button>
              <p className="mt-3 text-xs text-gray-500">
                Optional add-ons coming soon (cover letters, advanced ATS checks).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-6 sm:px-12 bg-gray-900 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="mb-6 opacity-90">Craft your professional, ATS-ready resume in minutes — free.</p>
        <Button asChild className="text-lg px-8 py-4" aria-label="Create my free resume">
          <Link href="/resumes" prefetch>
            Create My Free Resume
          </Link>
        </Button>
      </section>
    </main>
  );
}
