import React, { useRef } from "react";
import { ptToPx } from "@/lib/utils/common-functions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { GiRotaryPhone } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { IoIosPin } from "react-icons/io";

/** ----------------------------------------------------------------
 * DarkBlueFrameResume
 * Exactly matches the “Dark Blue Frame Minimalist Resume” reference.
 * A4 canvas (794×1122 @96dpi), two-column with left navy sidebar.
 * ---------------------------------------------------------------- */

type Props = {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
};

/* --- Palette from reference (no new colors) --- */
const C = {
  navy: "#1E2D46", // frame + sidebar
  text: "#2B2B2B",
  subtext: "#545454",
  rule: "#D1D5DB", // light gray dividers
  white: "#FFFFFF",
  dot: "#D1D5DB",
};

/* --- Utilities (null-safe) --- */
const safe = (v?: string | null) => (v ?? "").trim();
const notEmpty = (v?: string | null) => safe(v).length > 0;

const year = (d?: string | Date | null) => {
  if (!d) return "";
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    const y = dt.getFullYear();
    return Number.isFinite(y) ? String(y) : safe(String(d));
  } catch {
    return safe(String(d));
  }
};
const periodYYYY = (
  start?: string | Date | null,
  end?: string | Date | null,
) => {
  const s = year(start);
  const e = year(end);
  if (s && e) return `${s} – ${e}`;
  if (s && !e) return `${s} – PRESENT`;
  return "";
};

/* --- Section title component (uppercase, letterspace, rule below) --- */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="mb-[6px]">
    <h2
      className="uppercase font-semibold"
      style={{
        fontSize: ptToPx(16),
        letterSpacing: "0.04em",
        color: C.navy,
        fontFamily: "Lora-Bold",
      }}
    >
      {children}
    </h2>
    <Divider />
  </div>
);

const LeftBullet: React.FC = () => (
  <span
    aria-hidden
    className="inline-block rounded-full mr-3 translate-y-[1px]"
    style={{
      width: 6,
      height: 6,
      backgroundColor: C.white,
      border: "1px solid rgba(255,255,255,0.35)",
    }}
  />
);

const Divider = () => (
  <div className="h-[2px] w-full" style={{ backgroundColor: C.navy }} />
);

