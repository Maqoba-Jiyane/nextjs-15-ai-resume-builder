import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const optionalDate = z.union([z.date(), z.string().pipe(z.coerce.date())]).optional();

export const templateSelectorSchema = z.object({
  template: optionalString,
});

export type TemplateSelectorValues = z.infer<typeof templateSelectorSchema>;

export const generateInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generateInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ).optional(),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
  website: optionalString,
  linkedin: optionalString,
  github: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        location: optionalString,
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        isCurrent: z.boolean().optional(),
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
export type WorkExperience = NonNullable<z.infer<typeof workExperienceSchema>['workExperiences']>[number];

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        fieldOfStudy: optionalString,
        location: optionalString,
        startDate: optionalDate,
        endDate: optionalDate,
        isCurrent: z.boolean().optional(),
        description: optionalString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;
export type Education = NonNullable<z.infer<typeof educationSchema>['educations']>[number];

export const certificationSchema = z.object({
  certifications: z
    .array(
      z.object({
        name: optionalString,
        issuer: optionalString,
        date: optionalDate,
        credentialUrl: optionalString,
      }),
    )
    .optional(),
});

export type CertificationValues = z.infer<typeof certificationSchema>;
export type Certification = NonNullable<z.infer<typeof certificationSchema>['certifications']>[number];

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

export const languagesSchema = z.object({
  languages: z.array(z.string().trim()).optional(),
});

export type LanguagesValues = z.infer<typeof languagesSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const jobDescriptionSchema = z.object({
  jobDescription: optionalString,
});

export type JobDescriptionValues = z.infer<typeof jobDescriptionSchema>;

export const appearanceSchema = z.object({
  colorHex: optionalString,
  borderStyle: optionalString,
  template: optionalString,
});

export type AppearanceValues = z.infer<typeof appearanceSchema>;

export const resumeSchema = z.object({
  ...generateInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...certificationSchema.shape,
  ...skillsSchema.shape,
  ...languagesSchema.shape,
  ...summarySchema.shape,
  ...jobDescriptionSchema.shape,
  ...appearanceSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<typeof generateWorkExperienceSchema>;

export const analyzeResumeSchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...jobDescriptionSchema.shape,
  ...summarySchema.shape
});

export type AnalyzeResumeInput = z.infer<typeof analyzeResumeSchema>;

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  jobDescription: optionalString
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateSkillsSchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
});

export type GenerateSkillsInput = z.infer<typeof generateSkillsSchema>;

export const workExperiencePromptSchema = z.object({
  prompts: z
  .array(
    z.object({
      title: optionalString,
      prompt: optionalString,
    }),
  )
  .optional(),
});

export type WorkExperiencePromptValues = z.infer<typeof workExperiencePromptSchema>;

export const userEducationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        fieldOfStudy: optionalString,
        location: optionalString,
        startDate: optionalDate,
        endDate: optionalDate,
        isCurrent: z.boolean().optional(),
        description: optionalString,
      }),
    )
    .optional(),
});

export type UserEducationValues = z.infer<typeof userEducationSchema>;

export const userDetailsSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  phone: optionalString,
  city: optionalString,
  country: optionalString,
  website: optionalString,
  linkedin: optionalString,
  github: optionalString,
  email: optionalString, // from auth or editable
  ...workExperiencePromptSchema.shape,
  ...userEducationSchema.shape
});

export type UserDetailsValues =Omit<z.infer<typeof userDetailsSchema>, "photo"> & {
  id?: string;
  photo?: File | undefined;
};