"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { useRef } from "react";
import { formatDate } from "date-fns";

interface ResumeItemAdminProps {
  resume: ResumeServerData;
}

const ResumeItemAdmin = ({ resume }: ResumeItemAdminProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {

    let apiRoute = '';
    const template = resume.template
    console.log('admin ',template)
    if(template.toLocaleLowerCase() === 'classic'){
      apiRoute = '../api/download-resume/classic'
    }else{
      apiRoute = '../api/download-resume/ats-1'
    }

    try {
      const response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
        }),
      });

      if(response.ok){
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resume.firstName}_${resume.lastName}${resume.title && '_'+resume.title.replaceAll(' ', '_')}${resume.description && '_'+resume.description.substring(0, 40).replaceAll(' ', '_')}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p3">
      <div className="space-y-3">
        <div className="inline-block w-full text-center cursor-pointer">
          <p
            className="font-semibold line-clamp-1"
            onClick={() => handleCopyToClipboard(resume.email || "No email")}
          >
            {resume.email || "No title"}
          </p>
          <p
            className="font-semibold line-clamp-1"
            onClick={() =>
              handleCopyToClipboard(resume.firstName || "No first name")
            }
          >
            {resume.firstName}
          </p>
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
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
