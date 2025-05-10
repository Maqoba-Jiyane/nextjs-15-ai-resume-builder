import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Eon Resume's AI Can Write Your Work Experience",
  description:
    "See how Eon Resume uses AI to turn your job history into professional, tailored resume content that gets attention.",
  openGraph: {
    title: "How Eon Resume's AI Can Write Your Work Experience",
    description:
      "See how Eon Resume uses AI to turn your job history into professional, tailored resume content that gets attention.",
    url: "https://www.eonresume.co.za/blog/how-eonresumes-ai-can-write-your-work-experience",
    siteName: "Eon Resume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2023/05/08/08/41/ai-7977960_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Artificial intelligence powering resume creation",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Eon Resume's AI Can Write Your Work Experience",
    description:
      "Let Eon Resume help you write clear, tailored work experience bullet points in seconds. Here's how it works.",
    images: [
      "https://cdn.pixabay.com/photo/2023/05/08/08/41/ai-7977960_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          How Eon Resume&apos;s AI Can Write Your Work Experience
        </h1>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/08/08/41/ai-7977960_1280.jpg"
          alt="Artificial intelligence powering resume creation"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          Writing your work experience can be the hardest part of building a
          resume. It’s easy to undersell what you’ve done — or get stuck trying
          to make it sound “professional.”
        </p>
        <p className="mt-4">
          Eon Resume takes the guesswork out of this. Our AI turns your job
          titles and key tasks into bullet points that highlight real skills,
          results, and impact — tailored to the role you want.
        </p>
      </section>

      <Section
        title="1. From Job Title to Impact Statement"
        content={
          <>
            <p>
              You enter a basic job title and describe what you did. Eon Resume
              uses that input to create clear, confident bullet points that show
              your value.
            </p>
            <p className="italic">
              Example: “Waiter at Spur” becomes → “Delivered efficient, friendly
              service to 100+ customers per day, consistently ranked top for
              customer feedback.”
            </p>
          </>
        }
      />

      <Section
        title="2. Tailored to the Job You Want"
        content={
          <>
            <p>
              Eon Resume doesn’t just write generic experience. The AI scans job
              ads or lets you paste one in — then adjusts your phrasing and
              keywords to better match what recruiters are looking for.
            </p>
            <p>
              This helps your resume get through ATS filters and actually speak
              to the role.
            </p>
          </>
        }
      />

      <Section
        title="3. Professional Tone, Every Time"
        content={
          <>
            <p>
              Writing for yourself is hard. Eon Resume helps strike the right
              tone — polished and confident, but never exaggerated or fake. It
              knows how to translate everyday work into resume language that
              feels honest and strong.
            </p>
          </>
        }
      />

      <Section
        title="4. Multiple Versions in Minutes"
        content={
          <>
            <p>
              Need to apply for two different roles? No problem. You can create
              multiple resume versions, each one optimized for a specific
              industry or job type, all in minutes.
            </p>
            <p>
              Whether you&apos;re applying for admin roles, marketing jobs, or
              technical positions — the AI adapts your experience accordingly.
            </p>
          </>
        }
      />

      {/* Conclusion */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          If writing your work experience section has held you back from
          updating your resume — you’re not alone. But now, it doesn’t have to.
        </p>
        <p className="mt-2">
          Let the AI do the heavy lifting. You bring the experience — Eon Resume
          helps you say it right.
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
