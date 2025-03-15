import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import ResumeItemAdmin from "../../resumes/ResumeItemAdmin";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  // 2. Fetch data from prisma
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        AND: [{ checkoutId: { not: null } }, { checkoutId: { not: "" } }],
        paid: false,
      },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { AND: [{ checkoutId: { not: null } }, { checkoutId: { not: "" } }], paid: false , } }),
  ]);

  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Half Way Checkout</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItemAdmin key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
};

export default Page;
