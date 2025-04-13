"use client";

import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import { templateSelectorSchema, TemplateSelectorValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

const TEMPLATES = [
  {
    id: "ats-1",
    name: "ATS 1",
    previewImage: "/templates/ats-1.png",
    description: "Optimized for applicant tracking systems"
  },
  {
    id: "classic",
    name: "CLASSIC",
    previewImage: "/templates/classic.png",
    description: "Traditional professional layout"
  },
] as const;

export default function TemplateSelector({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<TemplateSelectorValues>({
    resolver: zodResolver(templateSelectorSchema),
    defaultValues: {
      template: resumeData.template || "",
    },
  });

  const handleTemplateSelect = useCallback((templateId: string) => {
    form.setValue('template', templateId, { shouldValidate: true });
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.template) {
        setResumeData({
          ...resumeData,
          template: values.template
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Choose a Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a design that matches your style and industry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 transition-all cursor-pointer ${
              form.watch('template') === template.id
                ? "ring-2 ring-primary shadow-md"
                : "hover:shadow-sm"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <h3 className="text-lg font-medium mb-2">{template.name}</h3>
            <div className="relative aspect-[1/1.414]">
              <Image
                src={template.previewImage}
                alt={`${template.name} template preview`}
                className="w-full h-full object-contain border rounded"
                width={400}
                height={565}
                priority={form.watch('template') === template.id}
              />
              {form.watch('template') === template.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button
                    className="animate-in fade-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    Selected
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {template.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}