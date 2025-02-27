'use server'

import prisma from "@/lib/prisma";

export async function markResumeAsDownloaded(resumeId: string) {
  try {
    await prisma.resume.update({
      where: { id: resumeId },
      data: { downloaded: true },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating resume downloaded status:", error);
    return { success: false, error: "Failed to update resume status" };
  }
}