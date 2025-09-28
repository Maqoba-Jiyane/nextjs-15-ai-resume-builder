"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ptToPx } from "@/lib/utils/common-functions";
import { format as formatDate } from "date-fns";
import { ResumeValues } from "@/lib/validation";
import { Globe, Linkedin, Mail, MapPin, Phone, Github } from "lucide-react";
import "../app/fonts.css";

type Props = {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
};

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

/**
 * Displays a black/white two-column modern layout with:
 * - Left (dark): Name (prominent), About, Contact
 * - Right (light): Experience, Education, Skills Summary, Language, Expertise (progress)
 * Print-safe (A4), zoomed to parent width using useDimensions.
 */
export default function BlackModernProfessional({
  resumeData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Photo object URL handling
  const [photoSrc, setPhotoSrc] = useState(
    resumeData.photo instanceof File ? "" : resumeData.photo || ""
  );
  useEffect(() => {
    const objUrl = resumeData.photo instanceof File ? URL.createObjectURL(resumeData.photo) : "";
    if (objUrl) setPhotoSrc(objUrl);
    if (!resumeData.photo) setPhotoSrc("");
    return () => {
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, [resumeData.photo]);

  // Derive contact links
  const website = resumeData.website?.trim();
  const websiteHref = useMemo(() => {
    if (!website) return "";
    return website.startsWith("http") ? website : `https://${website}`;
  }, [website]);

  const linkedin = resumeData.linkedin?.trim();
  const linkedinHref = useMemo(() => {
    if (!linkedin) return "";
    return linkedin.startsWith("http") ? linkedin : `https://${linkedin}`;
  }, [linkedin]);

  const github = resumeData.github?.trim();
  const githubHref = useMemo(() => {
    if (!github) return "";
    return github.startsWith("http") ? github : `https://${github}`;
  }, [github]);

  // Split skills into two buckets: plain skills and “expertise” with level (if provided)
  // We accept either "Skill" or "Skill: 78" patterns in resumeData.skills
  const parsedSkills = (resumeData.skills || []).map((s) => {
    const m = String(s).match(/^(.+?):\s*([0-9]{1,3})$/);
    if (m) return { label: m[1].trim(), level: clamp(Number(m[2])) };
    return { label: String(s), level: undefined };
  });

  const expertise = parsedSkills.filter((s) => typeof s.level === "number");
  const skillsSummary = parsedSkills.filter((s) => s.level === undefined);

  // Languages can be strings like "English (native)" or objects if you store them that way
  const languages = resumeData.languages || [];

  return (
    <div
      className={cn("bg-white text-black h-fit w-full flex aspect-[210/297]", className)}
      ref={containerRef}
    >
      <div
        className={cn("flex h-full w-full", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width, // base width ~794px (A4 at 96ppi approx)
          fontSize: `${ptToPx(10)}px`,
          fontFamily: "Lato-Regular, ui-sans-serif, system-ui",
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* Left (Dark) */}
        <aside
          id="aside"
          className="relative flex flex-col justify-between shrink-0"
          style={{ width: Math.round(794 * 0.38) }} // ~38% to mirror the PDF’s strong left column
        >
          <div className="h-full bg-black text-white p-8 flex flex-col gap-6">
            {/* Name block */}
            <div className="mt-2">
              <h1
                className="leading-none tracking-wide"
                style={{
                  fontFamily: "now-black, Now-Bold, sans-serif",
                  fontSize: `${ptToPx(28)}px`,
                  letterSpacing: `${ptToPx(1)}px`,
                }}
              >
                {resumeData.firstName?.toUpperCase()}{" "}
                <span
                  className="font-light"
                  style={{
                    fontFamily: "now-regular, Now-Regular, Lato-Regular, sans-serif",
                  }}
                >
                  {resumeData.lastName?.toUpperCase()}
                </span>
              </h1>
              {resumeData.jobTitle && (
                <p
                  className="mt-2 opacity-90"
                  style={{ fontSize: `${ptToPx(11.5)}px`, fontFamily: "Lato-Regular" }}
                >
                  {resumeData.jobTitle}
                </p>
              )}
            </div>

            {/* Photo */}
            {photoSrc && (
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/10">
                <Image
                  src={photoSrc}
                  alt="Profile"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* About */}
            {resumeData.summary && (
              <section className="space-y-2">
                <h2
                  className="uppercase pb-1 border-b border-white/20"
                  style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
                >
                  About Me
                </h2>
                <p
                  className="text-white/90 leading-relaxed"
                  style={{ fontSize: `${ptToPx(10)}px` }}
                >
                  {resumeData.summary}
                </p>
              </section>
            )}

            {/* Contact */}
            <section className="space-y-2">
              <h2
                className="uppercase pb-1 border-b border-white/20"
                style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
              >
                Contact
              </h2>
              <ul className="flex flex-col gap-1 text-white/90">
                {resumeData.email?.trim() && (
                  <li className="flex items-start gap-2">
                    <Mail size={14} className="mt-[2px]" />
                    <span className="break-words">{resumeData.email}</span>
                  </li>
                )}
                {resumeData.phone?.trim() && (
                  <li className="flex items-start gap-2">
                    <Phone size={14} className="mt-[2px]" />
                    <span className="break-words">{resumeData.phone}</span>
                  </li>
                )}
                {(resumeData.city || resumeData.country) && (
                  <li className="flex items-start gap-2">
                    <MapPin size={14} className="mt-[2px]" />
                    <span className="break-words">
                      {resumeData.city && `${resumeData.city}`}
                      {resumeData.city && resumeData.country ? ", " : ""}
                      {resumeData.country}
                    </span>
                  </li>
                )}
                {website && (
                  <li className="flex items-start gap-2">
                    <Globe size={14} className="mt-[2px]" />
                    <a
                      className="underline underline-offset-2 break-words"
                      href={websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li className="flex items-start gap-2">
                    <Linkedin size={14} className="mt-[2px]" />
                    <a
                      className="underline underline-offset-2 break-words"
                      href={linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkedin.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
                {github && (
                  <li className="flex items-start gap-2">
                    <Github size={14} className="mt-[2px]" />
                    <a
                      className="underline underline-offset-2 break-words"
                      href={githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {github.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </aside>

        {/* Right (Light) */}
        <main id="main" className="flex-1 bg-white text-[#4a4a4a] p-8 space-y-8">
          {/* EXPERIENCE */}
          <section className="space-y-3">
            <h2
              className="uppercase border-b-2 pb-1"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
            >
              Experience
            </h2>
            <div className="space-y-5">
              {resumeData.workExperiences?.map((exp, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-x-3">
                  <div>
                    <p
                      className="font-semibold text-[#111]"
                      style={{ fontFamily: "Aileron-Bold", fontSize: `${ptToPx(11.5)}px` }}
                    >
                      {exp.position || exp.company}
                    </p>
                    <p className="text-[11px]">
                      {exp.company}
                      {exp.location ? ` — ${exp.location}` : ""}
                    </p>
                    {exp.description && (
                      <ul
                        className="list-disc pl-4 mt-1 leading-relaxed"
                        style={{ fontSize: `${ptToPx(10)}px` }}
                      >
                        {String(exp.description)
                          .split("•")
                          .filter(Boolean)
                          .map((line, j) => (
                            <li key={j}>{line.trim()}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className="text-right text-[10.5px] whitespace-nowrap">
                    {exp.startDate &&
                      `${formatDate(exp.startDate, "MMM yyyy")} - ${
                        exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "PRESENT"
                      }`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="space-y-3">
            <h2
              className="uppercase border-b-2 pb-1"
              style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.educations?.map((edu, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-x-3">
                  <div>
                    <p
                      className="font-semibold text-[#111]"
                      style={{ fontFamily: "Aileron-Bold", fontSize: `${ptToPx(11.5)}px` }}
                    >
                      {edu.degree || edu.school}
                    </p>
                    <p className="text-[11px]">{edu.school}</p>
                  </div>
                  <div className="text-right text-[10.5px] whitespace-nowrap">
                    {edu.startDate &&
                      `${formatDate(edu.startDate, "yyyy")} - ${
                        edu.endDate ? formatDate(edu.endDate, "yyyy") : "PRESENT"
                      }`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS SUMMARY */}
          {skillsSummary.length > 0 && (
            <section className="space-y-3">
              <h2
                className="uppercase border-b-2 pb-1"
                style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
              >
                Skills Summary
              </h2>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-1"
                style={{ fontSize: `${ptToPx(10.5)}px` }}
              >
                {skillsSummary.map((s, i) => (
                  <li key={i} className="pl-4 -indent-4 list-disc">
                    {s.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* LANGUAGE */}
          {languages.length > 0 && (
            <section className="space-y-3">
              <h2
                className="uppercase border-b-2 pb-1"
                style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
              >
                Language
            </h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                {languages.map((lang, i) => (
                  <li key={i} className="pl-4 -indent-4 list-disc">
                    {String(lang)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* EXPERTISE (progress bars) */}
          {expertise.length > 0 && (
            <section className="space-y-3">
              <h2
                className="uppercase border-b-2 pb-1"
                style={{ fontFamily: "Now-Bold", fontSize: `${ptToPx(13.5)}px` }}
              >
                Expertise
              </h2>
              <div className="space-y-3">
                {expertise.map((e, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-3 items-center">
                    <span className="text-[11px]">{e.label}</span>
                    <span className="text-[10px] tabular-nums">{e.level}%</span>
                    <div className="col-span-2 h-[6px] bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${clamp(e.level!)}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
