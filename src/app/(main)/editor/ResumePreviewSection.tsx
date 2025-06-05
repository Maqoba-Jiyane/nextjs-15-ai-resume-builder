import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import TemplateSwitcher from "./TemplateSwitcher";
import ATSAnalysis from "@/components/ATSAnalysis";
import AnalyzeResumeButton from "./forms/AnalyzeResumeButton";
import { ATSAnalysisProps } from "@/components/Interfaces";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, SquareMenu,  } from "lucide-react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
  atsSuggestions: ATSAnalysisProps;
  setAtsSuggestions: (aiResponse: ATSAnalysisProps) => void;
  showAts: boolean;
  setShowAts: (ats: boolean) => void;
  openMenu: boolean;
  setOpenMenu: (ats: boolean) => void;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className,
  atsSuggestions,
  setAtsSuggestions,
  setShowAts,
  showAts,
  openMenu,
  setOpenMenu,
}: ResumePreviewSectionProps) => {
  function handleClick() {
    setShowAts(!showAts);
  }

  function handleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div
      className={cn(
        "group relative hidden w-1/2 md:flex max-md:w-full",
        className,
      )}
    >
      <div className="opacity-50 2xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
        <div className={`${showAts && "hidden"}`}>
          <Button
            variant="outline"
            size="icon"
            title="Change resume template"
            onClick={handleMenu}
          >
            <SquareMenu />
          </Button>
        </div>
        <div
          className={`flex flex-col gap-3 ${showAts && "hidden"} ${openMenu && "hidden"}`}
        >
          <ColorPicker
            color={resumeData.colorHex}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color.hex })
            }
          />
          <BorderStyleButton
            borderStyle={resumeData.borderStyle}
            onChange={(borderStyle) =>
              setResumeData({ ...resumeData, borderStyle })
            }
          />
          <TemplateSwitcher
            template={resumeData.template}
            onChange={(template) => setResumeData({ ...resumeData, template })}
          />
        </div>
        <div className={` ${!showAts && "hidden"}`}>
          <AnalyzeResumeButton
            resumeData={resumeData}
            onResumeAnalyzed={(aiResponse) => setAtsSuggestions(aiResponse)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          title="Switch between resume preview and ats checker"
          onClick={() => handleClick()}
        >
          <ArrowRightLeft />
        </Button>
      </div>
      <div
        className={`flex w-full justify-center overflow-y-auto bg-secondary p-3 ${showAts && "hidden"}`}
      >
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
      <div
        className={`flex w-full justify-center overflow-y-auto bg-secondary p-3 ${!showAts && "hidden"}`}
      >
        <ATSAnalysis
          ats_compatibility={atsSuggestions.ats_compatibility}
          education_match={atsSuggestions.education_match}
          experience_match={atsSuggestions.experience_match}
          skills_match={atsSuggestions.skills_match}
          keywords_match={atsSuggestions.keywords_match}
          overall_score={atsSuggestions.overall_score}
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;