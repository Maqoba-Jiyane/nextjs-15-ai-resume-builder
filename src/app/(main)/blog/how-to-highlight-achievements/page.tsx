import Image from "next/image";
import type { Metadata } from "next";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "How to Highlight Achievements",
  description:
    "Learn how to effectively showcase your accomplishments on your resume to impress employers and stand out from other applicants.",
  openGraph: {
    title: "How to Highlight Achievements",
    description:
      "Learn how to effectively showcase your accomplishments on your resume to impress employers and stand out from other applicants.",
    url: "https://www.eonresume.co.za/blog/how-to-highlight-achievements",
    siteName: "Eon Resume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2022/06/27/08/09/graduation-7287004_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Writing accomplishments on a resume",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Highlight Achievements",
    description:
      "Show your value by learning how to properly present achievements on your resume.",
    images: [
      "https://cdn.pixabay.com/photo/2022/06/27/08/09/graduation-7287004_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">How to Highlight Achievements</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2022/06/27/08/09/graduation-7287004_1280.jpg"
          alt="Writing accomplishments on a resume"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          Listing job duties is one thing. Showing what you actually achieved? That’s what gets you hired. Employers want to see proof of impact — numbers, outcomes, and results. Here’s how to make your achievements shine on your resume.
        </p>
      </section>

      <Section
        title="1. Add Achievements to Key Sections"
        content={
          <>
            <p>
              You can weave achievements into several parts of your resume — not just work experience.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Summary:</strong> Start with a short highlight at the top.
                <br />
                Example: “Project manager who cut delivery times by 30% across two departments.”
              </li>
              <li>
                <strong>Experience:</strong> Use bullet points that focus on what you accomplished, not just what you were assigned.
              </li>
              <li>
                <strong>Standalone Section:</strong> If you’ve got several wins, add a “Key Achievements” or “Career Highlights” section.
              </li>
            </ul>
          </>
        }
      />

      <Section
        title="2. Quantify Results Whenever You Can"
        content={
          <>
            <p>
              Numbers catch attention and make your work feel real. Instead of writing “Managed a team,” try:
            </p>
            <p className="italic">
              “Led a team of 6 developers to launch a mobile app used by over 50,000 users in its first year.”
            </p>
            <p>
              Try to include metrics like revenue, users, time saved, cost reductions, or satisfaction rates.
            </p>
          </>
        }
      />

      <Section
        title="3. Use Strong Action Verbs"
        content={
          <>
            <p>
              Start every achievement with a verb that shows initiative and impact. Think: “Launched,” “Created,” “Reduced,” “Revamped.”
            </p>
            <p>
              Check out this quick list of{" "}
              <a
                href="https://resumegenius.com/blog/resume-help/accomplishments-for-resume"
                target="_blank"
                className="text-blue-600 underline font-medium"
              >
                resume achievement examples
              </a>{" "}
              and verbs that get noticed.
            </p>
          </>
        }
      />

      <Section
        title="4. Make It Relevant to the Job"
        content={
          <>
            <p>
              Tailor your achievements to what the employer is looking for. Read the job post and mirror back the type of results they want.
            </p>
            <p>
              For example, if a role emphasizes teamwork, highlight wins where collaboration played a key role.
            </p>
          </>
        }
      />

      <Section
        title="5. Don’t Overload Every Role"
        content={
          <>
            <p>
              2–4 strong bullet points per role are better than 8 vague ones. Focus on impact, not filler. Use a consistent format to keep your resume scannable.
            </p>
          </>
        }
      />

      {/* Conclusion */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          You’ve done the work — now show it off. Achievements tell your story better than any job title ever could. They prove your value.
        </p>
        <p className="mt-2">
          If you&apos;re not sure how to write them, let{" "}
          <a
            href="https://www.eonresume.co.za/"
            target="_blank"
            className="text-blue-600 underline font-medium"
          >
            Eon Resume
          </a>{" "}
          help you phrase and format your experience with AI that speaks recruiter.
        </p>
        <p className="mt-2">
          When you&apos;re ready to apply, explore local opportunities on{" "}
          <a
            href="https://www.employmentecho.co.za/"
            target="_blank"
            className="text-blue-600 underline font-medium"
          >
            Employment Echo
          </a>
          .
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
