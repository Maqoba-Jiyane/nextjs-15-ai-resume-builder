import { ResumeValues } from "@/lib/validation";
import ClassicResume from "./ClassicResume";
import ModernResume from "./ModernResume";
// import ModernResume from "./ModernResume"; // Future template support

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  template?: "CLASSIC" | "MODERN" | 'CREATIVE';
}

const ResumePreview = ({ resumeData, contentRef, className }: ResumePreviewProps) => {
  console.log('ResumePreview: ', resumeData.template)
  return (
    <div className="w-full">
      {resumeData.template === "CLASSIC" ? (
        <ClassicResume resumeData={resumeData} className={className} contentRef={contentRef} />
      ) : resumeData.template === "MODERN" ? (
        <ModernResume resumeData={resumeData} className={className} contentRef={contentRef} />
      ) : (
        <p className="text-white text-center">Coming soon...</p>
      )}
    </div>
  );
};

export default ResumePreview;
