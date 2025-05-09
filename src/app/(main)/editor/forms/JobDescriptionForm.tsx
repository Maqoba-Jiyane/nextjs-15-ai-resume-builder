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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AutoFillButton from "./AutoFillButton";
import { useRouter } from "next/navigation";

const JobDescriptionForm = ({ resumeData, setResumeData, onAiUsed }: EditorFormProps) => {
  const router = useRouter();
  const form = useForm<JobDescriptionValues>({
    resolver: zodResolver(jobDescriptionSchema),
    defaultValues: {
      jobDescription: resumeData.jobDescription || "",
    },
  });

  useEffect(() => {
    form.reset({ jobDescription: resumeData.jobDescription || "" });
  }, [resumeData.jobDescription, form, router]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();

      if (!isValid) return;
      setResumeData({
        ...resumeData,
        ...values,
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

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
