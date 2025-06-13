import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

interface ModernResumeProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const ModernResume = ({ resumeData, className, contentRef }: ModernResumeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "bg-white text-gray-900 w-full aspect-[210/297] shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("p-8 space-y-8", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <HeaderSection resumeData={resumeData} />
        <Section title="Profile" resumeData={resumeData}>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {resumeData.summary}
          </p>
        </Section>
        <ExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ModernResume;

const Section = ({ title, children, resumeData }: { title: string; children: React.ReactNode; resumeData: ResumeValues }) => (
  <div className="space-y-4 break-inside-avoid">
    <h2 className="text-lg font-semibold uppercase tracking-wider" style={{ color: resumeData.colorHex }}>{title}</h2>
    {children}
  </div>
);

const HeaderSection = ({ resumeData }: { resumeData: ResumeValues }) => {
  const { photo, firstName, lastName, jobTitle, email, phone, city, country, borderStyle } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6 border-b pb-4 border-gray-300">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={90}
          height={90}
          alt="Profile"
          className="object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                ? "9999px"
                : "10%",
          }}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">
          {firstName} {lastName}
        </h1>
        <p className="text-sm text-gray-600">{jobTitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          {[city, country].filter(Boolean).join(", ")} • {[email, phone].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
};

const ExperienceSection = ({ resumeData }: { resumeData: ResumeValues }) => {
  const experiences = resumeData.workExperiences?.filter(exp => Object.values(exp).some(Boolean));
  if (!experiences?.length) return null;

  return (
    <Section title="Experience" resumeData={resumeData}>
      {experiences.map((exp, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between">
            <p className="text-sm font-semibold">
              {exp.company}{exp.position && `, ${exp.position}`}
            </p>
            <p className="text-xs text-gray-500">
              {exp.startDate && `${format(new Date(exp.startDate), "MMM yyyy")} - ${exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}`}
            </p>
          </div>
          {exp.description?.split("•").filter(Boolean).map((line, idx2) => (
            <p key={idx2} className="text-sm pl-4 -indent-3 leading-relaxed">• {line.trim()}</p>
          ))}
        </div>
      ))}
    </Section>
  );
};

const EducationSection = ({ resumeData }: { resumeData: ResumeValues }) => {
  const educations = resumeData.educations?.filter(edu => Object.values(edu).some(Boolean));
  if (!educations?.length) return null;

  return (
    <Section title="Education" resumeData={resumeData}>
      {educations.map((edu, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between">
            <p className="text-sm font-semibold">{edu.degree}</p>
            <p className="text-xs text-gray-500">
              {edu.startDate && `${format(new Date(edu.startDate), "MMM yyyy")} - ${edu.endDate ? format(new Date(edu.endDate), "MMM yyyy") : "Present"}`}
            </p>
          </div>
          <p className="text-xs text-gray-600">{edu.school}</p>
        </div>
      ))}
    </Section>
  );
};

const SkillsSection = ({ resumeData }: { resumeData: ResumeValues }) => {
  const { skills } = resumeData;
  if (!skills?.length) return null;

  return (
    <Section title="Skills" resumeData={resumeData}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge
            key={idx}
            className="rounded-md px-3 py-1 text-sm text-white"
            style={{ backgroundColor: resumeData.colorHex }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Section>
  );
};
