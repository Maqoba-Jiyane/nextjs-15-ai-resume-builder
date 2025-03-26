import Image from "next/image";

export async function generateMetadata() {
  const title = "Top 5 Skills Employers Look For";
  const description =
    "Discover the essential skills that catch hiring managers' attention and how to showcase them on your resume.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: "https://eonresume.co.za/blogs/photo-1576267423429-569309b31e84.png",
          width: 1200,
          height: 600,
          alt: "Resume layout flat lay",
        },
      ],
      type: "article",
    },
  };
}

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Top 5 Skills Employers Look For
        </h1>
        <Image
          src="https://images.unsplash.com/photo-1576267423429-569309b31e84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team at a desk reviewing resumes"
          width={1200}
          height={600}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </header>

      {/* Intro */}
      <section className="mb-10 text-lg leading-relaxed">
        <p>
          You can have the right degree, experience, and resume format—but if
          you&apos;re missing <em>these</em> core skills, you’ll likely miss out
          on the interview. Employers across industries are looking for more
          than technical know-how. They want people who can solve problems,
          adapt, and thrive.
        </p>
        <p className="mt-4">
          Here are the <strong>top 5 skills</strong> that consistently catch
          hiring managers’ attention—and how to show them on your resume.
        </p>
      </section>

      <SkillSection
        title="1. Communication"
        content={
          <>
            <p>
              Whether you&apos;re writing emails, presenting ideas, or
              collaborating across teams, clear communication is everything.
            </p>
            <p>
              ✅ <strong>How to show it:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                “Led weekly team meetings and presented quarterly performance
                reviews”
              </li>
              <li>“Created training materials for onboarding 30+ new hires”</li>
            </ul>
            <p className="mt-2 italic">
              Tip: Use <strong>action verbs</strong> like <em>presented</em>,{" "}
              <em>explained</em>, <em>documented</em>, or <em>negotiated</em>.
            </p>
          </>
        }
      />

      <SkillSection
        title="2. Problem-Solving"
        content={
          <>
            <p>
              Companies need people who can think on their feet. Problem-solving
              shows up in data analysis, customer service, strategy—you name it.
            </p>
            <p>
              ✅ <strong>How to show it:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                “Reduced customer support tickets by 40% through process
                automation”
              </li>
              <li>
                “Identified $50K in annual savings through supply chain
                optimization”
              </li>
            </ul>
            <p className="mt-2">
              🔥 Bonus: Tools like{" "}
              <a
                href="https://eonresume.co.za"
                className="text-blue-600 underline font-medium"
                target="_blank"
              >
                EonResume
              </a>{" "}
              help you phrase achievements like these with impact.
            </p>
          </>
        }
      />

      <SkillSection
        title="3. Adaptability"
        content={
          <>
            <p>
              Markets shift, tech evolves, roles change. Can you pivot, learn,
              and thrive in new situations?
            </p>
            <p>
              ✅ <strong>How to show it:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                “Quickly transitioned to remote work and maintained 98% client
                retention”
              </li>
              <li>
                “Cross-trained in three departments to support staffing gaps”
              </li>
            </ul>
            <p>
              Employers want people who don’t just survive change—but embrace
              it.
            </p>
          </>
        }
      />

      <SkillSection
        title="4. Collaboration"
        content={
          <>
            <p>
              Even in solo-heavy roles, you’re rarely working alone. Being easy
              to work with—and good at working with others—matters.
            </p>
            <p>
              ✅ <strong>How to show it:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                “Collaborated with product, design, and engineering to launch
                new feature in 6 weeks”
              </li>
              <li>“Worked with cross-functional teams across 4 time zones”</li>
            </ul>
            <p className="mt-2 italic">
              Pro tip: Mention tools like Slack, Notion, Asana, or GitHub to
              reinforce this skill without saying “team player.”
            </p>
          </>
        }
      />

      <SkillSection
        title="5. Initiative"
        content={
          <>
            <p>
              This is a big one. Did you go beyond your role? Did you build
              something, fix something, or suggest something no one asked for?
            </p>
            <p>
              ✅ <strong>How to show it:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                “Launched internal knowledge base, reducing onboarding time by
                25%”
              </li>
              <li>“Taught monthly Excel workshops to upskill junior staff”</li>
            </ul>
            <p>
              <span className="italic">
                Initiative shows leadership potential—even if you&apos;re not in
                a leadership role yet.
              </span>
            </p>
          </>
        }
      />

      <section className="my-10 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">
          How to Showcase These Skills on Your Resume
        </h2>
        <p>
          Don’t just list them. <em>Prove</em> them.
        </p>
        <ul className="list-disc pl-5 my-4 space-y-1">
          <li>Show real-world results</li>
          <li>Use metrics wherever possible</li>
          <li>Match the language of the job description</li>
        </ul>
        <p>
          An AI-powered resume tool like{" "}
          <a
            href="https://eonresume.co.za"
            className="text-blue-600 underline font-medium"
            target="_blank"
          >
            EonResume
          </a>{" "}
          helps you highlight your strongest skills based on the roles
          you&apos;re applying to. It can even reword your experience to better
          align with what employers are looking for—without making it sound
          robotic.
        </p>
        <p className="mt-4">
          And when you’re ready to apply,{" "}
          <a
            href="https://employmentecho.co.za"
            className="text-blue-600 underline font-medium"
            target="_blank"
          >
            Employment Echo
          </a>{" "}
          can connect you with job opportunities that actually value the skills
          you bring to the table.
        </p>
      </section>

      <section className="text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 underline">Final Thought</h2>
        <p>
          Employers don’t just hire for what you know—they hire for how you
          think, work, and solve problems. Focus on the top skills that matter
          across every role and back them up with real examples.
        </p>
        <p className="mt-2">
          If you can prove <strong>communication</strong>,{" "}
          <strong>problem-solving</strong>, <strong>adaptability</strong>,{" "}
          <strong>collaboration</strong>, and <strong>initiative</strong>—you
          won’t just stand out, you’ll get interviews.
        </p>
      </section>
    </article>
  );
}

// Reusable Skill Section Component
function SkillSection({
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
