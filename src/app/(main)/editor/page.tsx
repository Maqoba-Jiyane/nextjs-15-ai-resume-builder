// app/(main)/editor/page.tsx (your Page component)
import type { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude, userDataInclude } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = { title: "Design your resume" };

async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId: clerkUserId },
        include: resumeDataInclude,
      })
    : null;

  const user = await prisma.user.findFirst({
    where: { userId: clerkUserId },
    include: userDataInclude,
  });
  if (!user) return null;

  const now = new Date();
  const effectivePlan: "FREE" | "PREMIUM" =
    user.plan === "PREMIUM" && (!user.premiumUntil || user.premiumUntil > now)
      ? "PREMIUM"
      : "FREE";

  return (
    <ResumeEditor
      resumeToEdit={resumeToEdit}
      personalInfoDetailsToAssign={user}
      plan={effectivePlan}
      premiumUntil={user.premiumUntil ?? null}
    />
  );
}

export default Page;
