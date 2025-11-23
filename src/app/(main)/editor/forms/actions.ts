"use server";

import openai from "@/lib/openai";
import prisma from "@/lib/prisma";
import {
  AnalyzeResumeInput,
  analyzeResumeSchema,
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block non-prremium users

  const { jobTitle, workExperiences, educations, skills, jobDescription } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a resume summary writer AI. Your task is to write a short, professional introduction summary for a resume using SMART-based language.

Guidelines:
- Only return the summary — no labels or formatting.
- Use the SMART framework: Highlight Specific accomplishments, Measurable results, Achievable outcomes, Relevant experience, and Time-bound wins.
- Begin with the user's professional title and years of experience.
- Match the job description when provided, aligning the summary with its requirements.
- Focus on real accomplishments from the user’s work history and education — no assumptions.
- Keep the summary concise (3–5 lines), professional, and results-focused.`;

  const userMessage = `Please generate a professional resume summary from this data:

Job title: ${jobTitle || "N/A"}

Work experience:
${workExperiences
  ?.map(
    (
      exp,
    ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
Description: ${exp.description || "N/A"}`,
  )
  .join("\n\n")}

Education:
${educations
  ?.map(
    (edu) =>
      `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
  )
  .join("\n\n")}

Skills:
${skills}

Job Description: ${jobDescription || "N/A"}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response.");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  //TODO: Block for non-premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `You are a job resume generator AI. Your task is to generate a single work experience entry based strictly on the user input.

Structure your response exactly as follows (omit fields if they cannot be inferred from the input, but do NOT add new ones):

Job title: <job title>
Company: <company name>
Start date: <format: YYYY-MM-DD> (only if provided)
End date: <format: YYYY-MM-DD> (only if provided)
Description: 
• Each bullet must be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound
• Focus on real achievements, metrics, and impact when possible
• Do not make up unverifiable claims
• Limit to 3–5 bullet points maximum
• Use concise, professional language suitable for a resume

Example:
Description:
• Increased customer retention by 15% in 6 months by launching a proactive follow-up campaign
• Reduced onboarding time by 20% by streamlining internal training processes
`;

  const userMessage = `Please provide a SMART-based work experience entry based on this description: ${description}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response.");
  }

  // Extract matched values
  const position = aiResponse.match(/Job title:\s*(.*)/)?.[1] || "";
  const company = aiResponse.match(/Company:\s*(.*)/)?.[1] || "";
  const descriptionText = (
    aiResponse.match(/Description:\s*([\s\S]*)/)?.[1] || ""
  ).trim();
  const startDateStr = aiResponse.match(
    /Start date:\s*(\d{4}-\d{2}-\d{2})/,
  )?.[1];
  const endDateStr = aiResponse.match(/End date:\s*(\d{4}-\d{2}-\d{2})/)?.[1];

  // Convert date strings to Date objects if they exist
  const startDate = startDateStr ? new Date(startDateStr) : undefined;
  const endDate = endDateStr ? new Date(endDateStr) : undefined;

  console.log(descriptionText);

  return {
    position,
    company,
    description: descriptionText,
    startDate,
    endDate,
  } satisfies WorkExperience;
}

export async function generateSkills(input: GenerateSummaryInput) {
  // TODO: Block non-prremium users

  const { jobTitle, workExperiences, educations, jobDescription } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a resume optimization AI. Your role is to generate a concise, comma-separated list of professional hard and soft skills based on the user's experience and education. Follow these instructions:

- Only return skills — no explanations, headings, or bullet points.
- If a job description is provided, extract only the **skills relevant to that role**.
- Skills must align with the user’s **work experience, education, or certifications** — do not assume or invent unrelated skills.
- When possible, infer skills using the SMART framework: skills that demonstrate Specific, Measurable, Achievable, Relevant, and Time-bound aspects from the user's achievements or tasks.
- Keep it professional, ATS-friendly, and job-relevant.`;

  const userMessage = `Please generate skills for the resume from this data:
Job title: ${jobTitle || "N/A"}

Job description: ${jobDescription || "N/A"}

Work experience:
${workExperiences
  ?.map(
    (
      exp,
    ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
Description: ${exp.description || "N/A"}`,
  )
  .join("\n\n")}

Education:
${educations
  ?.map(
    (edu) =>
      `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
  )
  .join("\n\n")}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response.");
  }

  return aiResponse;
}

