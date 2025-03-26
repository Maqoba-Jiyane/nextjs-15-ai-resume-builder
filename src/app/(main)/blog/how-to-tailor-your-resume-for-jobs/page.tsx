import Image from "next/image";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Tailor Your Resume for Jobs',
  description:
    'Learn how to customize your resume for each job application without starting from scratch. Real examples, smart tips, and tools to save time.',
  openGraph: {
    title: 'How to Tailor Your Resume for Jobs',
    description:
      'Learn how to customize your resume for each job application without starting from scratch. Real examples, smart tips, and tools to save time.',
    url: 'https://www.yoursite.com/blog/how-to-tailor-your-resume-for-jobs',
    siteName: 'EonResume Blog',
    images: [
      {
        url: 'https://cdn.pixabay.com/photo/2021/09/15/15/49/resume-6627200_1280.jpg',
        width: 1200,
        height: 600,
        alt: 'Tailored resume with highlighter on desk',
      },
    ],
    locale: 'en_ZA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Tailor Your Resume for Jobs',
    description:
      'Generic resumes don’t work. Here’s how to tailor yours to stand out — without rewriting the whole thing.',
    images: ['https://cdn.pixabay.com/photo/2021/09/15/15/49/resume-6627200_1280.jpg'],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">How to Tailor Your Resume for Jobs</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2021/09/15/15/49/resume-6627200_1280.jpg"
          alt="Tailored resume with highlighter on desk"
          width={1200}
          height={600}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          Most job seekers send the same resume to every role — and then wonder why they’re not hearing back. The truth is, recruiters can spot a generic resume in seconds. If it doesn’t speak to <em>their</em> specific needs, it’s ignored.
        </p>
        <p className="mt-4">
          The fix? <strong>Tailor your resume for each job</strong>. Here’s how to do it without rewriting everything from scratch.
        </p>
      </section>

      <Section
        title="1. Start With the Job Description"
        content={
          <>
            <p>
              Every job post is a cheat sheet. It tells you exactly what the employer wants — your job is to reflect it back (authentically).
            </p>
            <p>
              <strong>Look for:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keywords (skills, tools, job titles)</li>
              <li>Required vs. preferred qualifications</li>
              <li>Repeated phrases or themes</li>
              <li>Soft skills like communication or leadership</li>
            </ul>
          </>
        }
      />

      <Section
        title="2. Mirror the Language They Use"
        content={
          <>
            <p>
              If the job post says “collaborates with cross-functional teams,” don’t say “worked with other departments.” Use their words — it’s likely going through an ATS (Applicant Tracking System).
            </p>
            <p>
              ✅ <strong>Do this:</strong>
            </p>
            <p className="italic">
              &quot;Collaborated with cross-functional teams to launch new product features in 6-week sprints.&quot;
            </p>
            <p>This isn’t gaming the system — it’s speaking their language.</p>
          </>
        }
      />

      <Section
        title="3. Reorder Your Bullet Points Based on Relevance"
        content={
          <>
            <p>
              You don’t have to rewrite your entire resume — but <strong>reordering</strong> your experience can make a big difference.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Put the most relevant accomplishments first under each job</li>
              <li>Cut unrelated details (even if they sound impressive)</li>
              <li>Use metrics and results that align with what the job wants</li>
            </ul>
            <p className="italic">
              Applying for a marketing role? Push marketing wins to the top.
            </p>
          </>
        }
      />

      <Section
        title="4. Customize Your Summary"
        content={
          <>
            <p>
              That 3–4 line summary at the top of your resume? Make it specific to the role.
            </p>
            <p><strong>Instead of:</strong></p>
            <p className="italic">
              &quot;Experienced professional seeking growth in a dynamic company…&quot;
            </p>
            <p><strong>Try:</strong></p>
            <p className="italic">
              &quot;Content strategist with 5+ years in B2B marketing. Specializes in SEO, email automation, and performance tracking. Looking to drive engagement and conversions at a growth-focused SaaS brand.&quot;
            </p>
          </>
        }
      />

      <Section
        title="5. Use the Right File Format and Layout"
        content={
          <>
            <ul className="list-disc pl-5 space-y-1">
              <li>Save your resume as a <strong>PDF</strong> (unless the job post says otherwise)</li>
              <li>Keep formatting clean and ATS-friendly</li>
              <li>Use consistent fonts and spacing</li>
            </ul>
            <p>
              Platforms like{" "}
              <a href="https://www.eonresume.co.za" className="text-blue-600 underline font-medium">
                EonResume
              </a>{" "}
              help you quickly tailor and reformat your resume for each job — without starting over every time.
            </p>
          </>
        }
      />

      <Section
        title="6. Save Different Versions"
        content={
          <>
            <p>
              You don’t need 100 unique resumes — just 3–5 core versions based on the job types you’re applying to.
            </p>
            <p><strong>Tip:</strong> Name your files clearly:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>FirstName_LastName_Marketing.pdf</li>
              <li>FirstName_LastName_ProjectManager.pdf</li>
            </ul>
            <p className="italic">Never send a file titled <code>Resume_Final_v3.pdf</code>.</p>
          </>
        }
      />

      <Section
        title="7. Don’t Forget the Platform Match"
        content={
          <>
            <p>
              After tailoring your resume, make sure you&apos;re applying where it counts.
            </p>
            <p>
              <a href="https://www.employmentecho.co.za" className="text-blue-600 underline font-medium">
                Employment Echo
              </a>{" "}
              is a job board that matches you to roles based on your profile — not just generic filters.
            </p>
          </>
        }
      />

      {/* Final Thought */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          A tailored resume shows employers you took the time — and that you actually want <em>their</em> job, not just <em>any</em> job.
        </p>
        <p className="mt-2">
          The extra 10–15 minutes it takes to customize your resume? That’s what gets you through the door.
        </p>
      </section>
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