const DarkBlueFrame: React.FC<Props> = ({
  resumeData,
  className,
  contentRef,
}) => {
  const {
    firstName,
    lastName,
    jobTitle,
    summary,
    phone,
    email,
    website,
    city,
    country,
    workExperiences = [],
    educations = [],
    skills = [],
    languages = [],
    references = [],
  } = (resumeData || {}) as ResumeValues;

  const fullName = `${safe(firstName)} ${safe(lastName)}`.trim();
  const addressLine =
    notEmpty(resumeData.city) || notEmpty(city) || notEmpty(country)
      ? [
          safe(resumeData.country) || undefined,
          safe(city) || undefined,
          safe(country) || undefined,
        ]
          .filter(Boolean)
          .join(", ")
      : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Normalized icon wrapper
  const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span
      className="flex-none inline-flex items-center justify-center
                     w-[20px] h-[20px] mt-[2px]
                     print:w-[22px] print:h-[22px]"
    >
      {/* make the svg fill the box */}
      
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {React.cloneElement(children as any, { className: "w-full h-full" })}
    </span>
  );

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
        {/* Outer frame */}
        <div
          className="m-5 md:m-6 w-full h-[210/297] box-border"
          style={{ border: `8px solid ${C.navy}` }}
        >
          {/* Header */}
          <header className="px-8 pt-8 pb-6 text-center">
            <h1
              className="uppercase font-bold"
              style={{
                // Display serif to match look; swap for your exact font if available.
                fontFamily: "Lora-Bold",
                color: C.navy,
                fontSize: ptToPx(36),
                letterSpacing: "0.04em",
              }}
            >
              {fullName}
            </h1>
            <p
              className="mt-2 uppercase tracking-[0.24em]"
              style={{
                color: C.subtext,
                fontSize: ptToPx(15),
                fontFamily: "Poppins-Bold",
              }}
            >
              {safe(jobTitle)}
            </p>
          </header>
          <div className="px-4 ">
            <Divider />
          </div>

          {/* Body: two columns */}
          <div className="flex gap-6 px-4 pb-6">
            {/* LEFT SIDEBAR */}
            <aside
              className="basis-[40%] flex-none p-6 space-y-6 h-full min-h-[890px] max-h-[890px] overflow-hidden"
              style={{ backgroundColor: C.navy, color: C.white }}
              aria-label="Profile sidebar"
            >
              {/* ABOUT ME */}
              {summary && summary.trim() ? (
                <section className="space-y-2 pt-4">
                  <h2
                    className="uppercase"
                    style={{
                      fontSize: ptToPx(16),
                      letterSpacing: "0.02em",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    About Me
                  </h2>
                  <p
                    className="opacity-90"
                    style={{
                      fontSize: ptToPx(9),
                      lineHeight: 1.6,
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {summary}
                  </p>
                </section>
              ) : null}

              {/* CONTACT */}
              {(notEmpty(phone) ||
                notEmpty(email) ||
                notEmpty(website) ||
                notEmpty(addressLine)) && (
                <section className="space-y-2 pt-4">
                  <h2
                    className="uppercase font-semibold"
                    style={{
                      fontSize: ptToPx(16),
                      letterSpacing: "0.02em",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    Contact
                  </h2>
                  <ul
                    className="space-y-3"
                    style={{
                      fontSize: ptToPx(10),
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {notEmpty(phone) && (
                      <li className="flex items-start gap-3">
                        <IconBox>
                          <GiRotaryPhone />
                        </IconBox>
                        <span className="min-w-0 leading-[1.6] break-words">
                          {safe(phone)}
                        </span>
                      </li>
                    )}

                    {notEmpty(email) && (
                      <li className="flex items-start gap-3">
                        <IconBox>
                          <MdEmail />
                        </IconBox>
                        <a
                          href={`mailto:${safe(email)}`}
                          className="min-w-0 leading-[1.6] underline-offset-2 hover:underline break-all"
                        >
                          {safe(email)}
                        </a>
                      </li>
                    )}

                    {notEmpty(website) && (
                      <li className="flex items-start gap-3">
                        <IconBox>
                          <IoIosGlobe />
                        </IconBox>
                        <span className="min-w-0 leading-[1.6] break-all">
                          {safe(website).replace(/^https?:\/\//, "")}
                        </span>
                      </li>
                    )}

                    {notEmpty(addressLine) && (
                      <li className="flex items-start gap-3">
                        <IconBox>
                          <IoIosPin />
                        </IconBox>
                        <span className="min-w-0 leading-[1.6] break-words">
                          {addressLine}
                        </span>
                      </li>
                    )}
                  </ul>
                </section>
              )}

              {/* SKILLS */}
              {skills?.length ? (
                <section className="space-y-2 pt-4">
                  <h2
                    className="uppercase font-semibold"
                    style={{
                      fontSize: ptToPx(16),
                      letterSpacing: "0.02em",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    Skills
                  </h2>
                  <ul
                    className="space-y-2"
                    style={{
                      fontSize: ptToPx(11),
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {skills.slice(0, 5).map((s: string, i: number) => (
                      <li key={`${s}-${i}`} className="flex items-start">
                        <LeftBullet />
                        <span className="-translate-y-[1px]">{s}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* LANGUAGE */}
              {languages?.length ? (
                <section className="space-y-2 pt-4">
                  <h2
                    className="uppercase"
                    style={{
                      fontSize: ptToPx(16),
                      letterSpacing: "0.02em",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    Language
                  </h2>
                  <ul
                    className="space-y-1"
                    style={{
                      fontSize: ptToPx(11),
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                    {languages.map((l: any, i: number) => {
                      const label = typeof l === "string" ? l : l?.name || "";
                      if (!label) return null;
                      return (
                        <li key={`${label}-${i}`} className="flex items-start">
                          <LeftBullet />
                          <span className="-translate-y-[1px]">{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}
            </aside>

            {/* RIGHT COLUMN */}
            <main
              className="basis-[60%] flex-1 min-w-0 pt-10 max-h-[890px] overflow-hidden pr-2"
              aria-label="Main content"
            >
              {/* WORK EXPERIENCE */}
              {workExperiences?.length ? (
                <section className="mb-6 break-inside-avoid">
                  <SectionTitle>Work Experience</SectionTitle>
                  <ul className="space-y-5">
                    {workExperiences.map((w, i) => {
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                      const role = safe((w as any)?.position);
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                      const company = safe((w as any)?.company);
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                      const para = safe((w as any)?.description);
                      const when = periodYYYY(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (w as any)?.startDate,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (w as any)?.endDate,
                      );
                      return (
                        <li
                          key={`${company}-${role}-${i}`}
                          className="break-inside-avoid"
                          style={{ color: "#2e2e2e" }}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <p
                              style={{
                                fontFamily: "Poppins-Bold",
                                fontSize: ptToPx(12),
                              }}
                            >
                              {role}
                            </p>
                            <span
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(10),
                              }}
                            >
                              {when}
                            </span>
                          </div>
                          {company && (
                            <p
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(10),
                              }}
                            >
                              {company}
                            </p>
                          )}
                          {para && (
                            <p
                              className="mt-1"
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(9),
                              }}
                            >
                              {para.replace("• ", "").replaceAll("• ", " ")}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}

              {/* EDUCATION */}
              {educations?.length ? (
                <section
                  className="mb-6 break-inside-avoid"
                  style={{ fontFamily: "Lora-Bold", fontSize: ptToPx(16) }}
                >
                  <SectionTitle>Education</SectionTitle>
                  <ul className="space-y-4">
                    {educations.map((e, i) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const school = safe((e as any)?.school);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const degree = safe((e as any)?.degree);
                      const when = periodYYYY(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (e as any)?.startDate,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (e as any)?.endDate,
                      );
                      return (
                        <li
                          key={`${school}-${i}`}
                          className="break-inside-avoid"
                          style={{ color: "#2e2e2e" }}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <p
                              style={{
                                fontFamily: "Poppins-Bold",
                                fontSize: ptToPx(12),
                              }}
                            >
                              {school}
                            </p>
                            <span
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(10),
                              }}
                            >
                              {when}
                            </span>
                          </div>
                          {degree && (
                            <p
                              className="font-semibold"
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(10),
                              }}
                            >
                              {degree}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}

              {/* REFERENCES */}
              {references?.length ? (
                <section
                  className="break-inside-avoid"
                  style={{ fontFamily: "Lora-Bold", fontSize: ptToPx(16) }}
                >
                  <SectionTitle>References</SectionTitle>
                  <div className="grid grid-cols-2 gap-6">
                    {references.map((r, i) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const name = safe((r as any)?.name);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const company = safe((r as any)?.company);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const role = safe((r as any)?.role);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const phoneRef = safe((r as any)?.phone);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const emailRef = safe((r as any)?.email);
                      return (
                        <div key={`${name}-${i}`} style={{ color: "#2e2e2e" }}>
                          {name && (
                            <p
                              style={{
                                fontFamily: "Poppins-Bold",
                                fontSize: ptToPx(12),
                              }}
                            >
                              {name}
                            </p>
                          )}
                          {(company || role) && (
                            <p
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: ptToPx(10),
                              }}
                            >
                              {[company, role].filter(Boolean).join(" / ")}
                            </p>
                          )}
                          {phoneRef && (
                            <p className="text-[11.75px]">
                              <span
                                style={{
                                  fontFamily: "Poppins-Bold",
                                  fontSize: ptToPx(7),
                                }}
                              >
                                Phone:
                              </span>{" "}
                              <span
                                style={{
                                  fontFamily: "Poppins-Regular",
                                  fontSize: ptToPx(8),
                                }}
                              >
                                {phoneRef}
                              </span>
                            </p>
                          )}
                          {emailRef && (
                            <p className="flex items-baseline gap-1 text-[11.75px]">
                              <span
                                style={{
                                  fontFamily: "Poppins-Bold",
                                  fontSize: ptToPx(7),
                                }}
                              >
                                Email:
                              </span>
                              <span
                                className="min-w-0 break-all"
                                style={{
                                  fontFamily: "Poppins-Regular",
                                  fontSize: ptToPx(8),
                                }}
                              >
                                {emailRef}
                              </span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </main>
          </div>
        </div>

        {/* Print rules (keep items together / A4) */}
        <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
          .aspect-[794/1122] { aspect-ratio: auto; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      </div>
    </div>
  );
};

export default DarkBlueFrame;
