import React, { useMemo, useRef } from "react";
import { format } from "date-fns";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { ptToPx } from "@/lib/utils/common-functions";
import { FaGlobe, FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { ImBriefcase } from "react-icons/im";

// ---------- Theme tokens ----------
const COLORS = {
  navy: "#323b4c",
  slate: "#e4e4e4",
  textDark: "#0F172A",
  line: "#163853",
};

const FONT = {
  names: "Now-Black",
  header: "Now-Bold",
  title: "Now-Regular",
  latReg: "Lato-Regular",
  ailBold: "Aileron-Bold",
  ailReg: "Aileron-Regular",
};

// ---------- Types (data consumption stays the same) ----------
interface Experience {
  position?: string;
  company?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  description?: string;
}

interface Education {
  degree?: string;
  school?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  description?: string;
}

function isExperience(item: Experience | Education): item is Experience {
  return "position" in item || "company" in item;
}
const getItemTitle = (item: Experience | Education) =>
  isExperience(item) ? item.position : (item as Education).degree;
const getItemInstitution = (item: Experience | Education) =>
  isExperience(item) ? item.company : (item as Education).school;

// ---------- Props ----------
interface ResumeProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const SectionTitle = ({
  iconLabel,
  title,
}: {
  iconLabel: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full "
        style={{
          width: 30,
          height: 30,
          backgroundColor: COLORS.navy,
          lineHeight: 1,
        }}
        role="img"
        aria-label={title}
      >
        {iconLabel === "user" ? (
          <FaUserCircle
            style={{
              width: 30,
              height: 30,
              lineHeight: 1,
              color: COLORS.navy,
              background: "white",
            }}
          />
        ) : title === "WORK EXPERIENCE" ? (
          <ImBriefcase
            style={{
              width: 24,
              height: 24,
              lineHeight: 1,
              color: "white",
            }}
          />
        ) : title === "EDUCATION" ? (
          <FaGraduationCap
            style={{
              width: 24,
              height: 24,
              lineHeight: 1,
              color: "white",
            }}
          />
        ) : null}
      </span>

      <div className="flex-1 pl-5">
        <h3
          className="tracking-wide"
          style={{
            fontFamily: FONT.header,
            fontSize: ptToPx(14),
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </h3>
        <div className="border-t" style={{ borderColor: COLORS.line }} />
      </div>
    </div>
  );
};

const Timeline = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pl-6">
    <div
      className="absolute top-0 bottom-0"
      style={{ left: ptToPx(8), width: 1, background: COLORS.line }}
    />
    {children}
  </div>
);

// const TimelineDot = () => (
//   <span
//     className="absolute rounded-full bg-white"
//     style={{
//       top: ptToPx(6),
//       width: ptToPx(5),
//       height: ptToPx(5),
//       border: `1px solid ${COLORS.navy}`,
//       transform: "translateX(-50%)",
//       left: ptToPx(8),
//     }}
//   />
// );

// ---------- Sidebar atoms ----------
function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="pb-1 mb-2 border-b pt-10"
        style={{ borderColor: COLORS.line }}
      >
        <div
          className="uppercase"
          style={{
            fontFamily: FONT.header,
            fontSize: ptToPx(14),
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

function SidebarRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2" style={{ fontSize: ptToPx(10) }}>
      <span
        className="inline-flex items-center justify-center rounded-full shrink-0"
        style={{
          fontSize: ptToPx(10),
          fontFamily: FONT.latReg,
          lineHeight: 1,
          color: COLORS.navy,
          marginTop: 1,
        }}
      >
        {label === "phone" ? (
          <FaPhone size={16} />
        ) : label === "email" ? (
          <IoIosMail size={20} />
        ) : label === "address" ? (
          <FaLocationDot size={20} />
        ) : label === "website" ? (
          <FaGlobe size={16} />
        ) : null}
      </span>
      <span
        className="
    block
    min-w-0
    max-w-full
    whitespace-normal
    break-words
    [hyphens:auto]
    leading-snug
  "
        style={{ fontSize: ptToPx(10), fontFamily: "Lato, sans-serif" }}
      >
        {value}
      </span>
    </div>
  );
}

// ---------- Main ----------
const A4_WIDTH_PX = 794; // your renderer baseline
const HEADER_H = 160; // dark band height (px)
const SIDEBAR_FRAC = 0.32; // 34% grid
const AVATAR_PX = 180; // diameter of the avatar (px) — tweak to match mock

const ModernSidebarResume = ({
  resumeData,
  className,
  contentRef,
}: ResumeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: outerWidth } = useDimensions(containerRef);

  // Stable scale: render at fixed logical width then scale to fit container width.
  const scale = useMemo(
    () => (outerWidth ? outerWidth / A4_WIDTH_PX : 1),
    [outerWidth],
  );

  // Helpers
  const year = (d?: string | Date | null) =>
    d ? format(new Date(d), "yyyy") : "";
  const dateRange = (s?: string | Date | null, e?: string | Date | null) =>
    `${s ? year(s) : ""} - ${e ? year(e) : "PRESENT"}`;

  // Derived
  const experience = (resumeData.workExperiences ?? []) as Experience[];
  const education = (resumeData.educations ?? []) as Education[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const skills: string[] = ((resumeData as any).skills ?? []) as string[];

  const languages: { name: string | undefined; level: string | undefined }[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((resumeData as any).languages ?? []) as any[];

  const references: {
    name?: string;
    role?: string;
    company?: string;
    email?: string;
    phone?: string;
    note?: string;
  }[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((resumeData as any).references ?? []) as any[];

  // Sidebar geometry used to place avatar exactly like the mock
  const sidebarLeft = 0; // grid starts at 0 within the logical page
  const sidebarWidth = A4_WIDTH_PX * SIDEBAR_FRAC;
  const avatarLeft = sidebarLeft + sidebarWidth / 2 - AVATAR_PX / 2; // center in sidebar
  const avatarTop = HEADER_H - AVATAR_PX / 2; // overlap header by half

  return (
    <div
      className={cn("bg-white text-black w-full aspect-[210/297]", className)}
      ref={containerRef}
    >
      <div
        className={cn(
          "text-[10pt] h-full relative",
          !outerWidth && "invisible",
        )}
        style={{
          width: A4_WIDTH_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          color: COLORS.textDark,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* Top dark band */}
        <div style={{ height: HEADER_H, background: COLORS.navy }} />

        {/* Name & title (aligned to right column) */}
        <div
          className="absolute flex flex-col uppercase"
          style={{
            top: HEADER_H * 0.25,
            left: A4_WIDTH_PX * SIDEBAR_FRAC + ptToPx(60),
            right: ptToPx(24),
            color: "white",
          }}
        >
          <div
            style={{
              fontFamily: FONT.names,
              fontSize: ptToPx(27),
              letterSpacing: "0.02em",
            }}
          >
            {resumeData.firstName} {resumeData.lastName}
          </div>
          <div
            style={{
              fontFamily: FONT.title,
              fontSize: ptToPx(14.4),
              marginTop: ptToPx(2),
              opacity: 0.95,
            }}
          >
            {resumeData.jobTitle}
          </div>
        </div>

        {/* Avatar — positioned precisely like the mock */}
        {resumeData.photo && (
          <div
            className="absolute"
            style={{
              top: avatarTop,
              left: avatarLeft,
              width: AVATAR_PX,
              height: AVATAR_PX,
              borderRadius: "9999px",
              border: "6px solid white",
              //   boxShadow: `0 0 0 6px ${COLORS.slate}`,
              overflow: "hidden",
              background: "#FFFFFF",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resumeData.photo}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Two-column body */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `${SIDEBAR_FRAC * 100}% ${100 - SIDEBAR_FRAC * 100}%`,
            minHeight: 847,
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside style={{ background: COLORS.slate, height: "960px" }}>
            <div className="px-7 pb-8 pt-20">
              {/* CONTACT */}
              <SidebarBlock title="CONTACT">
                <div className="space-y-2">
                  {resumeData.phone && (
                    <SidebarRow label="phone" value={resumeData.phone} />
                  )}
                  {resumeData.email && (
                    <SidebarRow label="email" value={resumeData.email} />
                  )}
                  {(resumeData.city || resumeData.country) && (
                    <SidebarRow
                      label="address"
                      value={
                        resumeData.city && resumeData.country
                          ? `${resumeData.city}, ${resumeData.country}`
                          : (resumeData.city as string) ||
                            (resumeData.country as string)
                      }
                    />
                  )}
                  {resumeData.website && (
                    <SidebarRow label="website" value={resumeData.website} />
                  )}
                </div>
              </SidebarBlock>

              {/* SKILLS */}
              {!!skills.length && (
                <SidebarBlock title="SKILLS">
                  <ul className="space-y-[6px]">
                    {skills.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] inline-block w-[3px] h-[3px] rounded-full bg-gray-700" />
                        <span style={{ fontSize: ptToPx(10) }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </SidebarBlock>
              )}

              {/* LANGUAGES */}
              {!!languages.length && (
                <SidebarBlock title="LANGUAGES">
                  <ul className="space-y-[4px]">
                    {languages.map((l, i) => (
                      <li key={i} className="flex gap-2 text-[#323b4c]">
                        <span className="mt-[6px] inline-block w-[3px] h-[3px] rounded-full bg-[#323b4c]" />
                        <span
                          style={{
                            fontSize: ptToPx(10),
                            fontFamily: "Lato-Regular",
                          }}
                        >
                          {l?.name}
                        </span>
                        <span
                          style={{
                            fontSize: ptToPx(10),
                            fontFamily: "Lato-Regular",
                          }}
                        >
                          ({l?.level?.charAt(0)}
                          {l?.level?.toLocaleLowerCase().substring(1)})
                        </span>
                      </li>
                    ))}
                  </ul>
                </SidebarBlock>
              )}
              {/* Reference */}
              {!!references.length && (
                <SidebarBlock title="references">
                  <ul className="space-y-[6px]">
                    {references.map((s, i) => (
                      <li key={i} className="flex flex-col space-y-2">
                        <span
                          style={{
                            fontSize: ptToPx(11),
                            fontFamily: "Lato-Bold",
                          }}
                        >
                          {s?.name}
                        </span>
                        <span
                          style={{
                            fontSize: ptToPx(10),
                            fontFamily: "Lato-Regular",
                          }}
                        >
                          {s.company}/{s?.role}
                        </span>
                        {s.phone ? (
                          <span
                            style={{
                              fontSize: ptToPx(9),
                              fontFamily: "Lato-Regular",
                            }}
                          >
                            <span
                              style={{
                                fontSize: ptToPx(10),
                                fontFamily: "Lato-Bold",
                              }}
                            >
                              Phone:
                            </span>{" "}
                            {s.phone}
                          </span>
                        ) : null}
                        {s.email ? (
                          <span
                            style={{
                              fontSize: ptToPx(9),
                              fontFamily: "Lato-Regular",
                            }}
                            className="block
                            min-w-0
                            max-w-full
                            whitespace-normal
                            break-words
                            [hyphens:auto]
                            leading-snug"
                          >
                            <span
                              style={{
                                fontSize: ptToPx(10),
                                fontFamily: "Lato-Bold",
                              }}
                            >
                              Email:{" "}
                            </span>
                            {s.email}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </SidebarBlock>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="px-8 pb-8 pt-12 space-y-6 ">
            {/* PROFILE */}
            {resumeData.summary && (
              <section className="space-y-2">
                <SectionTitle iconLabel="user" title="PROFILE" />
                <Timeline>
                  <p
                    className="leading-relaxed pl-7"
                    style={{ fontSize: ptToPx(10), fontFamily: FONT.latReg }}
                  >
                    {String(resumeData.summary).trim()}
                  </p>
                </Timeline>
              </section>
            )}

            {/* WORK EXPERIENCE */}
            {!!experience.length && (
              <section className="space-y-3">
                <SectionTitle iconLabel="L" title="WORK EXPERIENCE" />
                <Timeline>
                  <div className="space-y-4">
                    {experience.map((item, idx) => {
                      const bullets = (item.description ?? "")
                        .split("•")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      return (
                        <div key={idx} className="relative pl-7">
                          {/* <TimelineDot /> */}
                          <div className="flex items-start justify-between gap-4">
                            <div
                              style={{
                                fontFamily: FONT.ailBold,
                                fontSize: ptToPx(11),
                              }}
                            >
                              {getItemInstitution(item) || ""}
                            </div>
                            <div
                              className="uppercase opacity-90"
                              style={{
                                fontSize: ptToPx(10),
                                whiteSpace: "nowrap",
                                fontFamily: FONT.ailReg,
                              }}
                            >
                              {dateRange(item.startDate, item.endDate)}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: ptToPx(11),
                              fontFamily: FONT.ailReg,
                            }}
                          >
                            {getItemTitle(item) || ""}
                          </div>
                          {!!bullets.length && (
                            <ul
                              className="mt-1 space-y-1"
                              style={{
                                fontSize: ptToPx(10),
                                fontFamily: FONT.ailReg,
                              }}
                            >
                              {bullets.map((line, i) => (
                                <li key={i} className="list-disc ml-5">
                                  {line}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Timeline>
              </section>
            )}

            {/* EDUCATION */}
            {!!education.length && (
              <section className="space-y-3">
                <SectionTitle iconLabel="E" title="EDUCATION" />
                <Timeline>
                  <div className="space-y-4">
                    {education.map((item, idx) => (
                      <div key={idx} className="relative pl-7">
                        {/* <TimelineDot /> */}
                        <div className="flex items-start justify-between gap-4">
                          <div
                            style={{
                              fontFamily: FONT.ailBold,
                              fontSize: ptToPx(11),
                            }}
                          >
                            {getItemTitle(item) || ""}
                          </div>
                          <div
                            className="uppercase"
                            style={{
                              fontSize: ptToPx(10),
                              whiteSpace: "nowrap",
                              fontFamily: FONT.ailReg,
                            }}
                          >
                            {dateRange(item.startDate, item.endDate)}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: ptToPx(11),
                            fontFamily: FONT.ailReg,
                          }}
                        >
                          {getItemInstitution(item) || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </Timeline>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModernSidebarResume;
