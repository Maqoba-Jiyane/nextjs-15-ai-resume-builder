"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { ResumeValues, UserDetailsValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeValues, mapToUserDetailsValues } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData, UserServerData } from "@/lib/types";
import { ATSAnalysisProps } from "@/components/Interfaces";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
  personalInfoDetailsToAssign: UserServerData | null
}

function ResumeEditor({ resumeToEdit, personalInfoDetailsToAssign }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  const [personalInfoDetails] = useState<UserDetailsValues>(
    personalInfoDetailsToAssign ? mapToUserDetailsValues(personalInfoDetailsToAssign) : {},
  );
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const [showATSSuggestions, setShowATSSuggestions] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData, aiUsed);
  const [atsSuggestions, setAtsSuggestions ] = useState<ATSAnalysisProps>({
    overall_score: 120,
    keywords_match: {
      score: 80,
      analysis: "The resume contains relevant keywords such as 'Integration Developer,' 'collaboration,' 'testing,' and 'technical support,' aligning well with the job description.",
      improvements: [
        "Incorporate specific web development technologies or frameworks that were used in previous roles.",
        "Include skills directly related to web development, such as HTML, CSS, JavaScript, or specific languages or libraries."
      ]
    },
    experience_match: {
      score: 70,
      analysis: "The experience as an Integration Developer shows relevant skills that may relate to web development, but the focus is heavily on integration and support rather than core web development tasks.",
      improvements: [
        "Highlight any direct web development work or projects completed during this role or prior roles.",
        "Emphasize any front-end or back-end development responsibilities, if applicable."
      ]
    },
    education_match: {
      score: 50,
      analysis: "The education listed as 'Web Developer' from CodeSpace reflects a relevant field of study; however, the dates indicate a future graduation, which might not meet immediate requirements.",
      improvements: [
        "Include information about any relevant coursework, certifications, or projects completed as part of the Web Developer training.",
        "Consider mentioning any previous education relevant to technology or development, if applicable."
      ]
    },
    skills_match: {
      score: 85,
      analysis: "The resume follows a simple structure with clear headings, making it ATS-friendly. However, it could benefit from additional clarity on roles/responsibilities.",
      improvements: [
        "Use bullet points consistently for each section to enhance readability.",
        "Keep formatting consistent for date presentation and positioning of text."
      ]
    },
    ats_compatibility: {
      score: 80,
      analysis: "The resume is primarily text-based with no complex formatting. Adding a summary or objective that directly aligns with web development would enhance clarity.",
      improvements: [
        "Add a brief summary or objective statement at the start of the resume that specifies interest and relevant experience in web development.",
        "Avoid using any images or non-standard fonts."
      ]
    }
  });

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    if (typeof window !== "undefined") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("step", key);
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    }
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full md:w-1/2 p-3 overflow-y-auto space-y-6 md:block",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
                personalDetails={personalInfoDetails}
                onAiUsed={setAiUsed}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(
              showSmResumePreview && "flex",
              !showSmResumePreview && "hidden",
            )}
            atsSuggestions={atsSuggestions}
            showAts={showATSSuggestions}
            setShowAts={setShowATSSuggestions}
            setAtsSuggestions={setAtsSuggestions}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        setShowSmResumePreview={setShowSmResumePreview}
        showSmResumePreview={showSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}

export default ResumeEditor;
