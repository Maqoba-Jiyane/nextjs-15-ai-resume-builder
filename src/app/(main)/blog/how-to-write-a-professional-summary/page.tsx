import Image from "next/image";
import type { Metadata } from "next";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "How to Write a Professional Summary",
  description:
    "Learn how to craft a compelling professional summary that highlights your key skills and experiences, making your resume stand out to employers.",
  openGraph: {
    title: "How to Write a Professional Summary",
    description:
      "Learn how to craft a compelling professional summary that highlights your key skills and experiences, making your resume stand out to employers.",
    url: "https://www.eonresume.co.za/blog/how-to-write-a-professional-summary",
    siteName: "EonResume Blog",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_960_720.jpg",
        width: 1200,
        height: 800,
        alt: "Person writing notes on a desk with a laptop",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Professional Summary",
    description:
      "Discover the steps to create an effective professional summary that captures employers&apos; attention.",
    images: [
      "https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_960_720.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">How to Write a Professional Summary</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_960_720.jpg"
          alt="Person writing notes on a desk with a laptop"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          A professional summary is a brief statement at the top of your resume
          that highlights your qualifications, skills, and experiences. It&apos;s
          your elevator pitch to potential employers, providing a snapshot of
          what you bring to the table.
        </p>
        <p className="mt-4">
          Crafting an effective professional summary can significantly impact
          your job search by capturing the attention of hiring managers. Here&apos;s
          how to write one that stands out.
        </p>
      </section>

      <Section
        title="What is a Professional Summary?"
        content={
          <>
            <p>
              A professional summary, also known as a resume summary, is a
              concise overview of your professional background and key
              competencies. It typically consists of 3–5 sentences and is
              positioned at the top of your resume, just below your contact
              information.
            </p>
            <p>
              Unlike a resume objective, which focuses on your career goals, a
              professional summary emphasizes what you can offer to the
              employer.
            </p>
          </>
        }
      />

      <Section
        title="Why Include a Professional Summary?"
        content={
          <>
            <p>Including a professional summary serves several purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Immediate Impact:</strong> Gives hiring managers a
                snapshot of your value in seconds.
              </li>
              <li>
                <strong>Tailored Messaging:</strong> Lets you customize based on
                the job post.
              </li>
              <li>
                <strong>ATS Optimization:</strong> Helps you rank better in
                Applicant Tracking Systems.
              </li>
            </ul>
          </>
        }
      />

      <Section
        title="How to Write a Professional Summary"
        content={
          <>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Scan the job description</strong> and match it with your
                key skills.
              </li>
              <li>
                <strong>Lead with a strong opener:</strong> Your title +
                experience.
              </li>
              <li>
                <strong>Highlight wins:</strong> Use real achievements, ideally
                with metrics.
              </li>
              <li>
                <strong>Keep it short:</strong> 3–5 lines max.
              </li>
            </ol>
          </>
        }
      />

      <Section
        title="Examples of Professional Summaries"
        content={
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Marketing Manager</h3>
              <p className="mt-2">
                &quot;Results-driven Marketing Manager with 8+ years of experience
                creating digital campaigns that drove a 25% boost in revenue.
                Skilled in SEO, paid ads, and brand positioning.&quot;
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Software Developer</h3>
              <p className="mt-2">
                &quot;Full-stack developer with 5 years of experience in building
                scalable web apps. Proficient in React, Node.js, and cloud
                platforms. Led a project that reduced load time by 40%.&quot;
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Registered Nurse</h3>
              <p className="mt-2">
                &quot;Compassionate RN with 10+ years in emergency and acute care.
                Recognized for reducing patient wait times by 30% and mentoring
                junior staff in patient-focused care.&quot;
              </p>
            </div>
          </>
        }
      />

      {/* Final Thought */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          Your professional summary is the first thing recruiters read. Done
          well, it positions you as the right candidate before they even get to
          your experience.
        </p>
        <p className="mt-2">
          Don’t skip it — use it to immediately communicate who you are, what
          you’ve done, and why you’re the right fit.
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
