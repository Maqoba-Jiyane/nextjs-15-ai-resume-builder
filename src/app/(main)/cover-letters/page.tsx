import { auth } from "@clerk/nextjs/server";
import React from "react";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  return <div>{totalCount}</div>;
};

export default page;
