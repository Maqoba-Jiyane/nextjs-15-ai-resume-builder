
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import { cookies } from "next/headers";
import NewResumeCta from "./NewResumeCta";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const cookieStore = await cookies();
  const refCode = cookieStore.get("refCode")?.value;

  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  if (refCode && userId) {
    try {
      const client = await clerkClient();

      await client.users.updateUserMetadata(userId, {
        publicMetadata: { refCode },
      });
    } catch (err) {
      console.error("Failed to send refCode:", err);
    }
  }

  console.log(userId);

  // 2. Fetch data from prisma
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  // const canCreate = canCreateResume(totalCount, plan as Plan);

  // 3. Render
  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <NewResumeCta latestResumeId={resumes[0].id} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
