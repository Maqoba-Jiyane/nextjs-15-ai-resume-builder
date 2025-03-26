import Image from "next/image";
import type { Metadata } from "next";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "Using Action Verbs in Your Resume",
  description:
    "Enhance your resume by incorporating strong action verbs that effectively showcase your skills and achievements to potential employers.",
  openGraph: {
    title: "Using Action Verbs in Your Resume",
    description:
      "Enhance your resume by incorporating strong action verbs that effectively showcase your skills and achievements to potential employers.",
    url: "https://www.eonresume.co.za/blog/using-action-verbs-in-your-resume",
    siteName: "EonResume",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2018/10/05/17/34/cv-3726428_1280.jpg",
        width: 1200,
        height: 800,
        alt: "Close-up of a person writing with a pen on a notebook",
      },
    ],
    locale: "en_ZA",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Using Action Verbs in Your Resume",
    description:
      "Learn how to effectively use action verbs to make your resume stand out to employers.",
    images: [
      "https://cdn.pixabay.com/photo/2018/10/05/17/34/cv-3726428_1280.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Using Action Verbs in Your Resume
        </h1>
        <Image
          src="https://cdn.pixabay.com/photo/2018/10/05/17/34/cv-3726428_1280.jpg"
          alt="Close-up of a person writing with a pen on a notebook"
          width={1200}
          height={800}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Introduction */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          Your resume is more than a list of job duties; it&apos;s a marketing tool
          that showcases your accomplishments and skills. One effective way to
          make your resume stand out is by using strong action verbs. These
          words not only convey your responsibilities but also highlight your
          impact and achievements.
        </p>
        <p className="mt-4">
          In this article, we&apos;ll explore the importance of action verbs and how
          to incorporate them into your resume to make a compelling impression
          on potential employers.
        </p>
      </section>

      {/* What Are Action Verbs? */}
      <Section
        title="What Are Action Verbs?"
        content={
          <>
            <p>
              Action verbs are words that express specific actions or behaviors.
              In the context of resumes, they describe the tasks you&apos;ve
              performed and the impact you&apos;ve made in your previous roles.
              Examples include &quot;developed,&quot; &quot;managed,&quot; &quot;initiated,&quot; and
              &quot;improved.&quot;
            </p>
            <p>
              Using action verbs helps to create a dynamic narrative about your
              professional experience, making your resume more engaging and
              impactful.
            </p>
          </>
        }
      />

      {/* Why Use Action Verbs in Your Resume? */}
      <Section
        title="Why Use Action Verbs in Your Resume?"
        content={
          <>
            <p>
              Incorporating action verbs into your resume offers several
              benefits:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Clarity:</strong> They provide clear descriptions of
                your responsibilities and achievements.
              </li>
              <li>
                <strong>Impact:</strong> They emphasize the results of your
                actions, showcasing your contributions.
              </li>
              <li>
                <strong>Engagement:</strong> They make your resume more
                interesting and dynamic, capturing the reader&apos;s attention.
              </li>
              <li>
                <strong>ATS Optimization:</strong> Many companies use Applicant
                Tracking Systems (ATS) to screen resumes. Including relevant
                action verbs can help your resume pass through these systems.
              </li>
            </ul>
          </>
        }
      />

      {/* How to Use Action Verbs Effectively */}
      <Section
        title="How to Use Action Verbs Effectively"
        content={
          <>
            <p>
              To maximize the effectiveness of action verbs in your resume,
              consider the following tips:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Be Specific:</strong> Choose verbs that accurately
                reflect your role and contributions. For example, instead of
                &quot;worked on,&quot; use &quot;designed,&quot; &quot;implemented,&quot; or &quot;coordinated.&quot;
              </li>
              <li>
                <strong>Highlight Achievements:</strong> Pair action verbs with
                quantifiable results to demonstrate your impact. For instance,
                &quot;increased sales by 20%&quot; or &quot;reduced costs by 15%.&quot;
              </li>
              <li>
                <strong>Vary Your Language:</strong> Avoid repeating the same
                verbs. Use a thesaurus or action verb list to find alternatives
                that keep your resume engaging.
              </li>
              <li>
                <strong>Match the Job Description:</strong> Tailor your resume
                by incorporating action verbs found in the job posting. This
                alignment can make your application more relevant to the
                employer.
              </li>
            </ul>
          </>
        }
      />

      {/* Examples of Action Verbs by Category */}
      <Section
        title="Examples of Action Verbs by Category"
        content={
          <>
            <p>
              Here are some action verbs categorized by common skill areas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Leadership */}
              <div>
                <h3 className="text-xl font-semibold">Leadership</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Directed</li>
                  <li>Managed</li>
                  <li>Supervised</li>
                  <li>Mentored</li>
                  <li>Led</li>
                </ul>
              </div>
              {/* Communication */}
              <div>
                <h3 className="text-xl font-semibold">Communication</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Presented</li>
                  <li>Explained</li>
                  <li>Negotiated</li>
                  <li>Advocated</li>
                  <li>Collaborated</li>
                </ul>
              </div>
              {/* Problem-Solving */}
              <div>
                <h3 className="text-xl font-semibold">Problem-Solving</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Analyzed</li>
                  <li>Resolved</li>
                  <li>Improved</li>
                  <li>Streamlined</li>
                  <li>Diagnosed</li>
                </ul>
              </div>
              {/* Technical Skills */}
              <div>
                <h3 className="text-xl font-semibold">Technical</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Developed</li>
                  <li>Engineered</li>
                  <li>Built</li>
                  <li>Programmed</li>
                  <li>Configured</li>
                </ul>
              </div>
            </div>
          </>
        }
      />

      {/* Final Thought */}
      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          Using the right action verbs can instantly upgrade the way your resume reads. Instead of sounding like a task list, your resume becomes a story of achievements and value.
        </p>
        <p className="mt-2">
          If you&apos;re struggling to phrase your experience in a way that pops, try using a resume builder like{" "}
          <a href="https://www.eonresume.co.za" className="text-blue-600 underline font-medium" target="_blank">EonResume</a>. It helps you auto-generate bullet points with powerful verbs based on your role.
        </p>
        <p className="mt-2">
          And once it’s ready, head over to{" "}
          <a href="https://www.employmentecho.co.za" className="text-blue-600 underline font-medium" target="_blank">Employment Echo</a> — a South African job seeker platform built to help you find roles that match what you’ve got.
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
