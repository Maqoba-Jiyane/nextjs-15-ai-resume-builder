"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import resumePreview from "@/assets/resume-preview.jpg";
import { Star } from "lucide-react";
import HelpCenter from "./(main)/help-center/page";

const testimonials = [
  {
    name: "Olivia Jacobs",
    title: "Software Engineer",
    testimonial:
      "EonResume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Thato Mokoena",
    title: "Software Developer",
    testimonial:
      "The resume builder on EonResume helped me to perfectly highlight my skills and experience, which led to multiple interview invitations.",
    image:
      "https://images.unsplash.com/photo-1532136672867-8eff8c949b63?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mahlatsi Masemula",
    title: "Marketing Intern",
    testimonial:
      "EonResume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1531727991582-cfd25ce79613?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zanele Ndlovu",
    title: "HR Specialist",
    testimonial:
      "I used EonResume to build my resume and was blown away by how easy and effective it was. It streamlined my job application process.",
    image:
      "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Aarav Patel",
    title: "Marketing Manager",
    testimonial:
      "The AI-powered resume builder is a game-changer. It saved me so much time and helped me craft the perfect resume.",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mpho Khumalo",
    title: "UX Designer",
    testimonial:
      "EonResume made it so much easier for me to structure my portfolio and resume. I received great feedback from employers, thanks to its professional layout.",
    image:
      "https://images.unsplash.com/photo-1532136672867-8eff8c949b63?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Robert Brown",
    title: "Graphic Designer",
    testimonial:
      "EonResume helped me present my skills and experience in a more professional way, leading to several job offers.",
    image:
      "https://images.unsplash.com/flagged/photo-1552054814-8c580ce130d1?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-gray-900 text-center md:text-start lg:gap-12">
      {/* Main Content */}
      <div className="flex items-center max-md:flex-col gap-12">
        <div className="max-w-prose space-y-3">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="mx-auto md:ms-0 filter hue-rotate-90"
          />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
            Create a{" "}
            <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Perfect resume
            </span>{" "}
            in Minutes
          </h1>
          <p className="text-lg text-gray-500">
            Our <span className="font-bold">AI resume builder</span> helps you
            design the best resume for your next role.
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/to-get-started">Get started</Link>
          </Button>
        </div>

        {/* Resume Preview Image */}
        <div>
          <Image
            src={resumePreview}
            alt="Resume preview"
            width={600}
            className="shadow-md lg:rotate-[1.5deg]"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12 max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.title}</p>
              <p className="flex justify-center text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </p>
              <p className="text-lg text-gray-700 italic">
                {testimonial.testimonial}
              </p>
            </div>
          ))}
        </div>

        {/*Pricing*/}
        {/*Pricing*/}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Get Your Professional Resume Today!
          </h2>
          <div className="shadow-lg rounded-lg bg-white p-8 ">
            <p className="text-lg text-gray-500 mb-6">
              Pay only R24 for a professionally designed resume that is
              ATS-friendly and ready for job applications.
            </p>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                One-Time Payment for a Complete Resume
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">R27.60</p>
              <p className="text-gray-600 mb-6">
                Pay once for a fully optimized resume with ATS compatibility,
                including these amazing AI-powered features:
              </p>
              <ul className="text-left text-gray-600 mb-6">
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> ATS-Friendly
                  Resume for better job application results
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Smart
                  Experience Auto-Fill to save you time
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Auto-Generated
                  Summary to highlight your strengths
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Optimized for
                  Standardized Formatting (fonts, headings)
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Clear Listing to enhance readability for ATS
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Compatible
                  File Format
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Proper
                  Sections for Skills, Work Experience, and Education
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> No Special
                  Characters or Unnecessary Graphics
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✔️</span> Clear and
                  Consistent Job History with Dates
                </li>
              </ul>
              <Button asChild size="lg" variant="premium">
                <Link href="/resumes">Purchase Resume</Link>
              </Button>
            </div>
          </div>
        </div>

        <HelpCenter />
      </div>
    </main>
  );
}
