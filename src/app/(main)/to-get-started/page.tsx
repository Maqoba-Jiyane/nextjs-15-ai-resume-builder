import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center gap-6 px-5 py-12 md:text-start md:flex-row lg:gap-12">
      <div className="rounded-lg shadow-lg w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Best Resume Tips</h2>
        <p className="mb-2">
          Welcome to <strong>Eon Resume</strong>, your <strong>AI Resume Builder</strong>! Before you start, here
          are some expert resume tips:
        </p>
        <ul className="list-disc mb-4">
          <li>
            <strong>Keep It Concise</strong> Focus on key achievements.
          </li>
          <li>
            <strong>Tailor Your Resume</strong> Match job descriptions for better
            chances.
          </li>
          <li>
            <strong>Save as PDF</strong> Ensures correct formatting everywhere.
          </li>
        </ul>

        <p className="text-yellow-600 font-semibold mb-4">
          Eon Resume is still improving! Some features (especially
          downloading) may require adjustments.
        </p>
        <p className="mb-4">
          For best results, use <strong>Google Chrome on desktop</strong>.
        </p>
        <Button asChild size='lg' variant='premium'><Link href={'/resumes'}>Continue</Link></Button>
      </div>
    </main>
  );
};

export default Page;
