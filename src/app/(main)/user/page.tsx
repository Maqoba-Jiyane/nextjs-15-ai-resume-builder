// app/(with-sidebar)/page.tsx
'use client';

import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="p-8 space-y-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
      </h1>

      {/* Intro */}
      <p className="">
        You can navigate the app using the sidebar on the left:
      </p>

      {/* Sidebar navigation description */}
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Home</strong>: Return to this overview page.
        </li>
        <li>
          <strong>Personal Details</strong>: Add or update your name, contact info, and profile—completing this first helps us auto-fill other sections faster.
        </li>
        <li>
          <strong>Work Experience</strong>: Manually add past jobs or use our AI “Smart Fill” to generate entries in seconds.
        </li>
        <li>
          <strong>Skills & Summary</strong>: List your top skills, or let AI craft a professional summary for you.
        </li>
        <li>
          <strong>ATS Suggestions</strong>: Run an analysis of your draft to see how it scores with applicant-tracking systems.
        </li>
        <li>
          <strong>Settings</strong>: Adjust your account, theme, or billing details.
        </li>
      </ul>

      {/* Call to action */}
      <p className="mt-4 ">
        To get started, click <strong>Personal Details</strong> in the sidebar and complete your profile information. Once that’s done, your resume sections will auto-populate more quickly!
      </p>
    </div>
  );
}
