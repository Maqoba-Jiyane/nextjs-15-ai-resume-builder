import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Write a Cover Letter",
  description:
    "A practical, no-fluff guide to writing a cover letter that’s clear, confident, and actually gets read.",
  openGraph: {
    title: "How to Write a Cover Letter",
    description:
      "A practical, no-fluff guide to writing a cover letter that’s clear, confident, and actually gets read.",
    url: "https://www.eonresume.co.za/blog/how-to-write-a-cover-letter",
    siteName: "EonResume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2017/03/02/05/19/invitation-2110452_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Person writing a cover letter at a wooden desk",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Cover Letter",
    description:
      "Write a cover letter that shows confidence, relevance, and real interest in the job. Here’s how.",
    images: [
      "https://cdn.pixabay.com/photo/2017/03/02/05/19/invitation-2110452_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">How to Write a Cover Letter</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2017/03/02/05/19/invitation-2110452_1280.jpg"
          alt="Person writing a cover letter at a wooden desk"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          A cover letter shouldn’t be a repeat of your CV. It’s your chance to explain why this role, this company, and this timing make sense for you. It should feel human — not robotic or recycled.
        </p>
        <p className="mt-4">
          Here’s how to write a clear, confident cover letter that doesn’t waste words or the reader’s time.
        </p>
      </section>

      <Section
        title="1. Start With a Proper Greeting"
        content={
          <>
            <p>
              Whenever possible, address the letter to a specific person. “Dear Hiring Manager” is fine if you can’t find a name — but avoid “To Whom It May Concern.”
            </p>
            <p>
              If you know the department or recruiter, use it. A small detail like this shows effort.
            </p>
          </>
        }
      />

      <Section
        title="2. Open With a Strong First Line"
        content={
          <>
            <p>
              Get to the point. Mention the role you’re applying for and why it caught your interest — not in a generic way, but in a way that sounds like *you*.
            </p>
            <p className="italic">
              Example: “I’m excited to apply for the Digital Marketing Manager role because it’s the exact kind of challenge I’ve been looking for — strategy, data, and creative all in one.”
            </p>
          </>
        }
      />

      <Section
        title="3. Show Why You're a Strong Match"
        content={
          <>
            <p>
              Highlight 1–2 specific things from your background that align with the job. This could be an achievement, a relevant skill, or experience from a similar industry.
            </p>
            <p>
              Keep it tight and tailored — don’t list your whole career.
            </p>
          </>
        }
      />

      <Section
        title="4. Show That You Understand the Company"
        content={
          <>
            <p>
              This is where you show you’ve done your research. Mention something real — like a recent project, product, value, or even the tone of their website — and connect it to why you’d be a good fit.
            </p>
            <p>
              It doesn’t need to be deep, but it should be genuine.
            </p>
          </>
        }
      />

      <Section
        title="5. Close Confidently"
        content={
          <>
            <p>
              Wrap it up by restating your interest and suggesting next steps. Don’t beg or over-promise — just sound ready.
            </p>
            <p className="italic">
              Example: “Thanks for taking the time to read this. I’d love to talk more about how I can contribute to your team.”
            </p>
          </>
        }
      />

      <Section
        title="6. Keep It to One Page"
        content={
          <>
            <p>
              Your cover letter should be short — half a page to three-quarters max. Use white space, skip the fluff, and write like a real person.
            </p>
          </>
        }
      />

      {/* Final Thought */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          A great cover letter adds context, personality, and clarity. It doesn’t need to be formal or fancy — just honest, focused, and relevant.
        </p>
        <p className="mt-2">
          When done right, it can be the difference between getting skipped and getting called.
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
