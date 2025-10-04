import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData, UserServerData } from "./types";
import { ResumeValues, UserDetailsValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    website: data.website || undefined,
    github: data.github || undefined,
    linkedin: data.linkedin || undefined,
    jobDescription: data.jobDescription || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate ? new Date(exp.startDate) : undefined,
      endDate: exp.endDate ? new Date(exp.endDate) : undefined,
      description: exp.description || undefined,
      location: exp.location || undefined,
      isCurrent: exp.isCurrent || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate ? new Date(edu.startDate) : undefined,
      endDate: edu.endDate ? new Date(edu.endDate) : undefined,
    })),
    certifications: data.certifications.map((cert) => ({
      name: cert.name || undefined,
      issuer: cert.issuer || undefined,
      credentialUrl: cert.credentialUrl || undefined,
      date: cert.date || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
    template: data.template,
    languages: data.languages.map((lan) => ({
      name: lan.name || undefined,
      level: lan.level || undefined
    })),
    references: data.references.map((ref) => ({
      name: ref.name || undefined,
      role: ref.role || undefined,
      company: ref.company || undefined,
      email: ref.email || undefined,
      phone: ref.phone || undefined,
      note: ref.note || undefined,
    })),
  };
}

export function mapToUserDetailsValues(
  data: UserServerData,
): UserDetailsValues {
  return {
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    phone: data.phone || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    website: data.website || undefined,
    linkedin: data.linkedin || undefined,
    github: data.github || undefined,
    email: data.email || undefined, // guaranteed by schema
    prompts: data.workExperiencePrompts.map((prop) => ({
      prompt: prop.prompt || undefined,
      title: prop.title || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      description: edu.description || undefined,
      startDate: edu.startDate ? new Date(edu.startDate) : undefined,
      endDate: edu.endDate ? new Date(edu.endDate) : undefined,
    })),
  };
}
