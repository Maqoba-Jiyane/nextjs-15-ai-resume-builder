"use client";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

const SummaryForm = ({ resumeData, setResumeData, onAiUsed }: EditorFormProps) => {
  // Memoize default value
  const defaultValues = useMemo<SummaryValues>(() => ({
    summary: resumeData.summary || "",
  }), [resumeData.summary]);

  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues,
  });

  // Watch the summary field
  const watchedSummary = useWatch({
    control: form.control,
    name: "summary",
  });

  // Auto-save whenever watched value changes
  useEffect(() => {
    if ((resumeData.summary ?? "") !== (watchedSummary ?? "")) {
      setResumeData({
        ...resumeData,
        summary: watchedSummary ?? "",
      });
    }
  }, [watchedSummary]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="font-semibold text-2xl">Professional summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a short introduction for your resume or let the AI generate one
          from your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional summary</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="A brief, engaging text about yourself"
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
                <div className="mt-4 flex justify-center">
                  <GenerateSummaryButton
                    resumeData={resumeData}
                    onSummaryGenerated={({ summary, aiUsed }) => {
                      form.setValue('summary', summary);
                      onAiUsed(aiUsed);
                    }}
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

export default SummaryForm;