import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import "../app/fonts.css"; // Import the CSS file
import { formatDate } from "date-fns";
import { ptToPx } from "@/lib/utils/common-functions";
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

interface ClassicResumeRichProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const ClassicResumeRich = ({
  resumeData,
  className,
  contentRef,
}: ClassicResumeRichProps) => {

  const {
    photo,
    website,
  } = resumeData;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full flex aspect-[210/297]",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "flex h-full text-white space-y-8",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
          fontSize: `${ptToPx(10)}px`,
          fontFamily: "Lato-Regular",
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <aside className="w-1/3 bg-[#1A2A42] text-white p-6 space-y-8">
          <div className="flex flex-col items-center">
            {photoSrc && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4">
                <Image src={photoSrc} alt="Profile" width={128} height={128} />
              </div>
            )}
          </div>

          <section>
            <h2
              className="text-sm font-semibold border-b border-gray-300 pb-1 mb-2"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(14)}px` }}
            >
              CONTACT
            </h2>
            <ul className="text-sm space-y-1 flex flex-wrap flex-col">
              {resumeData?.phone?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <Phone size={14} />
                  </span>
                  <span className="break-words">{resumeData.phone}</span>
                </li>
              )}

              {resumeData?.email?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <Mail size={14} />
                  </span>
                  <span className="break-words">{resumeData.email}</span>
                </li>
              )}

              {resumeData?.country?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <MapPin size={14} />
                  </span>
                  <span className="break-words">
                    {resumeData.city && `${resumeData.city}, `}
                    {resumeData.country}
                  </span>
                </li>
              )}

              {website?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <Globe size={14} />
                  </span>
                  <a
                    href={
                      website.startsWith("http")
                        ? website
                        : `https://${website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-words"
                  >
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}

              {resumeData?.linkedin?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <Linkedin size={14} />
                  </span>
                  <a
                    href={
                      resumeData.linkedin.startsWith("http")
                        ? resumeData.linkedin
                        : `https://${resumeData.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-words"
                  >
                    {resumeData.linkedin.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}

              {resumeData?.github?.trim() && (
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 pt-1">
                    <Github size={14} />
                  </span>
                  <a
                    href={
                      resumeData.github.startsWith("http")
                        ? resumeData.github
                        : `https://${resumeData.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-words"
                  >
                    {resumeData.github.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <section>
            <h2
              className="text-sm font-semibold border-b border-gray-300 pb-1 mb-2"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(14)}px` }}
            >
              EDUCATION
            </h2>
            <ul className="space-y-6">
              {resumeData.educations?.map((edu, i) => (
                <li key={i}>
                  {edu.startDate && (
                    <p
                      style={{
                        fontSize: `${ptToPx(10)}px`,
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      {formatDate(edu.startDate, "MMM yyyy")} -{" "}
                      {edu.endDate
                        ? formatDate(edu.endDate, "MMM yyyy")
                        : "PRESENT"}
                    </p>
                  )}
                  <p
                    className="uppercase font-bold"
                    style={{
                      fontSize: `${ptToPx(10)}px`,
                      fontFamily: "Lato-Bold",
                    }}
                  >
                    {edu.school}
                  </p>
                  <ul className="list-disc pl-5 pt-2">
                    <li>{edu.degree}</li>
                  </ul>
                  {/* {edu.gpa && <p>GPA: {edu.gpa}</p>} */}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-sm font-semibold border-b border-gray-300 pb-1 mb-2"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(14)}px` }}
            >
              SKILLS
            </h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              {resumeData.skills?.map((skill, i) => (
                <li key={i} className="pl-5 -indent-5">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* <section>
            <h2
              className="text-sm font-semibold border-b border-gray-300 pb-1 mb-2"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(14)}px` }}
            >
              LANGUAGES
            </h2>
            <ul className="text-sm space-y-1">
              {resumeData.languages?.map((lang, i) => (
                <li key={i}>
                  {lang} ({lang})
                </li>
              ))}
            </ul>
          </section> */}
        </aside>

        <main className="w-2/3 p-6 space-y-6 bg-white text-[#545454]">
          <div className="flex flex-col py-3 mx-auto justify-center">
            <h1
              className="font-bold text-center uppercase"
              style={{ fontFamily: "now-black", fontSize: `${ptToPx(27)}px` }}
            >
              {resumeData.firstName}{" "}
              {
                <span
                  className="font-normal"
                  style={{ fontFamily: "now-regular" }}
                >
                  {resumeData.lastName}
                </span>
              }
            </h1>
            <div className="mb-2 pl-[95px]">
              <p
                className="underline underline-offset-4"
                style={{
                  fontFamily: "now-regular",
                  fontSize: `${ptToPx(15.4)}px`,
                }}
              >
                {resumeData.jobTitle}
              </p>
            </div>
          </div>
          <section>
            <h2
              className="font-bold border-b-2 mb-2"
              style={{
                fontSize: `${ptToPx(14)}px`,
                color: resumeData.colorHex,
              }}
            >
              PROFILE
            </h2>
            <p
              className="text-[12px] font-normal leading-relaxed"
              style={{
                fontSize: `${ptToPx(10)}px`,
                fontFamily: "Lato-Regular",
              }}
            >
              {resumeData.summary}
            </p>
          </section>

          <section className="relative">
            {/* Content with padding to avoid overlap */}{" "}
            {/* Adjust padding as needed */}
            <h2
              className="text-sm font-bold border-b-2 mb-2"
              style={{
                fontFamily: "Now-Bold",
                color: resumeData.colorHex,
                fontSize: `${ptToPx(14)}px`,
              }}
            >
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {resumeData.workExperiences?.map((exp, i) => (
                <div key={i} className="relative">
                  {" "}
                  {/* Added relative for positioning */}
                  {/* Starting dot */}
                  <div
                    className="w-2 h-2 rounded-full absolute top-2 -left-[4px] pt-2"
                    style={{ backgroundColor: resumeData.colorHex }}
                  ></div>
                  {/* Dotted line */}
                  <div className="absolute h-full border-l-2 left-0 top-2"></div>
                  <div className="pl-5">
                    <div className="flex justify-between">
                      <p
                        style={{
                          fontSize: `${ptToPx(11)}px`,
                          fontFamily: "Aileron-Bold",
                        }}
                      >
                        {exp.company}
                      </p>
                      {exp.startDate && (
                        <span
                          className="font-normal"
                          style={{
                            fontSize: `${ptToPx(10)}px`,
                            fontFamily: "Aileron-Regular",
                          }}
                        >
                          {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                          {exp.endDate
                            ? formatDate(exp.endDate, "MMM yyyy")
                            : "PRESENT"}
                        </span>
                      )}
                    </div>
                    <p
                      className=""
                      style={{
                        fontSize: `${ptToPx(11)}px`,
                        fontFamily: "Aileron-Regular",
                      }}
                    >
                      {exp.position}
                    </p>
                    <ul
                      className="list-disc list-inside pl-5 -indent-5"
                      style={{
                        fontSize: `${ptToPx(10)}px`,
                        fontFamily: "Aileron-Regular",
                      }}
                    >
                      {exp.description &&
                        exp.description
                          ?.split("•")
                          .filter(Boolean)
                          .map((duty, j) => <li key={j}>{duty}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ClassicResumeRich;
