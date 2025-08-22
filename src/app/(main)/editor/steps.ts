import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import JobDescriptionForm from "./forms/JobDescriptionForm";
// import TemplateSelectorForm from "./forms/TemplateSelectorForm";
import CertificationForm from "./forms/CertificationForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  // {
  //   title: "Template selector",
  //   component: TemplateSelectorForm,
  //   key: "template-selector",
  // },
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  {
    title: "Job description",
    component: JobDescriptionForm,
    key: "job-description",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Certification",
    component: CertificationForm,
    key: "certification",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
