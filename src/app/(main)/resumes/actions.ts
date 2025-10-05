"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getUserPlan, canCreateResume } from "@/lib/billing";

const deleteResume = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  console.log('Delete: ', id)

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  revalidatePath("/resumes");
};

export default deleteResume;

export async function updateResumeForPayment(resumeId:string | undefined, checkoutId: string) {

  console.log("resumeId: ", resumeId)

  if(!resumeId || !checkoutId) return
  await prisma.resume.update({
    where: { id : resumeId},
    data: {
      checkoutId: checkoutId
    }
  })
}

export async function createResumeAction() {
  const { userId } = await auth();
  if (!userId) return { ok: false as const, code: "UNAUTHORIZED", message: "Sign in required." };

  const [plan, count] = await Promise.all([
    getUserPlan(userId),
    prisma.resume.count({ where: { userId } }),
  ]);

  if (!canCreateResume(count, plan)) {
    // return count so the dialog can display it
    return {
      ok: false as const,
      code: "LIMIT_REACHED" as const,
      totalCount: count,
      message: "Free plan allows 1 resume. Upgrade or delete an existing one.",
    };
  }

  return { ok: true};
}
