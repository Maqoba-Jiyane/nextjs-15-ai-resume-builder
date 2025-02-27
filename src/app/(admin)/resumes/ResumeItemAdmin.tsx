"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { markResumeAsDownloaded } from "./actions";
import { useRouter } from "next/navigation";

interface ResumeItemAdminProps {
  resume: ResumeServerData;
}

const ResumeItemAdmin = ({ resume }: ResumeItemAdminProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.email || "Resume",
    onAfterPrint: async () => {
      if (!resume.downloaded) {
        await markResumeAsDownloaded(resume.id);
        router.refresh();
      }
    },
  });

  const handlePrint = () => {
    setTimeout(() => {
      reactToPrintFn();
    }, 500); // Small delay fixes mobile print issues
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p3">
      <div className="space-y-3">
        <div
          className="inline-block w-full text-center cursor-pointer"
          onClick={() => handleCopyToClipboard(resume.email || "No title")}
        >
          <p className="font-semibold line-clamp-1">
            {resume.email || "No title"}
          </p>
        </div>

        <div className="inline-block w-full relative">
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
        <Button
          size="lg"
          variant={resume.downloaded ? "secondary" : "premium"}
          disabled={!resume.paid}
          onClick={handlePrint}
          className="flex w-full"
        >
          {resume.downloaded ? "Downloaded" : "Download"}
        </Button>
      </div>
    </div>
  );
};

export default ResumeItemAdmin;
