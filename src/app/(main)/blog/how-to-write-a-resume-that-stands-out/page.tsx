import Image from "next/image";
 
export async function generateMetadata() {
  const title = "How to Write a Resume That Stands Out";
  const description =
    "Learn how to write a resume that grabs attention and lands interviews. Tips on tailoring, formatting, and showcasing achievements.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: 'https://eonresume.co.za/blogs/photo-1562564055-71e051d33c19.png',
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
          url: 'https://eonresume.co.za/blogs/photo-1562564055-71e051d33c19.png',
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
        <h1 className="text-4xl font-bold mb-4">How to Write a Resume That Stands Out</h1>
        <Image
          src="https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Resume layout flat lay"
          width={1200}
          height={600}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          In a pile of resumes, yours has <em>seconds</em> to make an impact. If it doesn&apos;t grab attention fast, it&apos;s tossed. Here&apos;s how to write a resume that not only gets read but lands interviews.
        </p>
      </section>

      <Section
        title="1. Lead With a Strong Summary"
        content={
          <>
            <p>Skip the generic &quot;I&apos;m a hardworking professional...&quot; fluff. Instead, use a <strong>3–4 line summary</strong> that highlights:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your title and expertise</li>
              <li>Key achievements or specialties</li>
              <li>What you bring to the table</li>
            </ul>
            <p className="italic mt-2">&quot;Data analyst with 5+ years of experience helping Fortune 500 companies make sense of complex data. Expert in <strong>Python</strong>, <strong>SQL</strong>, and <strong>Tableau</strong>...&quot;</p>
          </>
        }
      />

      <Section
        title="2. Tailor It to the Job"
        content={
          <>
            <p>One-size-fits-all resumes are a dead end. Each resume should match the job you&apos;re applying for.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mirror the language used in the job description</li>
              <li>Highlight experience that matches the company&apos;s needs</li>
              <li>Cut irrelevant roles or skills</li>
            </ul>
            <p>
              Use keywords the company uses — <strong>they matter</strong> for both hiring managers and applicant tracking systems (ATS).
              <span className="block mt-2">
                Tools like <a href="https://eonresume.co.za" className="text-blue-600 underline font-medium" target="_blank">EonResume</a> can help you tailor your resume instantly using AI to match job descriptions.
              </span>
            </p>
          </>
        }
      />

      <Section
        title="3. Focus on Achievements, Not Duties"
        content={
          <>
            <p>Hiring managers don&apos;t care what your job <em>was</em>, they care what you <em>did</em>.</p>
            <p><strong>Instead of:</strong> &quot;Responsible for managing social media accounts.&quot;</p>
            <p><strong>Say:</strong> &quot;Increased Instagram engagement by <strong>60%</strong> in 4 months...&quot;</p>
            <p><strong>Metrics</strong> jump off the page — use them!</p>
          </>
        }
      />

      {/* Graphic Image */}
      <div className="my-8">
        <Image
          src="https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Before and After Resume Bullet Example"
          width={1200}
          height={600}
          className="rounded-lg shadow-md w-full object-cover"
        />
      </div>

      <Section
        title="4. Make It Skimmable"
        content={
          <>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <strong>bullet points</strong></li>
              <li>Keep them short (1–2 lines)</li>
              <li>Group similar tasks together</li>
            </ul>
            <p>Stick to a clean font like Helvetica or Arial. Avoid dense text blocks.</p>
          </>
        }
      />

      <Section
        title="5. Cut the Clutter"
        content={
          <>
            <p>Remove anything that doesn&apos;t add value:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Old jobs (10+ years ago)</li>
              <li>Unrelated hobbies</li>
              <li>&quot;References available upon request&quot;</li>
              <li>High school (if you have college or work experience)</li>
            </ul>
          </>
        }
      />

      <Section
        title="6. Format Like a Pro"
        content={
          <>
            <p>Design counts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <strong>consistent spacing</strong> and headings</li>
              <li>Align everything</li>
              <li>Send as a <strong>PDF</strong></li>
            </ul>
            <p>
              Canva or Word templates can help. Just don&apos;t over-design unless you&apos;re in a creative role. If you want a fast, professional layout without the hassle, <a href="https://eonresume.co.za" className="text-blue-600 underline font-medium" target="_blank">EonResume</a> gives you sleek templates optimized for recruiters and ATS.
            </p>
          </>
        }
      />

      {/* Optional Mockup Graphic */}
      <div className="my-8">
        <Image
          src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Resume layout with highlighted sections"
          width={1200}
          height={600}
          className="rounded-lg shadow-md w-full object-cover"
        />
      </div>

      <Section
        title="7. Proofread. Then Proofread Again."
        content={
          <p>
            Typos kill credibility. Have someone else read it, or use a tool like <strong>Grammarly</strong>. Read it aloud. Fix what sounds off.
          </p>
        }
      />

      <Section
        title="Final Thought"
        content={
          <p>
            A standout resume is <strong>clear</strong>, <strong>concise</strong>, and <strong>tailored</strong>. Don&apos;t include everything you&apos;ve done — include everything that <strong>counts</strong>.
            <span className="block mt-2">
              And once your resume&apos;s ready, consider creating a free profile on <a href="https://employmentecho.co.za" className="text-blue-600 underline font-medium" target="_blank">Employment Echo</a> — a job seeker platform built to help you get matched with the roles that fit your skills and goals.
            </span>
          </p>
        }
      />
    </article>
  );
}

// Reusable Section Component
function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 underline">{title}</h2>
      <div className="text-lg space-y-3 leading-relaxed">{content}</div>
    </section>
  );
}