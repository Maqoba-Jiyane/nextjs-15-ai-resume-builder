"use client";

import { ResumeValues } from "@/lib/validation";
import ClassicResume from "./ClassicResume";
import ATS1 from "./ATS1";
import { JSX } from "react";
// import ATS1 from "./ATS1";
import ModernResume from "./ModernResume"; // Future template support
import ClassicResumeRich from "./ClassicResumeRich";
import ScienceEngineeringResume from "./ScienceEngineeringResume";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  template?: "classic" | "ats-1" | "modern" | "classic-resume-rich" | "science-engineering-resume";
}

const ResumePreview = ({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) => {

  console.log(resumeData.template)
  const templates: Record<string, JSX.Element> = {
    classic: (
      <ClassicResume
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    "ats-1": (
      <ATS1
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    modern: (
      <ModernResume
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    "classic-resume-rich": (
      <ClassicResumeRich
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    "science-engineering-resume": (
      <ScienceEngineeringResume
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
  };

  return (
    <div className="w-full">{templates[resumeData.template || "classic"]}</div>
  );
};

export default ResumePreview;
