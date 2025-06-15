import React, { useRef } from "react";
import { formatDate } from "date-fns";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { ptToPx } from "@/lib/utils/common-functions";

// 1. Define stricter interfaces with required fields
interface Experience {
  position?: string;  // Now required since your data always has it
  company?: string;
}

interface Education {
  degree?: string;  // Now required
  school?: string;
}

// 2. More reliable type guard
function isExperience(item: Experience | Education): item is Experience {
  // Check for multiple experience-specific properties
  return 'position' in item && 'company' in item;
}

// 3. Safe value extraction with proper type inference
// 1. Function to get the title (position or degree)
function getItemTitle(item: Experience | Education): string | undefined {
  return isExperience(item) ? item.position : item.degree;
}

// 2. Function to get the institution (company or school)
function getItemInstitution(item: Experience | Education): string| undefined {
  return isExperience(item) ? item.company : item.school;
}

interface ResumeProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const ScienceEngineeringResume = ({
  resumeData,
  className,
  contentRef,
}: ResumeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn("bg-white text-black w-full aspect-[210/297]", className)}
      ref={containerRef}
    >
      <div
        className={cn("p-8 text-[10pt] space-y-8", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: "DMSans-Regular",
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <Header resumeData={resumeData} />
        <div className="flex ">
          <span
            className="w-1/5"
            style={{
              fontFamily: "Arimo-Bold",
              fontSize: `${ptToPx(10)}px`,
            }}
          >
            CONTACT
          </span>
          <div className="w-4/5"><ContactSection resumeData={resumeData} /></div>
        </div>
        <Section
          title="Professional Experience"
          resumeData={resumeData}
          type="experience"
        />
        <Section title="Education" resumeData={resumeData} type="education" />
        <CertificateSection resumeData={resumeData} />
      </div>
    </div>
  );
};

const Header = ({ resumeData }: { resumeData: ResumeValues }) => (
  <div className="flex justify-between items-center pb-2">
    <h1
      className="font-bold"
      style={{ fontFamily: "NeueMachina-Bold", fontSize: `${ptToPx(23)}px` }}
    >
      {resumeData.firstName} {resumeData.lastName}
    </h1>
    <h2
      className="text-xl font-light"
      style={{ fontFamily: "NeueMachina-Regular", fontSize: `${ptToPx(16)}px` }}
    >
      {resumeData.jobTitle}
    </h2>
  </div>
);

const ContactSection = ({ resumeData }: { resumeData: ResumeValues }) => (
  <div
    className="grid grid-cols-2 gap-8"
    style={{
      fontSize: `${ptToPx(10)}px`,
    }}
  >
    <div>
      <p>
        <strong
          style={{
            fontFamily: "DMSans-Bold",
          }}
        >
          Phone:
        </strong>{" "}
        {resumeData.phone}
      </p>
      <p>
        <strong>Email:</strong> {resumeData.email}
      </p>
    </div>
    <div>
      <p>
        <strong>Address:</strong>{" "}
        {resumeData.city && resumeData.country
          ? `${resumeData.city}, ${resumeData.country}`
          : resumeData.city
            ? resumeData.city
            : resumeData.country
              ? resumeData.country
              : null}
      </p>
      {resumeData.website && (
        <p>
          <strong>Portfolio:</strong> {resumeData.website}
        </p>
      )}
    </div>
  </div>
);

const Section = ({
  title,
  resumeData,
  type,
}: {
  title: string;
  resumeData: ResumeValues;
  type: "experience" | "education";
}) => {
  const entries =
    type === "experience" ? resumeData.workExperiences : resumeData.educations;

  if (!entries?.length) return null;

  return (
    <div className="flex justify-between">
      {/* LEFT COLUMN: Title */}
      <div className="w-1/5 pt-4">
        <p
          className="uppercase pb-1"
          style={{
            fontFamily: "Arimo-Bold",
            fontSize: `${ptToPx(10)}px`,
          }}
        >
          {title}
        </p>
      </div>

      {/* RIGHT COLUMN: Entries */}
      <div className="w-4/5 flex flex-col space-y-4">
        <div className="border-b border-black "></div>
        {entries.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex font-semibold text-sm">
              <span>
                {getItemTitle(item)}
                {" | "}
                {item.startDate
                  ? formatDate(new Date(item.startDate), "yyyy")
                  : ""}{" "}
                -{" "}
                {item.endDate
                  ? formatDate(new Date(item.endDate), "yyyy")
                  : "Present"}
              </span>
            </div>
            <span>{getItemInstitution(item)}</span>
            {item.description?.split("•").map(
              (line, idx) =>
                line.trim() && (
                  <li key={idx} className="text-sm ml-4 list-disc">
                    {line.trim()}
                  </li>
                ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificateSection = ({ resumeData }: { resumeData: ResumeValues }) => {
  const certificates = resumeData.certifications;
  console.log("certificates: ", resumeData.certifications);
  if (!certificates?.length) return null;

  return (
    <div className="flex">
      <div className="w-1/5 pt-4">
        <h3 className="uppercase font-bold pb-1">Certificates</h3>
      </div>
      <div className="w-4/5 space-y-4">
        <div className="border-b border-black"></div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {certificates.map((cert, index) => (
            <div key={index}>
              <p className="font-semibold">
                {cert.name} |{" "}
                {cert.date
                  ? formatDate(new Date(cert.date), "yyyy")
                  : "Present"}
              </p>
              <p className="text-xs">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceEngineeringResume;
