"use client";

import { GeneralInfoValues, generateInfoSchema } from "@/lib/validation";
import React, { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { shallowCompareFields } from "@/lib/utils/compare";

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  // Memoize default values
  const defaultValues = useMemo<GeneralInfoValues>(
    () => ({
      title: resumeData.title || "",
      description: resumeData.description || "",
    }),
    [resumeData.title, resumeData.description],
  );

  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generateInfoSchema),
    defaultValues,
  });

  // Watch all form values
  const watchedValues = useWatch({
    control: form.control,
  });

  // Auto-save whenever watched values change
  useEffect(() => {
    const fields: (keyof GeneralInfoValues)[] = ["description", "title"];

    if (shallowCompareFields(resumeData, watchedValues, fields)) {
      setResumeData({
        ...resumeData,
        ...watchedValues,
      });
    }
  }, [watchedValues]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General info</h2>
        <p className="text-sm text-muted-foreground">
          This will not appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role applying for...</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Junior Developer" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company applying to...</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Microsoft" />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
