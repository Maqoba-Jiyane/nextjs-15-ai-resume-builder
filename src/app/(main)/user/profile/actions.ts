"use server";

import prisma from "@/lib/prisma";
import { userDetailsSchema, UserDetailsValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";

export async function savePersonalDetails(values: UserDetailsValues) {
  const { photo, prompts, educations, ...personalDetailsValues } = userDetailsSchema.parse(values);


  const authData = await auth();
  const userId = authData?.userId;
  console.log(userId)
  if (!userId) {
    throw new Error("User not authenticated");
  }

  let existingUser = await prisma.user.findUnique({ where: { userId } });

  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        userId, 
      },
    });
  }

  let newPhotoUrl: string | null | undefined = undefined;

  if (photo instanceof File) {
    if (existingUser.image) {
      await del(existingUser.image);
    }

    const blob = await put(`user_photo_${photo.name}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingUser.image) {
      await del(existingUser.image);
    }

    newPhotoUrl = null;
  }

  const updatedUser = await prisma.user.update({
    where: { userId },
    data: {
      ...personalDetailsValues,
      image: newPhotoUrl ?? existingUser.image,
      workExperiencePrompts: {
        deleteMany: {},
        create: prompts?.map((prompt) => ({
          ...prompt,
          title: prompt.title || undefined,
          prompt: prompt.prompt || undefined
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
    },
  });

  return updatedUser;
}
