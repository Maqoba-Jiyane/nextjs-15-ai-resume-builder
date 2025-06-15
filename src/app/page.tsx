import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import TestimonialsSection from "@/components/Testimonials";

const templates = [
  {
    name: "Classic",
    image: "/assets/templates/Classic.jpg",
  },
  {
    name: "Modern",
    image: "/assets/templates/ClassicResumeRich.png",
  },
  {
    name: "ATS Friendly",
    image:
      "/assets/templates/ScienceEngineeringResume.png",
  },
];

export default function LandingPage() {
  return (
    <main className="bg-gray-50 text-gray-900 w-full">
      {/* Hero Section */}
      <section className="bg-white py-20 px-6 sm:px-12 text-center flex flex-col items-center">
        <Image
          src="/assets/logo.png"
          alt="Eon Resume Logo"
          width={200}
          height={100}
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-8 max-w-2xl">
          Get Interview-Winning Resumes—AI-Crafted & ATS‑Optimized in Minutes
        </h1>
        <p className="text-lg mt-4 max-w-xl text-gray-600">
          One-time payment. Professional templates. South African pricing.
          Customize colors & upload your photo.
        </p>
        <Button asChild className="mt-6 text-lg px-10 py-4" variant="premium">
          <Link href="/resumes">Create My Resume Now</Link>
        </Button>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Eon Resume?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {benefits.map((item, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="bg-gray-100 py-16 px-6 sm:px-12 text-center">
        <h2 className="text-3xl font-bold mb-10">Choose a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {templates.map((template, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow hover:shadow-lg"
            >
              <div className="w-full flex">
                <Image
                  src={template.image}
                  alt={template.name}
                  height={48}
                  width={240} className="w-full"
                />
              </div>
              <p className="capitalize font-semibold">{template.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <section className="py-20 px-6 sm:px-12 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-gray-600 mb-12">Pay once. No subscriptions.</p>
          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-gray-50 p-8 rounded shadow-lg">
              <h3 className="text-xl font-bold text-blue-600">Single Resume</h3>
              <p className="text-4xl font-extrabold mt-2 mb-4">R60</p>
              <p className="text-sm text-gray-500 mb-6">
                Instant download after customization.
              </p>
              <Button asChild variant="premium">
                <Link href="/resumes">Build Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-6 sm:px-12 bg-gray-900 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="mb-6">
          Craft your professional, ATS-ready resume in minutes.
        </p>
        <Button asChild className="text-lg px-10 py-4" variant="premium">
          <Link href="/resumes">Create My Resume Now</Link>
        </Button>
      </section>
    </main>
  );
}

const benefits = [
  {
    title: "🎯 SMART Skills & Summaries",
    description:
      "We don’t guess your skills—our AI uses SMART logic based on your real experience.",
  },
  {
    title: "⚡ Instant, On-Demand Resumes",
    description:
      "Pay only for what you need. Get one resume for R60 with no subscriptions.",
  },
  {
    title: "🧠 Tailored to Job Descriptions",
    description:
      "Paste any job post and we’ll match your resume with relevant keywords.",
  },
  {
    title: "📄 ATS-Friendly Designs",
    description:
      "Professional templates built to pass Applicant Tracking Systems.",
  },
  {
    title: "🚀 Start Without an Account",
    description: "Begin building immediately. Only pay when ready to download.",
  },
  {
    title: "🌍 Built for South Africans",
    description:
      "Affordable pricing with resume styles suited for the SA job market.",
  },
];

// const testimonials = [
//   {
//     name: "Olivia Jacobs",
//     title: "Software Engineer",
//     testimonial:
//       "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
//     image:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Thato Mokoena",
//     title: "Software Developer",
//     testimonial:
//       "The resume builder on Eon Resume helped me to perfectly highlight my skills and experience, which led to multiple interview invitations.",
//     image:
//       "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Mahlatsi Masemula",
//     title: "Marketing Intern",
//     testimonial:
//       "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
//     image:
//       "https://images.unsplash.com/photo-1531727991582-cfd25ce79613?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Zanele Ndlovu",
//     title: "HR Specialist",
//     testimonial:
//       "I used Eon Resume to build my resume and was blown away by how easy and effective it was. It streamlined my job application process.",
//     image:
//       "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
//   },
//   {
//     name: "Aarav Patel",
//     title: "Marketing Manager",
//     testimonial:
//       "The AI-powered resume builder is a game-changer. It saved me so much time and helped me craft the perfect resume.",
//     image:
//       "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Mpho Khumalo",
//     title: "UX Designer",
//     testimonial:
//       "Eon Resume made it so much easier for me to structure my portfolio and resume. I received great feedback from employers, thanks to its professional layout.",
//     image:
//       "https://images.unsplash.com/photo-1532136672867-8eff8c949b63?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Robert Brown",
//     title: "Graphic Designer",
//     testimonial:
//       "Eon Resume helped me present my skills and experience in a more professional way, leading to several job offers.",
//     image:
//       "https://images.unsplash.com/flagged/photo-1552054814-8c580ce130d1?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];
