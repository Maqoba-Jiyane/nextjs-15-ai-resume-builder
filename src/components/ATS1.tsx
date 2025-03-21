

import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";

interface ATS1Props {
    resumeData: ResumeValues;
    className?: string;
    contentRef?: React.Ref<HTMLDivElement>
}

const ATS1: React.FC<ATS1Props> = ({ resumeData, className, contentRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { width } = useDimensions(containerRef);
  // Helper function to format dates
  const formatDate = (date?: Date | string): string => {
    if (!date) return "Present";

    // Convert the date to a Date object if it's a string
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return "Present";

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
      {/* Title (Name) */}
      <h1 className="text-3xl font-bold text-center mb-2">
        {resumeData.firstName} {resumeData.lastName}
      </h1>

      {/* Subtitle (Contact info) */}
      <div className="text-center text-gray-600 mb-6">
        {resumeData.city && resumeData.country && `${resumeData.city}, ${resumeData.country}`}
        {resumeData.phone && ` • ${resumeData.phone}`}
        {resumeData.email && ` • ${resumeData.email}`}
      </div>

      {/* Section: Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
          <p className="">{resumeData.summary}</p>
        </div>
      )}

      {/* Section: Education */}
      {resumeData.educations && resumeData.educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Education</h2>
          {resumeData.educations.map((education, index) => (
            <div key={index} className="mb-4">
              <p className=" font-semibold">
                {education.degree}, {education.school}
              </p>
              <p className="text-sm">
                {formatDate(education.startDate)} - {formatDate(education.endDate)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Section: Work Experience */}
      {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          {resumeData.workExperiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <p className=" font-semibold">
                {experience.position} at {experience.company}
              </p>
              <p className="text-sm">
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </p>
              {experience.description && (
                <ul className="list-disc list-inside  mt-2">
                  {experience.description
                    .split("\n")
                    .map((line, i) => (
                      <li key={i} className="ml-3">{line.trim().replace('- ', '')}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Section: Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <div className="flex flex-col flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm"
              >
                • {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ATS1;