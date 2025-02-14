"use server";

import openai from "@/lib/openai";
import { GenerateSummaryInput, generateSummarySchema, GenerateWorkExperienceInput, generateWorkExperienceSchema, WorkExperience } from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block non-prremium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data. Only return the summary and do not include any other information in the response. Keep it concise and professional.`;

  const userMessage = `Please generate a professional resume summary from this data:
    Job title: ${jobTitle || "N/A"}
    Work experience: ${workExperiences
      ?.map(
        (
          exp,
        ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        Description: ${exp.description || "N/A"}`,
      )
      .join("\n\n")}
      
    Education: ${educations
      ?.map(
        (edu) =>
          `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
      )
      .join("\n\n")}
      
      Skills:
      ${skills}`;

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


export async function generateWorkExperience(input:GenerateWorkExperienceInput) {
    //TODO: Block for non-premium users

    const {description} = generateWorkExperienceSchema.parse(input)

    const systemMessage = `You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input. Your response must adhere to the following structure. You can omit fields if they can't be infered from the provided data, but don't add new ones.
    
    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD>(only if provided)
    End date: <format: YYYY-MM-DD>(only if provided)
    Description: <an optimised description in bullet format, might be infered from the job title>
    `;

    const userMessage = `Please provide a work experience entry from this descriptio: ${description}`


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
    
      return {
        position: aiResponse.match(/Job title:\s*(.*)/)?.[1] || "",
        company: aiResponse.match(/Company:\s*(.*)/)?.[1] || "",
        description: (aiResponse.match(/Description:\s*([\s\S]*)/)?.[1] || "").trim(),
        startDate: aiResponse.match(/Start date:\s*(\d{4}-\d{2}-\d{2})/)?.[1],
        endDate: aiResponse.match(/End date:\s*(\d{4}-\d{2}-\d{2})/)?.[1],
      } satisfies WorkExperience;
}

export async function generateSkills(input: GenerateSummaryInput) {
  // TODO: Block non-prremium users

  const { jobTitle, workExperiences, educations } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a job resume generator AI. Your task is to generate skills that are comma separated from the user's provided data. Only return the skills and do not include any other information in the response. Keep it concise and professional.`;

  const userMessage = `Please generate skills for the resume from this data:
    Job title: ${jobTitle || "N/A"}
    Work experience: ${workExperiences
      ?.map(
        (
          exp,
        ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        Description: ${exp.description || "N/A"}`,
      )
      .join("\n\n")}
      
    Education: ${educations
      ?.map(
        (edu) =>
          `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
      )
      .join("\n\n")}`;

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