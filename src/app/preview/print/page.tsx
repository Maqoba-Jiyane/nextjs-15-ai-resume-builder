// app/preview/print/page.tsx
import { notFound } from "next/navigation";
import { verifyPrintToken } from "@/lib/print-token";
import { getResumeData } from "./action";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function PrintPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;                         // ✅ await the promise
  const tokenParam = sp.token;
  console.log(tokenParam)
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  if (!token) notFound();

  let resumeId: string;
  try {
    const payload = await verifyPrintToken(token);
    resumeId = payload.resumeId;
  } catch {
    notFound();
  }

  const data = await getResumeData(resumeId);
  if (!data) notFound();

  const resume = mapToResumeValues(data);

  return (
    <div id="resume-root" className="resume-a4">
      <ResumePreview resumeData={resume} />
    </div>
  );
}
