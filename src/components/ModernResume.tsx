import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef, useState } from "react";

interface ModernResumeProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const ModernResume = ({
  resumeData,
  className,
  contentRef,
}: ModernResumeProps) => {

  const totalCheckboxes = 5;
  const [checkedCount, setCheckedCount] = useState(2);

  const handleCheckboxChange = (index) => {
    if (index === checkedCount) {
      setCheckedCount((prev) => prev + 1);
    } else if (index === checkedCount - 1) {
      setCheckedCount((prev) => prev - 1);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    summary,
    skills,
    educations,
    workExperiences,
    projects,
    interests,
    photo,
    colorHex,
  } = resumeData;

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
        {/* Header */}
        <div className="pb-4 flex flex-col text-left">
          <h1 className="text-3xl font-bold uppercase mt-2 text-black text-left">
            {firstName} <span className="font-light">{lastName}</span>
          </h1>
          <div className="mt-2 text-sm text-gray-500">
            <span className="mr-2">
              Email: <span className="text-black">{email}</span>
            </span>{" "}
            |{" "}
            <span className="ml-2">
              Phone: <span className="text-black">{phone}</span>
            </span>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Profile
            </h2>
            <p className="text-lg mt-2 text-black">
              <span className="underline font-semibold">{jobTitle}</span>{" "}
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperiences?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Experience
            </h2>
            {workExperiences.map((exp, index) => (
              <div key={index} className="grid grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p>
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <ol className="list-disc">
                    {exp.description
                      ?.split("-")
                      .map((des, index) => des && <li key={index}>{des}</li>)}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Education
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="grid grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <p>
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mt-4">
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm">
                  {project.description}{" "}
                  {project.link && (
                    <a href={project.link} className="text-blue-500 underline">
                      View Project
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Skills
            </h2>
            <SkillsList skills={skills} color={colorHex}/>
          </div>
        )}

        {/* Interests */}
        {interests?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xl font-semibold pb-1"
              style={{ color: colorHex }}
            >
              Interests
            </h2>
            <p className="text-sm mt-2">{interests.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernResume;

export function SkillsList({ skills, color }) {
  return (
    <div className="flex flex-col mt-2 gap-2">
      {skills.map((skill, skillIndex) => (
        <SkillItem key={skillIndex} skill={skill} colorHex={color} />
      ))}
    </div>
  );
}

function SkillItem({ skill, colorHex }) {
  const totalCheckboxes = 5;
  const [checkedCount, setCheckedCount] = useState(2);

  const handleCheckboxChange = (index) => {
    if (index === checkedCount) {
      setCheckedCount((prev) => prev + 1);
    } else if (index === checkedCount - 1) {
      setCheckedCount((prev) => prev - 1);
    }
  };

  return (
    <span className="font-semibold flex justify-between">
      {skill}
      <div className="right flex gap-2">
        {Array.from({ length: totalCheckboxes }).map((_, index) => (
          <div key={index} className="flex items-center">
            <input
              id={`${skill}-${index}`}
              type="checkbox"
              className="hidden peer"
              checked={index < checkedCount}
              onChange={() => handleCheckboxChange(index)}
            />
            <label
              htmlFor={`${skill}-${index}`}
              className={`w-5 h-5 bg-blue-300 rounded-full peer-checked:bg-blue-500 cursor-pointer`}  
              style={{ background: colorHex }}
            ></label>
          </div>
        ))}
      </div>
    </span>
  );
}