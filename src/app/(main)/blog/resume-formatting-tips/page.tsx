import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Formatting Tips",
  description:
    "Make your resume easier to read and more effective with formatting tips that help you stand out to recruiters.",
  openGraph: {
    title: "Resume Formatting Tips",
    description:
      "Make your resume easier to read and more effective with formatting tips that help you stand out to recruiters.",
    url: "https://www.eonresume.co.za/blog/resume-formatting-tips",
    siteName: "EonResume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2016/03/01/11/40/lego-blocks-1230133_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Clean and simple resume layout",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Formatting Tips",
    description:
      "Formatting matters. Here&apos;s how to structure your resume to make it readable, clear, and professional.",
    images: [
      "https://cdn.pixabay.com/photo/2016/03/01/11/40/lego-blocks-1230133_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Resume Formatting Tips</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2016/03/01/11/40/lego-blocks-1230133_1280.jpg"
          alt="Clean and simple resume layout"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          A resume isn’t just about the words — the format matters too. Clean, consistent formatting makes it easier for recruiters to scan your experience and instantly see if you&apos;re a fit. Here&apos;s how to get it right.
        </p>
      </section>

      <Section
        title="1. Keep It Concise"
        content={
          <p>
            Stick to one page if you have less than 10 years of experience. Focus on the roles and accomplishments that are most relevant.
            <br />
            Source:{" "}
            <a
              href="https://careercenter.georgetown.edu/major-career-guides/resumes-cover-letters/resume-formatting-tips"
              target="_blank"
              className="text-blue-600 underline"
            >
              Georgetown Career Center
            </a>
          </p>
        }
      />

      <Section
        title="2. Use Standard Fonts and Sizes"
        content={
          <p>
            Use fonts like Arial, Helvetica, or Times New Roman. Body text should be 10–12pt. Keep headings slightly larger, around 14–16pt.
            <br />
            Source:{" "}
            <a
              href="https://ocs.yale.edu/resources/resume-formatting"
              target="_blank"
              className="text-blue-600 underline"
            >
              Yale Office of Career Strategy
            </a>
          </p>
        }
      />

      <Section
        title="3. Maintain Consistent Formatting"
        content={
          <p>
            Whether you&apos;re bolding job titles or italicizing dates, stick to a consistent pattern throughout the document.
            <br />
            Source:{" "}
            <a
              href="https://careerservices.fas.harvard.edu/resources/create-a-strong-resume"
              target="_blank"
              className="text-blue-600 underline"
            >
              Harvard Career Services
            </a>
          </p>
        }
      />

      <Section
        title="4. Use Proper Margins and Spacing"
        content={
          <p>
            Keep margins at 0.5&quot;–1&quot; on all sides. Use spacing between sections and bullet points to keep things readable.
            <br />
            Source:{" "}
            <a
              href="https://careercenter.georgetown.edu/major-career-guides/resumes-cover-letters/resume-formatting-tips"
              target="_blank"
              className="text-blue-600 underline"
            >
              Georgetown University
            </a>
          </p>
        }
      />

      <Section
        title="5. Organize with Clear Headings"
        content={
          <p>
            Use section titles like “Experience,” “Education,” and “Skills.” Group related content and use bullet points under each job.
            <br />
            Source:{" "}
            <a
              href="https://resumegenius.com/blog/resume-help/resume-formatting"
              target="_blank"
              className="text-blue-600 underline"
            >
              Resume Genius
            </a>
          </p>
        }
      />

      <Section
        title="6. List Experience in Reverse Chronological Order"
        content={
          <p>
            Start with your most recent job or degree first, and work backward. This format helps employers quickly see what you’re doing now.
            <br />
            Source:{" "}
            <a
              href="https://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9"
              target="_blank"
              className="text-blue-600 underline"
            >
              Wikipedia
            </a>
          </p>
        }
      />

      <Section
        title="7. Highlight Important Info"
        content={
          <p>
            Use bold or slightly larger text for section headers, your name, and job titles. But avoid overstyling — simplicity wins.
            <br />
            Source:{" "}
            <a
              href="https://www.indeed.com/career-advice/resumes-cover-letters/resume-format-guide-with-examples"
              target="_blank"
              className="text-blue-600 underline"
            >
              Indeed Career Advice
            </a>
          </p>
        }
      />

      <Section
        title="8. Proofread Before You Submit"
        content={
          <p>
            Don’t let a typo undo your effort. Read it aloud. Use Grammarly. And ask someone else to review it too.
          </p>
        }
      />

      {/* Conclusion */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          Great content won’t shine if the layout holds it back. Keep your resume clean, consistent, and easy to scan. If formatting stresses you out, use{" "}
          <a
            href="https://www.eonresume.co.za"
            target="_blank"
            className="text-blue-600 underline font-medium"
          >
            EonResume
          </a>{" "}
          to build beautiful, recruiter-ready resumes that get noticed.
        </p>
      </section>
    </article>
  );
}

// Reusable section component
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
      <div className="text-lg leading-relaxed">{content}</div>
    </section>
  );
}
