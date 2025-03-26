import Image from "next/image";
import type { Metadata } from "next";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "The Perfect Resume Length",
  description:
    "Discover the ideal resume length to effectively showcase your experience and skills, tailored to your career stage.",
  openGraph: {
    title: "The Perfect Resume Length",
    description:
      "Discover the ideal resume length to effectively showcase your experience and skills, tailored to your career stage.",
    url: "https://www.eonresume.co.za/blog/the-perfect-resume-length",
    siteName: "EonResume Blog",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2016/03/26/13/09/work-1280538_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Person typing on a laptop with resume documents",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfect Resume Length",
    description:
      "Learn how to determine the ideal resume length to best present your qualifications.",
    images: [
      "https://cdn.pixabay.com/photo/2016/03/26/13/09/work-1280538_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">The Perfect Resume Length</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2016/03/26/13/09/work-1280538_1280.jpg"
          alt="Person typing on a laptop with resume documents"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          Crafting the perfect resume involves more than detailing your
          experience; it&apos;s also about presenting it concisely. A common question
          among job seekers is: <em>How long should my resume be?</em> The
          answer varies based on your career stage and the role you&apos;re applying
          for.
        </p>
      </section>

      {/* One-Page Resume */}
      <Section
        title="One-Page Resume: For Early Career Professionals"
        content={
          <>
            <p>
              If you&apos;re a recent graduate or have less than 10 years of
              experience, a one-page resume is typically sufficient. This length
              allows you to highlight your education, key skills, and relevant
              experience without overwhelming the reader.
            </p>
            <p>
              According to{" "}
              <a
                href="https://www.indeed.com/career-advice/resumes-cover-letters/how-long-should-a-resume-be"
                className="text-blue-600 underline" target="_blank"
              >
                Indeed.com
              </a>
              , keeping your resume concise ensures that hiring managers can
              quickly assess your qualifications.
            </p>
          </>
        }
      />

      {/* Two-Page Resume */}
      <Section
        title="Two-Page Resume: For Seasoned Professionals"
        content={
          <>
            <p>
              Professionals with over 10 years of experience or those in
              managerial roles may require a two-page resume. This length
              provides space to detail extensive work history, accomplishments,
              and skills relevant to the position.
            </p>
            <p>
              As noted by{" "}
              <a
                href="https://www.coursera.org/articles/how-many-pages-should-a-resume-be"
                className="text-blue-600 underline" target="_blank"
              >
                Coursera
              </a>
              , a two-page resume is appropriate for individuals with extensive
              experience that is pertinent to the job.
            </p>
          </>
        }
      />

      {/* Three or More Pages */}
      <Section
        title="Three or More Pages: For Senior Executives and Academics"
        content={
          <>
            <p>
              Certain fields, such as academia or executive leadership, may
              necessitate a longer resume or CV to encompass publications,
              presentations, and detailed leadership roles.
            </p>
            <p>
              However, it&apos;s crucial to ensure that all information included is
              relevant and adds value to your application.
            </p>
          </>
        }
      />

      {/* Tips for Keeping Your Resume Concise */}
      <Section
        title="Tips for Keeping Your Resume Concise"
        content={
          <>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Be Selective:</strong> Include only experiences and
                skills pertinent to the job you&apos;re applying for.
              </li>
              <li>
                <strong>Use Bullet Points:</strong> Present information in
                bullet points for clarity and brevity.
              </li>
              <li>
                <strong>Avoid Redundancy:</strong> Refrain from repeating
                information; each point should offer new insights.
              </li>
              <li>
                <strong>Quantify Achievements:</strong> Use metrics to
                succinctly convey the impact of your work.
              </li>
            </ul>
          </>
        }
      />

      {/* Conclusion */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Conclusion</h2>
        <p>
          The ideal resume length aligns with your experience level and the
          industry standards of your field. By tailoring the length and content
          of your resume to your specific situation, you present a clear and
          compelling narrative to potential employers.
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
