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

const Page = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  let paid = false;

  const {accesstoken} = await searchParams

  if(accesstoken){
    const secrete = process.env.YOCO_SECRET_KEY || ''
    const decoded = jwt.decode(accesstoken);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if(JSON.parse(JSON.stringify(decoded)).exp < currentTimeInSeconds){
      redirect('/resumes')
    }

    try {
      jwt.verify(accesstoken, secrete)
      paid = true
    } catch (error) {
      if(error instanceof Error)
      throw new Error('Issue with token')
    }

  }

  //TODO: Check qouta for non-premium users

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
          <ResumeItem key={resume.id} resume={resume} paid={paid}/>
        ))}
      </div>
    </main>
  );
};

export default Page;
