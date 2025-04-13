import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";

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
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-4 p-8", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <HeaderSection resumeData={resumeData} />
        <ContactSection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <CertificationsSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ModernResume;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function HeaderSection({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle } = resumeData;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold uppercase tracking-wider">
        {firstName} {lastName}
      </h1>
      <div className="h-1 w-full bg-gray-300" />
      <p className="text-lg font-medium text-gray-700">{jobTitle}</p>
    </div>
  );
}

function ContactSection({ resumeData }: ResumeSectionProps) {
  const { email, phone, city, country, website, linkedin } = resumeData;

  return (
    <div className="grid grid-cols-2 gap-1 text-sm">
      {email && (
        <div className="flex items-center">
          <span className="font-semibold">Email:</span>
          <span className="ml-1">{email}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center">
          <span className="font-semibold">Phone:</span>
          <span className="ml-1">{phone}</span>
        </div>
      )}
      {(city || country) && (
        <div className="flex items-center">
          <span className="font-semibold">Location:</span>
          <span className="ml-1">
            {city}
            {city && country ? ", " : ""}
            {country}
          </span>
        </div>
      )}
      {website && (
        <div className="flex items-center">
          <span className="font-semibold">Website:</span>
          <span className="ml-1">{website}</span>
        </div>
      )}
      {linkedin && (
        <div className="flex items-center">
          <span className="font-semibold">LinkedIn:</span>
          <span className="ml-1">{linkedin}</span>
        </div>
      )}
    </div>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="border-b-2 border-gray-300 pb-1 text-xl font-bold uppercase">
        Professional Experience
      </h2>
      {workExperiencesNotEmpty.map((exp, index) => (
        <div className="break-inside-avoid space-y-1" key={index}>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{exp.position}</h3>
            {exp.startDate && (
              <span className="text-sm font-medium">
                {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium italic">{exp.company}</span>
            <span>{exp.location}</span>
          </div>
          {exp.description && (
            <ul className="ml-5 list-disc text-sm">
              {exp.description
                .split("\n")
                .filter((line) => line.trim())
                .map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="border-b-2 border-gray-300 pb-1 text-xl font-bold uppercase">
        Education
      </h2>
      {educationsNotEmpty.map((edu, index) => (
        <div className="break-inside-avoid space-y-1" key={index}>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            {edu.startDate && (
              <span className="text-sm font-medium">
                {formatDate(edu.startDate, "MMM yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "Present"}
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium italic">{edu.school}</span>
            <span>{edu.location}</span>
          </div>
          {edu.description && (
            <p className="whitespace-pre-line text-sm">{edu.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="border-b-2 border-gray-300 pb-1 text-xl font-bold uppercase">
        Skills
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="text-sm">
            • {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsSection({ resumeData }: ResumeSectionProps) {
  const { certifications } = resumeData;

  if (!certifications?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="border-b-2 border-gray-300 pb-1 text-xl font-bold uppercase">
        Certifications
      </h2>
      <div className="space-y-2">
        {certifications.map((cert, index) => (
          <div key={index} className="text-sm">
            <div className="font-semibold">{cert.name}</div>
            {cert.issuer && (
              <div className="italic">{cert.issuer}</div>
            )}
            {cert.date && (
              <div>{formatDate(cert.date, "MMM yyyy")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}