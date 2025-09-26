"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import {
  templateSelectorSchema,
  type TemplateSelectorValues,
} from "@/lib/validation";

// ---- Types -----------------------------------------------------------------

export type TemplateId = "classic" | "science-engineering-resume" | "classic-resume-rich";

type Template = {
  id: TemplateId;
  name: string;
  previewImage: string;
  description: string;
};

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    previewImage: "/assets/templates/Classic.jpg",
    description: "Traditional professional layout",
  },
  {
    id: "science-engineering-resume",
    name: "ATS Friendly",
    previewImage: "/assets/templates/ScienceEngineeringResume.png",
    description: "Graduate format",
  },
  {
    id: "classic-resume-rich",
    name: "Classic Rich",
    previewImage: "/assets/templates/ClassicResumeRich.png",
    description: "High graphics format",
  },
] as const satisfies readonly Template[];

const isTemplateId = (id: string): id is TemplateId =>
  (TEMPLATES as readonly Template[]).some((t) => t.id === id);

// ---- Component --------------------------------------------------------------

export default function TemplateSelector({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<TemplateSelectorValues>({
    resolver: zodResolver(templateSelectorSchema),
    defaultValues: { template: resumeData.template ?? "" },
    mode: "onChange",
  });

  // local modal state
  const [modalTemplate, setModalTemplate] = React.useState<Template | null>(null);

  const handleTemplateSelect = React.useCallback(
    (templateId: TemplateId) => {
      // 1) update form (for validation/UI)
      form.setValue("template", templateId, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // 2) update parent only if actually changed
      if (resumeData.template !== templateId) {
        setResumeData({ ...resumeData, template: templateId });
      }
    },
    [form, resumeData, setResumeData],
  );

  // Modal a11y: ESC to close
  React.useEffect(() => {
    if (!modalTemplate) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModalTemplate(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalTemplate]);

  const titleId = React.useId();
  const closeModal = React.useCallback(() => setModalTemplate(null), []);
  const openPreview = React.useCallback((tpl: Template) => setModalTemplate(tpl), []);

  const selectedId = (form.getValues().template || "") as string;
  const selected = isTemplateId(selectedId) ? selectedId : undefined;

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Choose a Template</h2>
          <p className="text-sm text-muted-foreground">
            Select a design that matches your style and industry
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              selected={selected === tpl.id}
              onSelect={() => handleTemplateSelect(tpl.id)}
              onPreview={() => openPreview(tpl)}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {modalTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id={titleId} className="sr-only">
              {modalTemplate.name} template preview
            </h3>

            <Image
              src={modalTemplate.previewImage}
              alt={`${modalTemplate.name} resume template preview`}
              width={800}
              height={1100}
              className="mx-auto max-h-[90vh] w-auto rounded-lg border object-contain"
              sizes="(max-width: 1024px) 90vw, 800px"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />

            <div className="mt-3 flex items-center justify-between">
              <Button onClick={closeModal}>Close</Button>
              <Button
                disabled={selected === modalTemplate.id}
                onClick={() => {
                  handleTemplateSelect(modalTemplate.id);
                  closeModal();
                }}
              >
                {selected === modalTemplate.id ? "Selected" : "Select"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---- Presentational card ----------------------------------------------------

type TemplateCardProps = {
  template: Template;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
};

const TemplateCard = React.memo(function TemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
}: TemplateCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={[
        "cursor-pointer rounded-lg border p-4 transition-all",
        selected ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{template.name}</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
        >
          Preview
        </Button>
      </div>

      <div
        className="relative aspect-[1/1.414] overflow-hidden rounded border"
        onClick={(e) => {
          e.stopPropagation();
          onPreview();
        }}
      >
        <Image
          src={template.previewImage}
          alt={`${template.name} template thumbnail`}
          className="h-full w-full object-contain"
          width={400}
          height={565}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={selected}
        />
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-white/90 px-3 py-1 text-sm font-medium text-black">
              Selected
            </span>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{template.description}</p>
    </div>
  );
});
