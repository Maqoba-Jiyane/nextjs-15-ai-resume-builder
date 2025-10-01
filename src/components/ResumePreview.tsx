"use client";

import { ResumeValues } from "@/lib/validation";
import ClassicResume from "./ClassicResume";
import { JSX } from "react";
import ClassicResumeRich from "./ClassicResumeRich";
import ScienceEngineeringResume from "./ScienceEngineeringResume";
import BlackModernProfessional from "./BlackModernProfessional";
import BlueCreativeResume from "./BlueCreativeResume";
import ModernSidebarResume from "./ModernSidebarResume";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  template?: "classic" | "classic-resume-rich" | "science-engineering-resume";
}

const ResumePreview = ({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) => {

  const templates: Record<string, JSX.Element> = {
    classic: (
      <ClassicResume
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
    "black-modern-professional": (
      <BlackModernProfessional
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    "blue-creative-resume": (
      <BlueCreativeResume
        resumeData={resumeData}
        className={className}
        contentRef={contentRef}
      />
    ),
    "mordern-sidebar-resume": (
      <ModernSidebarResume
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
