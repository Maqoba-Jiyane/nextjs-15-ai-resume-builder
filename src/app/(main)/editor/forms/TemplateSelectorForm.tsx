"use client";

import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import {
  templateSelectorSchema,
  TemplateSelectorValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TEMPLATES = [
  {
    id: "classic",
    name: "classic",
    previewImage: "/assets/templates/Classic.jpg",
    description: "Traditional professional layout",
  },
  {
    id: "ats-1",
    name: "ATS Friendly",
    previewImage:
      "/assets/templates/ScienceEngineeringResume.png",
      description: "Graduate format",
  },
  {
    id: "classic-resume-rich",
    name: "Classic Rich",
    previewImage:
      "/assets/templates/ClassicResumeRich.png",
      description: "High graphics format",
  },
] as const;

export default function TemplateSelector({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<TemplateSelectorValues>({
    resolver: zodResolver(templateSelectorSchema),
    defaultValues: {
      template: resumeData.template || "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null); // For image preview modal
  const [image, setImage] = useState({
    id: "",
    name: "",
    previewImage: "",
    description: "",
  }); // For image preview modal

  const handleTemplateSelect = useCallback(
    (templateId: string) => {
      form.setValue("template", templateId, { shouldValidate: true });
    },
    [form],
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.template) {
        setResumeData({
          ...resumeData,
          template: values.template,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <>
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
                form.watch("template") === template.id
                  ? "ring-2 ring-primary shadow-md"
                  : "hover:shadow-sm"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <h3 className="text-lg font-medium mb-2">{template.name}</h3>
              <div
                className="relative aspect-[1/1.414]"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selecting template
                  setPreviewImage(template.previewImage); // Open modal
                  setImage(template);
                }}
              >
                <Image
                  src={template.previewImage}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-contain border rounded"
                  width={400}
                  height={565}
                  priority={form.watch("template") === template.id}
                />
                {form.watch("template") === template.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button className="animate-in fade-in">Selected</Button>
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

      {/* Modal for image preview */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl w-full px-4">
            <Image
              src={previewImage}
              alt="Template Preview"
              className="rounded-lg max-h-[90vh] mx-auto"
              width={800}
              height={1100}
            />

            <div className="flex justify-between pt-2">
              <Button
                className={``}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                }}
              >
                Close
              </Button>
              <Button
                disabled={form.watch("template") === image.id  ? true : false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect(image.id);
                }}
              >
              {form.watch("template") === image.id  ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
