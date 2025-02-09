import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ResumeItem from "./ResumeItem";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your resumes",
};

interface PageProps {
  searchParams?: {
    accesstoken?: string; 
    [key: string]: string | string[] | undefined; 
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  // 1. Check the access token in searchParams
  let paid = false;
  const accesstoken = searchParams?.accesstoken

  if (accesstoken) {
    const secret = process.env.YOCO_SECRET_KEY || "";
    const decoded = jwt.decode(accesstoken);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (decoded && typeof decoded === "object" && "exp" in decoded) {
      if ((decoded as { exp: number }).exp < currentTimeInSeconds) {
        redirect("/resumes");
      }
    }

    try {
      jwt.verify(accesstoken, secret);
      paid = true;
    } catch (error) {
      throw new Error("Issue with token: " + (error as Error).message);
    }
  }

  // 2. Fetch data from prisma
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  // 3. Render
  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} paid={paid} />
        ))}
      </div>
    </main>
  );
}
