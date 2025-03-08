"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HelpCenter = () => {
  // State to manage which section is open
  const [openSection, setOpenSection] = useState<number | null>(null);

  // Function to handle toggling the visibility of the sections
  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index); // Toggle the section visibility
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Help Center</h1>
        <p className="text-lg">
          Find out how EonResume can help you create an ATS-friendly resume and
          boost your job application success.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-8">
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
          <div key={index}>
            <div
              onClick={() => toggleSection(index)}
              className="cursor-pointer text-2xl font-semibold mb-2"
            >
              {section.title}
            </div>
            {openSection === index && (
              <div className="text-lg">
                <p>{section.content}</p>
              </div>
            )}
          </div>
        ))}

        {/* Contact Button */}
        <div className="text-center">
          <Button asChild size="lg" variant="premium">
            <Link href={"/contact-us"}>Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
