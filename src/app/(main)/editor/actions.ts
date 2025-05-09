"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";

export async function saveResume(values: ResumeValues, aiUsed = false) {
  const { id } = values;

  const {
    photo,
    workExperiences,
    educations,
    certifications,
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();
  console.log(userId)
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // TODO: Check resume count for non-premium users

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photo${photo.name}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        checkoutId: null,
        paid: aiUsed ? (userId === "user_2t2ctUODvvFhRvqZU9GCbFZHyY8") : undefined,
        downloaded: false,
        downloadRequest: false,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          deleteMany: {},
          create: certifications?.map((cert) => ({
            ...cert,
            date: cert.date ? new Date(cert.date) : undefined,
          })),
        },
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        checkoutId: null,
        paid: true,
        downloadRequest: false,
        downloaded: false,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          create: certifications?.map((cert) => ({
            ...cert,
            date: cert.date ? new Date(cert.date) : undefined,
          })),
        },
      },
    });
  }
}
