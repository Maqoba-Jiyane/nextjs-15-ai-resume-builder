import { TemplateMeta } from "./template.types";

// templates.ts
export const BLUE_CREATIVE_RESUME: TemplateMeta = {
  id: "blue-creative-resume",
  name: "Blue Creative Resume",
  previewImage: "/assets/templates/BlueCreativeResume.png",
  description: "High graphics format",
  tier: "premium",
  type: "Graphic",

  layout: "two-column",
  columns: 2,
  industries: ["Design", "Marketing", "Creative", "Developer", "Engineering"],
  tags: ["modern", "graphic", "blue", "two-column", "creative"],
  photoSupport: false,
  multiPage: false,
  version: "1.0.0",
};

export const CLASSIC_RESUME: TemplateMeta = {
  id: "classic",
  name: "Classic",
  previewImage: "/assets/templates/Classic.jpg",
  description: "Traditional professional layout",
  tier: "free",
  type: "Minimal",

  layout: "one-column",
  columns: 1,
  industries: ["Retail", "Security", "Admin"],
  tags: ["one-column", "multi-color"],
  photoSupport: true,
  multiPage: true,
  version: "1.0.0",
};

export const CLASSIC_RESUME_RICH: TemplateMeta = {
  id: "classic-resume-rich",
  name: "Classic Rich",
  previewImage: "/assets/templates/ClassicResumeRich.png",
  description: "High graphics format",
  tier: "free",
  type: "Graphic",

  layout: "two-column",
  columns: 2,
  industries: ["Design", "Marketing", "Creative"],
  tags: ["modern", "graphic", "blue", "two-column", "creative"],
  photoSupport: true,
  multiPage: false,
  version: "1.0.0",
};

export const SCIENCE_AND_ENGINEERING: TemplateMeta = {
  id: "science-engineering-resume",
  name: "Science And Engineering",
  previewImage: "/assets/templates/ScienceEngineeringResume.png",
  description: "Minimal",
  tier: "free",
  type: "Minimal",

  layout: "two-column",
  columns: 2,
  industries: ["Science", "Engineering", "Healthcare", "Energy", "Information Technology"],
  tags: ["modern", "two-column"],
  photoSupport: false,
  multiPage: true,
  version: "1.0.0",
};
