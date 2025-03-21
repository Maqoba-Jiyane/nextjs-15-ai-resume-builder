import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import TemplateSwitcher from "./TemplateSwitcher";
import { ATSAnalysisProps } from "@/components/Interfaces";
import { Button } from "@/components/ui/button";
import { SquareMenu } from "lucide-react";

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
  showAts,
  openMenu,
  setOpenMenu,
}: ResumePreviewSectionProps) => {
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
        <Button
          variant="outline"
          size="icon"
          title="Change resume template"
          onClick={handleMenu}
        >
          <SquareMenu />
        </Button>
        <div
          className={`flex flex-col gap-3 ${showAts && "hidden"} ${openMenu && "hidden"}`}
        >
          {/* <ColorPicker
            color={resumeData.colorHex}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color.hex })
            }
          /> */}
          {/* <BorderStyleButton
            borderStyle={resumeData.borderStyle}
            onChange={(borderStyle) =>
              setResumeData({ ...resumeData, borderStyle })
            }
          /> */}
          <TemplateSwitcher
            template={resumeData.template}
            onChange={(template) => setResumeData({ ...resumeData, template })}
          />
        </div>
      </div>
      <div
        className={`flex w-full justify-center overflow-y-auto bg-secondary p-3`}
      >
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
