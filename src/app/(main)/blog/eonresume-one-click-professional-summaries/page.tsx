import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eon Resume One-Click Professional Summaries",
  description:
    "Skip the guesswork. Eon Resume's AI writes a clear, tailored professional summary for you in one click — so you can focus on getting hired.",
  openGraph: {
    title: "Eon Resume One-Click Professional Summaries",
    description:
      "Skip the guesswork. Eon Resume's AI writes a clear, tailored professional summary for you in one click — so you can focus on getting hired.",
    url: "https://www.eonresume.co.za/blog/eonresume-one-click-professional-summaries",
    siteName: "Eon Resume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2024/01/10/16/21/laptop-8499942_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Typing a resume summary on a laptop",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eon Resume One-Click Professional Summaries",
    description:
      "Let AI write your resume summary in seconds. Here's how Eon Resume helps you skip the hardest part of the process.",
    images: [
      "https://cdn.pixabay.com/photo/2024/01/10/16/21/laptop-8499942_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Eon Resume One-Click Professional Summaries
        </h1>
        <Image
          src="https://cdn.pixabay.com/photo/2024/01/10/16/21/laptop-8499942_1280.jpg"
          alt="Typing a resume summary on a laptop"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          The summary at the top of your resume is one of the first things
          employers read — and one of the hardest things to write. It’s meant to
          show who you are, what you bring, and why it matters — all in just a
          few lines.
        </p>
        <p className="mt-4">
          With Eon Resume’s One-Click Summary feature, you can skip the blank
          page and get a polished, tailored introduction written for you —
          instantly.
        </p>
      </section>

      <Section
        title="How It Works"
        content={
          <>
            <p>
              You enter your job title, career focus, or paste in a job ad —
              and Eon Resume’s AI gets to work. It creates a professional summary
              that matches your profile and the role you want, using clear,
              confident language.
            </p>
            <p>
              Whether you&apos;re a student, admin, technician, or senior manager —
              your summary is written to reflect your level and strengths.
            </p>
          </>
        }
      />

      <Section
        title="What Makes It Different"
        content={
          <>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>It’s specific:</strong> No generic fluff. Your summary is
                based on real input from your background or the job posting.
              </li>
              <li>
                <strong>It sounds natural:</strong> Clear, to the point, and
                professional — no buzzwords or filler.
              </li>
              <li>
                <strong>It’s fast:</strong> Just click, copy, and tweak if you want.
                Done in under 30 seconds.
              </li>
            </ul>
          </>
        }
      />

      <Section
        title="Example Output"
        content={
          <>
            <p className="italic">
              “Detail-oriented Administrative Assistant with 4+ years of
              experience supporting cross-functional teams, managing schedules,
              and improving workflow efficiency. Known for clear communication,
              fast learning, and delivering on time in busy environments.”
            </p>
            <p className="mt-4 italic">
              “Results-driven Sales Manager with a decade of experience leading
              high-performing teams and driving revenue growth in retail and
              e-commerce sectors. Skilled in strategy, coaching, and data-driven
              decision-making.”
            </p>
          </>
        }
      />

      <Section
        title="Why It Matters"
        content={
          <>
            <p>
              Writing a good summary on your own can take hours. You might not
              know what tone to use, what details to include, or how to make it
              sound sharp. Eon Resume removes the friction so you can move
              forward with a solid start — fast.
            </p>
            <p>
              Whether you&apos;re applying to one job or updating your entire resume,
              this feature helps you make a strong first impression with less
              effort.
            </p>
          </>
        }
      />

      {/* Final Thought */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          Your summary is the headline of your resume. Don’t let it hold you
          back. With Eon Resume, you get a strong opening line — even if writing
          isn’t your thing.
        </p>
        <p className="mt-2">
          No templates. No fluff. Just one click to clarity.
        </p>
      </section>
    </article>
  );
}

// Reusable Section Component
function Section({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 underline">{title}</h2>
      <div className="text-lg space-y-3 leading-relaxed">{content}</div>
    </section>
  );
}
