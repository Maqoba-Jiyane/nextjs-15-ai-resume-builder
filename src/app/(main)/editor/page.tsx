import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude, userDataInclude } from "@/lib/types";

interface PageProps {
  searchParams: { resumeId?: string };
}

export const metadata: Metadata = {
  title: "Design your resume",
};

async function Page({ searchParams }: PageProps) {
  const { resumeId } = searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: resumeDataInclude,
      })
    : null;

  const userDataToAssign = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: userDataInclude,
  });

  return (
    <ResumeEditor
      resumeToEdit={resumeToEdit}
      personalInfoDetailsToAssign={userDataToAssign}
    />
  );
}

export default Page;
