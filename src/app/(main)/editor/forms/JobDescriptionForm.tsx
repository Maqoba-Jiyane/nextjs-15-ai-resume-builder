"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { jobDescriptionSchema, JobDescriptionValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import AutoFillButton from "./AutoFillButton";
import { useRouter } from "next/navigation";

const JobDescriptionForm = ({ 
  resumeData, 
  setResumeData, 
  onAiUsed 
}: EditorFormProps) => {
  const router = useRouter();
  
  // Memoize default value
  const defaultValues = useMemo<JobDescriptionValues>(() => ({
    jobDescription: resumeData.jobDescription || "",
  }), [resumeData.jobDescription]);

  const form = useForm<JobDescriptionValues>({
    resolver: zodResolver(jobDescriptionSchema),
    defaultValues,
  });

  // Watch the jobDescription field
  const watchedJobDescription = useWatch({
    control: form.control,
    name: "jobDescription",
  });

  // Auto-save whenever watched value changes
useEffect(() => {
  if ((resumeData.jobDescription ?? "") !== (watchedJobDescription ?? "")) {
    setResumeData({
      ...resumeData,
      jobDescription: watchedJobDescription ?? "",
    });
  }
}, [watchedJobDescription]);

  // Reset form when external data changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [resumeData.jobDescription, form, router]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="font-semibold text-2xl">Job description</h2>
        <p className="text-sm text-muted-foreground">
          Paste into the box the description of the job you are creating a
          resume for.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Job description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="The job you are applying for..."
                    className="min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
                <div className="flex items-center justify-center">
                  <AutoFillButton
                    resumeId={resumeData.id || ""}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    validJobSecription={!resumeData.jobDescription?.trim()}
                    onAiUsed={onAiUsed}
                  />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default JobDescriptionForm;