// app/preview/page.tsx (or whatever route you're using)

import ResumePreview from "@/components/ResumePreview";
import { getResumeData } from "./action";
import { notFound } from "next/navigation";
import { mapToResumeValues } from "@/lib/utils";
import { verifyResumeToken } from "@/lib/server/jwt";

interface Props {
  searchParams: Promise<{ token: string }>;
}

export default async function ResumePage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) notFound();

  const resumeId = await verifyResumeToken(token);

  if (!resumeId) {
    notFound();
  }

  const resumeData = await getResumeData(resumeId);

  if (!resumeData) {
    notFound();
  }

  const resume = mapToResumeValues(resumeData);

  return (
    <div className="lg:px-40">
      <ResumePreview resumeData={resume} />
    </div>
  );
}
