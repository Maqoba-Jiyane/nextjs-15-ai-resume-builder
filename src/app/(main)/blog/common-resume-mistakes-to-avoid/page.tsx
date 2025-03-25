import Image from "next/image";

export async function generateMetadata() {
  const title = "Common Resume Mistakes to Avoid";
  const description =
    "Learn the common mistakes that might be costing you interviews.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: 'https://eonresume.co.za/blogs/photo-1565688534245-05d6b5be184a.webp',
          width: 1200,
          height: 600,
          alt: "Resume layout flat lay",
        },
      ],
      type: "article",
      publishedTime: "2025-03-23T00:00:00Z", // Add the publication date
      authors: ["EonResume"], // Add the author's name
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        {
          url: 'https://eonresume.co.za/blogs/photo-1562564055-71e051d33c19.avif',
          width: 1200,
          height: 600,
          alt: "Resume layout flat lay",
        },],
    },
  };
}

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Common Resume Mistakes to Avoid</h1>
        <Image
          src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q29tbW9uJTIwUmVzdW1lJTIwTWlzdGFrZXMlMjB0byUyMEF2b2lkfGVufDB8fDB8fHwy"
          alt="Messy resume on cluttered desk"
          width={1200}
          height={600}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          A great resume can open doors, but even small mistakes can quietly shut them. If you&apos;re not landing interviews, it&apos;s worth checking for these common errors that hiring managers see daily—and reject quickly.
        </p>
        <p className="mt-4">
          Here are the top resume mistakes to avoid—and how to fix them.
        </p>
      </section>

      {/* Mistake Sections */}
      <Mistake
        title="1. Using a Generic Resume for Every Job"
        content={
          <>
            <p>
              One resume does not fit all. If you&apos;re blasting the same version to every company, you’re missing opportunities.
            </p>
            <p>
              Tailor your resume by using keywords from the job description and focusing on relevant experience.
            </p>
            <p>
              Tools like{" "}
              <a href="https://www.eonresume.co.za" className="text-blue-600 underline font-medium">
                EonResume
              </a>{" "}
              make this easier by comparing your resume to the job you are applying for.
            </p>
          </>
        }
      />

      <Mistake
        title="2. Focusing on Duties Instead of Results"
        content={
          <>
            <p>
              Listing what you were “responsible for” doesn’t show what you actually accomplished. Employers want impact, not task lists.
            </p>
            <p>
              Instead of “Handled social media accounts,” write “Increased Instagram engagement by 65% in 3 months.”
            </p>
          </>
        }
      />

      <Mistake
        title="3. Including Irrelevant or Outdated Info"
        content={
          <>
            <p>
              Remove old jobs that no longer matter, especially if they’re over 10 years back or unrelated.
            </p>
            <p>
              Skip high school education (if you have post-secondary), and ditch lines like “References available upon request.”
            </p>
          </>
        }
      />

      <Mistake
        title="4. Poor Formatting and Design"
        content={
          <>
            <p>
              Cluttered layouts, inconsistent fonts, and walls of text kill readability. Your resume should be scannable in seconds.
            </p>
            <p>
              Keep it clean, use white space, and stick to easy-to-read fonts like Calibri, Arial, or Helvetica.
            </p>
            <p>
              <a href="https://www.eonresume.co.za" className="text-blue-600 underline font-medium">
                EonResume
              </a>{" "}
              gives you clean, recruiter-ready layouts that don’t get mangled by ATS systems.
            </p>
          </>
        }
      />

      <Mistake
        title="5. Typos, Grammar Errors, and Inconsistencies"
        content={
          <>
            <p>
              A single typo can make you look careless. Grammar slips, inconsistent punctuation, or formatting issues are red flags.
            </p>
            <p>
              Always proofread, use tools like Grammarly, and ask someone else to review your resume before sending.
            </p>
          </>
        }
      />

      {/* CTA Section */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Check</h2>
        <p>
          Your resume only has a few seconds to make an impression. Avoiding these mistakes could be the difference between getting ghosted or getting that call back.
        </p>
        <p className="mt-4">
          If you want help building a resume that’s clean, optimized, and tailored—check out{" "}
          <a href="https://www.eonresume.co.za" className="text-blue-600 underline font-medium">
            EonResume
          </a>
          . And once you&apos;re ready to apply, explore fresh roles on{" "}
          <a href="https://www.employmentecho.co.za" className="text-blue-600 underline font-medium">
            Employment Echo
          </a>
          .
        </p>
      </section>
    </article>
  );
}

// Reusable Mistake Section Component
function Mistake({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 underline">{title}</h2>
      <div className="text-lg space-y-3 leading-relaxed">{content}</div>
    </section>
  );
}
