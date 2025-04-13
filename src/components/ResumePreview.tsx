import { ResumeValues } from "@/lib/validation";
import ClassicResume from "./ClassicResume";
import ATS1 from "./ATS1";
// import ATS1 from "./ATS1";
// import ModernResume from "./ModernResume"; // Future template support

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  template?: "classic" | "ats-1" | 'CREATIVE';
}

const ResumePreview = ({ resumeData, contentRef, className }: ResumePreviewProps) => {
  console.log('ResumePreview: ', resumeData.template)
  return (
    <div className="w-full">
      {resumeData.template === "classic" ? (
        <ClassicResume resumeData={resumeData} className={className} contentRef={contentRef} />
      ) :  (
        <ATS1 resumeData={resumeData} className={className} contentRef={contentRef}/>
        // <ModernResume resumeData={resumeData} className={className} contentRef={contentRef} />
      )
      //  : (
      //   <p className="text-white text-center">Coming soon...</p>
      // )
      }
    </div>
  );
};

export default ResumePreview;
