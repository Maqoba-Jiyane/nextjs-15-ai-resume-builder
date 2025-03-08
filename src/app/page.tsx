"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import resumePreview from "@/assets/resume-preview.jpg";
import { useState } from "react";
import { ArrowDown, ArrowUp, Star } from "lucide-react";

const testimonials = [
  {
    name: "Olivia Smith",
    title: "Software Engineer",
    testimonial:
      "EonResume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    name: "Robert Brown",
    title: "Graphic Designer",
    testimonial:
      "EonResume helped me present my skills and experience in a more professional way, leading to several job offers.",
    image:
      "https://images.unsplash.com/flagged/photo-1552054814-8c580ce130d1?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-gray-900 text-center md:text-start md:flex-row lg:gap-12">
      {/* Main Content */}
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
                One-Time Payment
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">R24</p>
              <p className="text-gray-600 mb-6">
                Get a professional resume that will help you stand out in the
                job market.
              </p>
              <Button asChild size="lg" variant="premium">
                <Link href="/resumes">Purchase Resume</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8 mt-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-4">
              Frequently Asked Questions
            </h1>
          </div>
          {[
            {
              title: "What is EonResume?",
              content:
                "EonResume is an online platform designed to help individuals create professional, well-formatted resumes. Our platform integrates with the latest Applicant Tracking Systems (ATS) to ensure that your resume is optimized for job applications.",
            },
            {
              title: "What is an ATS-Friendly Resume?",
              content:
                "An ATS-friendly resume is designed to be easily read and processed by Applicant Tracking Systems (ATS). These systems are used by many companies to filter resumes, so ensuring your resume is ATS-friendly increases the chances it will be seen by a hiring manager.",
            },
            {
              title: "How Does EonResume Ensure ATS-Friendly Design?",
              content:
                "EonResume ensures that your resume is ATS-friendly by using simple formatting, optimizing keywords for job descriptions, and structuring your content in a way that ATS can easily process.",
            },
            {
              title: "Why Should I Choose an ATS-Friendly Resume?",
              content:
                "ATS-friendly resumes increase visibility in ATS systems and are more likely to reach the right people in the hiring process. These resumes also maintain a clear structure that is easy for hiring managers to read.",
            },
            {
              title:
                "How to Make Sure My Resume is ATS-Friendly Using EonResume?",
              content:
                "Select an ATS-friendly template, input relevant keywords from job descriptions, and structure your resume clearly with headings and bullet points. EonResume helps ensure your resume passes through ATS systems.",
            },
            {
              title: "What Features Does EonResume Offer?",
              content:
                "EonResume offers ATS-optimized templates, a keyword analyzer, real-time feedback on ATS compatibility, and customizable sections to tailor your resume to specific jobs.",
            },
            {
              title: "How Can I Download My Resume?",
              content:
                "Once your resume is complete, you can download it in PDF format, which is the preferred file type for most job applications. We also offer Word document format for future edits.",
            },
            {
              title: "Can I Edit My Resume After Downloading?",
              content:
                "Yes! You can always return to EonResume, update your resume, and download the latest version whenever needed.",
            },
            {
              title: "Contact Support",
              content:
                "If you have any additional questions or need further assistance, please don't hesitate to contact our support team. We're here to help!",
            },
          ].map((section, index) => (
            <div key={index} className="mb-4">
              <div
                onClick={() => toggleSection(index)}
                className="cursor-pointer text-2xl font-semibold mb-2 p-3 flex justify-between items-center"
              >
                <span>{section.title}</span>
                <span>
                  {openSection === index ? (
                    <span className="transform rotate-180">
                      <ArrowUp />
                    </span>
                  ) : (
                    <span>
                      <ArrowDown />
                    </span>
                  )}
                </span>
              </div>
              {openSection === index && (
                <div className="text-lg pl-4">
                  <p>{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Button */}
        {/* <div className="text-center mt-8">
          <Button asChild size="lg" variant="premium">
            <Link href="/contact-us">Contact Support</Link>
          </Button>
        </div> */}
      </div>
    </main>
  );
}
