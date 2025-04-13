"use client";

import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import AnalyzeResumeButton from "./forms/AnalyzeResumeButton";
import { useState } from "react";
import ATSAnalysis from "@/components/ATSAnalysis";
import { ATSAnalysisProps } from "@/components/Interfaces";

interface ATSSuggestionsSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

const ATSSuggestionsSection = ({
  resumeData,
  className,
}: ATSSuggestionsSectionProps) => {
  const [atsSuggestions, setAtsSuggestions] = useState<ATSAnalysisProps>({
    overall_score: 75,
    keywords_match: {
      score: 80,
      analysis:
        "The resume contains relevant keywords such as 'Integration Developer,' 'collaboration,' 'testing,' and 'technical support,' aligning well with the job description.",
      improvements: [
        "Incorporate specific web development technologies or frameworks that were used in previous roles.",
        "Include skills directly related to web development, such as HTML, CSS, JavaScript, or specific languages or libraries.",
      ],
    },
    experience_match: {
      score: 70,
      analysis:
        "The experience as an Integration Developer shows relevant skills that may relate to web development, but the focus is heavily on integration and support rather than core web development tasks.",
      improvements: [
        "Highlight any direct web development work or projects completed during this role or prior roles.",
        "Emphasize any front-end or back-end development responsibilities, if applicable.",
      ],
    },
    education_match: {
      score: 50,
      analysis:
        "The education listed as 'Web Developer' from CodeSpace reflects a relevant field of study; however, the dates indicate a future graduation, which might not meet immediate requirements.",
      improvements: [
        "Include information about any relevant coursework, certifications, or projects completed as part of the Web Developer training.",
        "Consider mentioning any previous education relevant to technology or development, if applicable.",
      ],
    },
    skills_match: {
      score: 85,
      analysis:
        "The resume follows a simple structure with clear headings, making it ATS-friendly. However, it could benefit from additional clarity on roles/responsibilities.",
      improvements: [
        "Use bullet points consistently for each section to enhance readability.",
        "Keep formatting consistent for date presentation and positioning of text.",
      ],
    },
    ats_compatibility: {
      score: 80,
      analysis:
        "The resume is primarily text-based with no complex formatting. Adding a summary or objective that directly aligns with web development would enhance clarity.",
      improvements: [
        "Add a brief summary or objective statement at the start of the resume that specifies interest and relevant experience in web development.",
        "Avoid using any images or non-standard fonts.",
      ],
    },
  });
  
  return (
    <div
      className={cn(
        "group relative",
        className,
      )}
    >
      <div className="opacity-50 2xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
        <AnalyzeResumeButton
          resumeData={resumeData}
          onResumeAnalyzed={(aiResponse) => setAtsSuggestions(aiResponse)}
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ATSAnalysis ats_compatibility={atsSuggestions.ats_compatibility} education_match={atsSuggestions.education_match} experience_match={atsSuggestions.experience_match} skills_match={atsSuggestions.skills_match} keywords_match={atsSuggestions.keywords_match} overall_score={atsSuggestions.overall_score} />
      </div>
    </div>
  );
};

export default ATSSuggestionsSection;
