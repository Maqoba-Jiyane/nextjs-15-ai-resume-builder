"use client";

import React, { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";
import {
  OldCVUpload,
  oldCVUploadSchema,
  type ResumeValues,
} from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";

interface OldCVUploadFormProps {
  setResumeData: (data: ResumeValues) => void;
  onAiUsed: (aiUsed: boolean) => void;
}

const OldCVUploadForm = ({ onAiUsed }: OldCVUploadFormProps) => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oldCVRef = useRef<HTMLInputElement>(null);

  // 🔥 Pull resumeId directly from the URL
  const resumeId = searchParams.get("resumeId");

  const form = useForm<OldCVUpload>({
    resolver: zodResolver(oldCVUploadSchema),
    defaultValues: {
      oldCV: undefined as unknown as File,
    },
  });

  const onSubmit = (values: OldCVUpload) => {
    if (!resumeId) {
      toast({
        variant: "destructive",
        description: "Missing resume ID. Please refresh the page.",
      });
      return;
    }

    if (!values.oldCV) {
      toast({
        variant: "destructive",
        description: "Please upload your old CV before continuing.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", values.oldCV);
    formData.append("resumeId", resumeId); // 👈 important

    startTransition(async () => {
      try {
        const fileEntry = formData.get("file");

        if (!(fileEntry instanceof File)) {
          throw new Error("Uploaded file is missing or invalid.");
        }

        // setResumeData(parsed);
        onAiUsed(true);
        router.refresh();

        toast({
          variant: "default",
          description:
            "We’ve imported your CV and updated your resume details.",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description:
            "Failed to import your CV. Please try a different file or try again.",
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">Import from an existing CV</h2>
        <p className="text-sm text-muted-foreground">
          Upload your old CV (PDF or Word) and let Eon Resume extract your
          details automatically.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="oldCV"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload CV file</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    ref={oldCVRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setFileName(file.name);
                      } else {
                        field.onChange(undefined);
                        setFileName(null);
                      }
                    }}
                  />
                </FormControl>

                {fileName && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Selected: <span className="font-medium">{fileName}</span>
                  </p>
                )}

                <Button
                  variant="secondary"
                  type="button"
                  className="mt-2 w-full"
                  onClick={() => {
                    field.onChange(undefined);
                    setFileName(null);
                    if (oldCVRef.current) oldCVRef.current.value = "";
                  }}
                >
                  Remove
                </Button>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="outline"
            disabled={isPending}
            className="w-full justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing from CV…
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import from CV (AI)
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OldCVUploadForm;
