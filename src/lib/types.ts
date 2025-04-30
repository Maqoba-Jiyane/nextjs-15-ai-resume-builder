import { Prisma } from "@prisma/client";
import {
  ResumeValues,
  UserDetailsValues,
} from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  personalDetails: UserDetailsValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  educations: true,
  workExperiences: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export interface PersonalDetailsFormProps {
  personalDetailsData: UserDetailsValues;
  setPersonalDetailsData: (data: UserDetailsValues) => void;
}

export const userDataInclude = {
  workExperiencePrompts: true,
  educations: true,
  resumes: true, // optional if needed for dashboard
} satisfies Prisma.UserInclude;

export type UserServerData = Prisma.UserGetPayload<{
  include: typeof userDataInclude;
}>;
