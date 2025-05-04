"use client";

import { useToast } from "@/hooks/use-toast";
import {  Loader, WandSparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  addOrUpdateSkills,
  addOrUpdateSummary,
  addOrUpdateWorkExperience,
  generateSkills,
  generateSummary,
  generateWorkExperience,
  getPromptsFromDB,
} from "./actions";
import { ResumeValues } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";

interface AutoFillButtonProps {
  resumeId: string;
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  validJobSecription: boolean;
}

export default function AutoFillButton({
  resumeId,
  resumeData,
  setResumeData,validJobSecription
}: AutoFillButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = async () => {
    console.log(resumeId)
    const resumeId2 = searchParams.get("resumeId") || "";
    setLoading(true);
    try {
      if (!resumeData.jobDescription || resumeData.jobDescription === "") {
        throw new Error("Job description required.");
      }
      // Load prompts
      const prompts = await getPromptsFromDB();
      if (!prompts || prompts.length === 0) {
        throw new Error("Complete your profile.");
      }

      // Generate work experiences
      const workExperiences = await Promise.all(
        prompts.map((p) => generateWorkExperience({ description: p.prompt! })),
      );
      await addOrUpdateWorkExperience(workExperiences, resumeId2);

      // Prepare updated resume for summary/skills generation
      const updatedResume: ResumeValues = {
        ...resumeData,
        workExperiences,
      };

      // Generate summary and skills concurrently
      const [aiSummary, aiSkills] = await Promise.all([
        generateSummary(updatedResume),
        generateSkills(updatedResume),
      ]);
      await Promise.all([
        addOrUpdateSummary(aiSummary, resumeId2),
        addOrUpdateSkills(aiSkills.split(","), resumeId2),
      ]);

      setResumeData({
        ...updatedResume,
        summary: aiSummary,
        skills: aiSkills.split(","),
      });
      // Refresh page to show updates
      router.refresh();
      toast({
        variant: "default",
        description: "Auto-fill completed successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong during auto-fill.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={loading || validJobSecription}
      type="button"
    >
      {loading ? (
        <Loader/>
      ) : (
        <>
          <WandSparkles className="size-4 mr-2" />
          Auto-fill (AI)
        </>
      )}
    </Button>
  );
}
