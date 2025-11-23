import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import { cookies } from "next/headers";
import NewResumeCta from "./NewResumeCta";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const cookieStore = await cookies();
  const refCode = cookieStore.get("refCode")?.value;

  const { userId } = await auth();
  if (!userId) return null;

  // Attach referral code → Clerk
  if (refCode) {
    try {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { refCode },
      });
    } catch (err) {
      console.error("Failed to send refCode:", err);
    }
  }

  // Fetch resumes
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  const latestResumeId = resumes[0]?.id;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 space-y-8 text-slate-200">
      {/* CTA */}
      {latestResumeId ? (
        <NewResumeCta/>
      ) : (
        <Button
          className="mx-auto flex w-fit gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          asChild
        >
          <Link href="/editor">
            <PlusSquare className="size-5" />
            New resume
          </Link>
        </Button>
      )}

      {/* Heading */}
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Your resumes</h1>
        <p className="text-slate-400">Total: {totalCount}</p>
      </section>

      {/* Resume Grid */}
      {resumes.length === 0 ? (
        <p className="text-slate-500 italic">You haven’t created any resumes yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
