"use client";

import React, { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ptToPx } from "@/lib/utils/common-functions";
import { format as formatDate } from "date-fns";
import { ResumeValues } from "@/lib/validation";
import { Mail, Phone, MapPinned } from "lucide-react";
import "../app/fonts.css";

type Props = {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
};

/* ------------------------------ Shared Styles ------------------------------ */

const FONT = {
  header: "GlacialIndifference-Bold",
  title: "GlacialIndifference-Regular",
  strong: "Aileron-Bold",
  semi: "Aileron-SemiBold, Aileron-Bold",
  body: "Lato-Regular, ui-sans-serif, system-ui",
} as const;

const COLOR = {
  ink: "#464a4e",
  subInk: "#2e2e2e",
  meta: "#707070",
  body: "#4b4b4b",
  gold: "#ddc6a4",
  hairline: "bg-neutral-300/80",
} as const;

/* --------------------------------- Primitives -------------------------------- */

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2
    className="uppercase tracking-[0.25em]"
    style={{
      fontFamily: FONT.header,
      fontSize: `${ptToPx(15)}px`,
      color: COLOR.ink,
    }}
  >
    {children}
  </h2>
);

const Divider = () => <div className={` w-full my-6 h-px ${COLOR.hairline}`} />;

const DateRange: React.FC<{
  start?: Date | string | null;
  end?: Date | string | null;
  fmt?: string;
}> = ({ start, end, fmt = "yyyy" }) => {
  if (!start && !end) return null;
  const s = start ? formatDate(start as Date, fmt) : "";
  const e = end ? formatDate(end as Date, fmt) : "Present";
  return (
    <p
      className="text-[#464a4e]"
      style={{ fontSize: `${ptToPx(10)}px`, fontFamily: "Roboto-Bold" }}
    >
      {start ? `${s} - ${e}` : e}
    </p>
  );
};

const Bullets: React.FC<{ text?: string | null }> = ({ text }) => {
  if (!text) return null;
  const items = String(text)
    .split("•")
    .map((t) => t.trim())
    .filter(Boolean);
  if (!items.length) return null;
  return (
    <ul
      className="mt-3 list-disc pl-5 leading-relaxed"
      style={{
        fontSize: `${ptToPx(10.2)}px`,
        color: "#706f6f",
        fontFamily: "Roboto-Regular",
      }}
    >
      {items.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
};

const ContactList: React.FC<{
  phone?: string | null;
  email?: string | null;
  city?: string | null;
  country?: string | null;
}> = ({ phone, email, city, country }) => {
  const rowCls = "flex items-start gap-3";
  const textStyle = { fontSize: `${ptToPx(10.6)}px`, color: COLOR.body };

  return (
    <ul className="mt-4 space-y-3" style={textStyle}>
      {phone?.trim() && (
        <li className={rowCls}>
          <Phone size={20} className="mt-[2px]" color="#ddc6a4" />
          <span
            className="break-words"
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: `${ptToPx(10)}`,
              color: "#706f6f",
            }}
          >
            {phone}
          </span>
        </li>
      )}
      {email?.trim() && (
        <li className={rowCls}>
          <Mail size={20} className="mt-[2px]" color="#ddc6a4" />
          <span
            className="break-words"
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: `${ptToPx(10)}, color: "#706f6f"`,
            }}
          >
            {email}
          </span>
        </li>
      )}
      {(city || country) && (
        <li className={rowCls}>
          <MapPinned color="#ddc6a4" />
          <span
            className="break-words"
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: `${ptToPx(10)}`,
              color: "#706f6f",
            }}
          >
            {city ?? ""}
            {city && country ? ", " : ""}
            {country ?? ""}
          </span>
        </li>
      )}
    </ul>
  );
};

/* --------------------------------- Component --------------------------------- */