export async function analyzeResume(input: AnalyzeResumeInput) {
  try {
    // Validate and parse the input based on the schema
    const {
      jobTitle,
      workExperiences,
      educations,
      skills,
      jobDescription,
      summary,
    } = analyzeResumeSchema.parse(input);

    // System Message: Instructions for the AI to process and analyze the job data.
    const systemMessage = `
I want you to act as an Applicant Tracking System (ATS). Your task is to analyze the following candidate's resume data and compare it against a provided job description. Here's how you should evaluate the data:

1. **Keyword Matching**: Compare the provided data against the job description for relevant keywords, including technical skills, soft skills, and qualifications mentioned in the job posting.
2. **Experience Relevance**: Compare the candidate’s work experience to the job description. Focus on key areas like job responsibilities, achievements, and transferable skills.
3. **Skills Match**: Evaluate how well the candidate’s skills align with the job description. Look for matching technical or soft skills.
4. **Education and Certifications**: Compare the candidate’s education and certifications against the job requirements. Highlight any mismatches or missing qualifications.
5. **ATS Compatibility**: Evaluate how well the data aligns with ATS systems, ensuring it is well-structured and aligned with job description criteria.
6. **Overall Score**: Average of how well the resume fits the job requirements.

### Conditions:
- **If the provided data has not changed since the last analysis**, simply return the same response that was previously given, without re-analyzing or recalculating the data.
- **If any data has changed**, perform the analysis again and provide the updated result.

Once you perform the analysis, provide:
- A score out of 100 based on how well the data matches the job description.
- A breakdown of the match percentage for each section (e.g., Skills match, Experience match, etc.).
- A list of recommendations to improve the data for better ATS compatibility.

Use your knowledge of best practices in ATS algorithms and resume optimization to give a thorough analysis. Keep it concise and professional.

`;

    // User Message: Request to compare the job description to the resume data (passed in the form of specific data attributes).
    const userMessage = `
  Compare the following job description to the provided candidate data to check how well it matches. Please return only a JSON object with the following structure. Each section should contain a "score", "analysis", and "improvements" (if applicable). If there are no improvements, return an empty array "[]".

**Job Description:** ${jobDescription?.trim() || "N/A"}

**Candidate Data:**
- jobTitle: ${jobTitle || "N/A"}
- workExperiences: ${workExperiences || "N/A"}
- educations: ${educations || "N/A"}
- skills: ${skills || "N/A"}
- summary: ${summary || "N/A"}

  The JSON structure should look like this:

  {
    "overall_score": <overall_score>,
    "keywords_match": {
      "score": <score>,
      "analysis": "<analysis>",
      "improvements": ["<improvement1>", "<improvement2>", ...]
    },
    "experience_match": {
      "score": <score>,
      "analysis": "<analysis>",
      "improvements": ["<improvement1>", "<improvement2>", ...]
    },
    "education_match": {
      "score": <score>,
      "analysis": "<analysis>",
      "improvements": ["<improvement1>", "<improvement2>", ...]
    },
    "skills_match": {
      "score": <score>,
      "analysis": "<analysis>",
      "improvements": ["<improvement1>", "<improvement2>", ...]
    },
    "ats_compatibility": {
      "score": <score>,
      "analysis": "<analysis>",
      "improvements": ["<improvement1>", "<improvement2>", ...]
    }
  }

  Make sure to include all sections, even if there are no improvements. If no improvements are necessary, return an empty array "[]".

  If no job description has been provided, do not do the comparison, simply let the user know.

  Only return the JSON object and no extra text.
`;
    // Request AI completion from OpenAI's GPT model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Extract AI response
    const aiResponse = completion.choices[0].message.content;

    // Check for valid response
    if (!aiResponse) {
      throw new Error("Failed to generate AI response.");
    }

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("Error analyzing resume: ", error);
    throw new Error("An error occurred while analyzing the resume.");
  }
}

export async function getPromptsFromDB() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");
  return prisma.workExperiencePrompt.findMany({ where: { userId } });
}

export async function addOrUpdateWorkExperience(
  experiences: WorkExperience[],
  resumeId: string,
) {
  console.log(resumeId);
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    // Sanity check (optional): Ensure resumeId exists
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) throw new Error("Resume not found");

    // Proceed to update
    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        workExperiences: {
          deleteMany: {}, // Clear previous
          create: experiences.map((exp) => ({
            position: exp.position || null,
            company: exp.company || null,
            location: exp.location || null,
            startDate: exp.startDate ?? undefined,
            endDate: exp.endDate ?? undefined,
            isCurrent: exp.isCurrent ?? false,
            description: exp.description || null,
          })),
        },
      },
    });

    return updatedResume;
  } catch (error) {
    // console.error("Failed to update work experiences:", error);

    // Optional: Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.name === "P2025") {
        throw new Error("Resume not found or already deleted");
      }

      throw new Error(
        error.message ||
          "An unexpected error occurred while updating work experiences",
      );
    }
  }
}

export async function addOrUpdateSummary(summary: string, resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");

  return prisma.resume.update({
    where: { id: resumeId },
    data: { summary },
  });
}

export async function addOrUpdateSkills(skills: string[], resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");

  return prisma.resume.update({
    where: { id: resumeId },
    data: { skills },
  });
}