export default function BlueCreativeResume({
  resumeData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const name = `${(resumeData.firstName || "").toUpperCase()} ${(resumeData.lastName || "").toUpperCase()}`;
  const title = resumeData.jobTitle?.toUpperCase();

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full flex aspect-[210/297]",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("relative h-full w-full", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontSize: `${ptToPx(10)}px`,
          fontFamily: FONT.body,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* ===== Header ===== */}
        <header className="relative">
          <svg
            viewBox="0 0 794 220"
            width={794}
            height={220}
            className="block"
            aria-hidden
          >
            <defs>
              <linearGradient id="hdr" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#233a54" />
                <stop offset="100%" stopColor="#1b2e45" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="794" height="220" fill="url(#hdr)" />
            {/* slanted overlay (high-left → low-right). tweak the second y to change slope */}
            <path
              d="M2000,0 L0,0 L0,0 L794,220 Z"
              fill="#2d4968"
              opacity="0.55"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1
              className="tracking-[0.24em] text-center"
              style={{
                color: COLOR.gold,
                fontFamily: FONT.title,
                fontSize: `${ptToPx(35)}px`,
                letterSpacing: `${ptToPx(10)}px`,
              }}
            >
              {name}
            </h1>
            {title && (
              <p
                className="mt-2 tracking-[0.35em]"
                style={{
                  color: COLOR.gold,
                  fontSize: `${ptToPx(16)}px`,
                  letterSpacing: `${ptToPx(8)}px`,
                  fontFamily: FONT.header,
                }}
              >
                {title}
              </p>
            )}
          </div>
        </header>

        {/* ===== Body ===== */}
        <div className="grid grid-cols-[1fr_300px] px-10 pt-10">
          {/* Left: Experience + Education */}
          <div className="">
            <section className="mb-8 pr-6">
              <SectionTitle>Experience</SectionTitle>
              <div className="mt-5 space-y-7">
                {resumeData.workExperiences?.map((exp, i) => (
                  <div key={i}>
                    {(exp.position || exp.company) && (
                      <p
                        className="uppercase"
                        style={{
                          fontFamily: "Roboto-Bold",
                          fontSize: `${ptToPx(10)}px`,
                          color: COLOR.ink,
                        }}
                      >
                        {exp.position}
                      </p>
                    )}
                    {exp.company && (
                      <p
                        className="mt-[2px]"
                        style={{
                          color: "#706f6f",
                          fontFamily: FONT.semi,
                          fontSize: `${ptToPx(10.8)}px`,
                        }}
                      >
                        {exp.company}
                      </p>
                    )}
                    <DateRange start={exp.startDate} end={exp.endDate} />
                    <Bullets text={exp.description} />
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="mt-6 space-y-6">
                {resumeData.educations?.map((edu, i) => (
                  <div key={i}>
                    <DateRange start={edu.startDate} end={edu.endDate} />
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: "Roboto-Bold",
                        color: "#706f6f",
                        fontSize: `${ptToPx(10)}px`,
                      }}
                    >
                      {edu.school}
                    </p>
                    {edu.degree && (
                      <p
                        style={{
                          fontFamily: "Roboto-Bold",
                          color: "#706f6f",
                          fontSize: `${ptToPx(10)}px`,
                        }}
                      >
                        {edu.degree}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Contact | Summary | Skills */}
          <aside className="relative">
            <div
              className={`absolute left-0 top-0 h-full w-px ${COLOR.hairline}`}
            />

            <section className="pl-6 mb-8">
              <SectionTitle>Contact</SectionTitle>
              <ContactList
                phone={resumeData.phone}
                email={resumeData.email}
                city={resumeData.city}
                country={resumeData.country}
              />
            </section>

            <Divider />

            {resumeData.summary && (
              <>
                <section className="pl-6 mb-8">
                  <SectionTitle>Summary</SectionTitle>
                  <p
                    className="mt-4 leading-relaxed"
                    style={{
                      fontSize: `${ptToPx(10)}px`,
                      color: "#706f6f",
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {resumeData.summary}
                  </p>
                </section>
                <Divider />
              </>
            )}

            {!!resumeData.skills?.length && (
              <section className="pl-6 mb-8">
                <SectionTitle>Skills</SectionTitle>
                <ul
                  className="mt-4 list-disc pl-5 space-y-1"
                  style={{
                    fontSize: `${ptToPx(10)}px`,
                    color: "#706f6f",
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  {resumeData.skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {/* bottom spacing to match PDF whitespace */}
        <div className="h-8" />
      </div>
    </div>
  );
}
