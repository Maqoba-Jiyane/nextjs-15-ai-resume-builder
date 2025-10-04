"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import {
  templateSelectorSchema,
  type TemplateSelectorValues,
} from "@/lib/validation";
import { Lock } from "lucide-react";
import {
  deriveFacets,
  filterTemplates,
  TemplateFilter,
  TemplateId,
  TemplateMeta,
} from "@/types/template.types";
import {
  BLUE_CREATIVE_RESUME,
  CLASSIC_RESUME,
  CLASSIC_RESUME_RICH,
  DARK_BLUE_FRAME,
  MORDERN_SIDEBAR_RESUME,
  SCIENCE_AND_ENGINEERING,
} from "@/types/templates";

// ---- Types -----------------------------------------------------------------

// type TemplateTier = "free" | "premium";

// type Template = {
//   id: TemplateId;
//   name: string;
//   previewImage: string;
//   description: string;
//   tier: TemplateTier;
//   type: string
// };

// const TEMPLATES = [
//   {
//     id: "classic",
//     name: "Classic",
//     previewImage: "/assets/templates/Classic.jpg",
//     description: "Traditional professional layout",
//     tier: "free",
//     type: "Text",
//   },
//   {
//     id: "science-engineering-resume",
//     name: "ATS Friendly",
//     previewImage: "/assets/templates/ScienceEngineeringResume.png",
//     description: "Graduate format",
//     tier: "free",
//     type: "Text",
//   },
//   {
//     id: "classic-resume-rich",
//     name: "Classic Rich",
//     previewImage: "/assets/templates/ClassicResumeRich.png",
//     description: "High graphics format",
//     tier: "free",
//     type: "Graphic",
//   },
//   // {
//   //   id: "black-modern-professional",
//   //   name: "Black Modern Professional",
//   //   previewImage: "/assets/templates/BlackModernProfessionalResume.jpg",
//   //   description: "High graphics format",
//   //   tier: "free",
//   // },
//   {
//     id: "blue-creative-resume",
//     name: "Blue Creative Resume",
//     previewImage: "/assets/templates/BlueCreativeResume.png",
//     description: "High graphics format",
//     tier: "premium",
//     type: "Graphic",
//   },
// ] as const satisfies readonly Template[];

const TEMPLATES: TemplateMeta[] = [
  BLUE_CREATIVE_RESUME,
  CLASSIC_RESUME,
  SCIENCE_AND_ENGINEERING,
  CLASSIC_RESUME_RICH,
  MORDERN_SIDEBAR_RESUME,
  DARK_BLUE_FRAME,
  // BLACK_MODERN_PROFESSIONAL,
];

const isTemplateId = (id: string): id is TemplateId =>
  (TEMPLATES as readonly TemplateMeta[]).some((t) => t.id === id);

const isLocked = (tpl: TemplateMeta, plan: EditorFormProps["plan"]) =>
  tpl.tier === "premium" && plan !== "PREMIUM";

// ---- Component --------------------------------------------------------------

export default function TemplateSelector({
  resumeData,
  setResumeData,
  plan,
}: EditorFormProps) {
  const router = useRouter();

  const form = useForm<TemplateSelectorValues>({
    resolver: zodResolver(templateSelectorSchema),
    defaultValues: { template: resumeData.template ?? "" },
    mode: "onChange",
  });

  // Watch a single field to avoid repeated `getValues()` calls
  const selectedTemplate = useWatch({
    control: form.control,
    name: "template",
  });

  // Keep parent state in sync when selection changes
  React.useEffect(() => {
    if (!selectedTemplate || !isTemplateId(selectedTemplate)) return;
    if (resumeData.template !== selectedTemplate) {
      setResumeData({ ...resumeData, template: selectedTemplate });
    }
  }, [selectedTemplate, resumeData, setResumeData]);

  const [modalTemplate, setModalTemplate] = React.useState<TemplateMeta | null>(
    null,
  );
  const titleId = React.useId();

  const openPreview = React.useCallback(
    (tpl: TemplateMeta) => setModalTemplate(tpl),
    [],
  );
  const closeModal = React.useCallback(() => setModalTemplate(null), []);

  const goToPricing = React.useCallback(() => {
    const sp = new URLSearchParams();
    if (resumeData.id) sp.set("resumeId", resumeData.id);
    router.push(`/pricing?${sp.toString()}`);
  }, [router, resumeData.id]);

  const handleTemplateSelect = React.useCallback(
    (templateId: TemplateId) => {
      const tpl = TEMPLATES.find((t) => t.id === templateId)!;

      if (isLocked(tpl, plan)) {
        // Upsell: send to pricing; keep client logic minimal
        goToPricing();
        return;
      }

      form.setValue("template", templateId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form, plan, goToPricing],
  );

  // Modal ESC
  React.useEffect(() => {
    if (!modalTemplate) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setModalTemplate(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalTemplate]);
  const facets = React.useMemo(() => deriveFacets(TEMPLATES), []);
  const [filters, setFilters] = React.useState<TemplateFilter>({
    // sensible defaults; change to taste
    tiers: undefined,
    types: undefined,
    layouts: undefined,
    columns: undefined,
    colors: undefined,
    features: undefined,
    atsSafe: undefined,
    photoSupport: undefined,
    search: "",
  });

  const filtered = React.useMemo(
    () => filterTemplates(TEMPLATES, filters),
    [filters],
  );

  // function toggle<T>(arr: T[] | undefined, v: T): T[] {
  //   const a = arr ?? [];
  //   return a.includes(v) ? a.filter((x) => x !== v) : [...a, v];
  // }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Choose a Template</h2>
          <p className="text-sm text-muted-foreground">
            Filter by layout, style, and features to find your match
          </p>
        </div>

        {/* ---------- Filter Bar ---------- */}
        <div className="rounded-lg border p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {/* Search */}
            {/* <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Search
              </label>
              <Input
                placeholder="e.g., blue creative two-column"
                value={filters.search ?? ""}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              />
            </div> */}

            {/* Tier */}
            <FacetRow
              label="Tier"
              options={facets.tiers}
              selected={filters.tiers ?? []}
              onToggle={(opt) =>
                setFilters((f) => ({
                  ...f,
                  tiers: f.tiers?.[0] === opt ? undefined : [opt], // <-- one or none
                }))
              }
            />

            {/* Type */}
            <FacetRow
              label="Type"
              options={facets.types}
              selected={filters.types ?? []}
              onToggle={(t) =>
                setFilters((f) => ({
                  ...f,
                  types: f.types?.[0] === t ? undefined : [t],
                }))
              }
            />
          </div>

          {/* <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3"> */}
          {/* Layout */}
          {/* <FacetRow
              label="Layout"
              options={facets.layouts}
              selected={filters.layouts ?? []}
              onToggle={(v) => setFilters((f) => ({ ...f, layouts: toggle(f.layouts, v) }))}
            /> */}

          {/* Columns */}
          {/* <FacetRow
              label="Columns"
              options={facets.columns.map(String)}
              selected={(filters.columns ?? []).map(String)}
              onToggle={(v) =>
                setFilters((f) => ({
                  ...f,
                  columns: toggle((f.columns ?? []) as (1 | 2 | 3)[], Number(v) as 1 | 2 | 3),
                }))
              }
            /> */}

          {/* Color tokens */}
          {/* <FacetRow
              label="Colors"
              options={facets.columns}
              selected={filters.colors ?? []}
              onToggle={(v) => setFilters((f) => ({ ...f, colors: toggle(f.colors, v) }))}
            /> */}
          {/* </div> */}

          {/* <div className="mt-3 grid grid-cols-1 gap-3">
            {/* Features */}
          {/*<FacetRow
              label="Features"
              options={facets.features}
              selected={filters.features ?? []}
              onToggle={(v) => setFilters((f) => ({ ...f, features: toggle(f.features, v) }))}
            />
          </div> */}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Flags */}
            {/* <FlagToggle
              label="ATS-friendly"
              active={filters.atsSafe === true}
              onToggle={() =>
                setFilters((f) => ({ ...f, atsSafe: f.atsSafe === true ? undefined : true }))
              }
            /> */}
            {/* <FlagToggle
              label="Photo support"
              active={filters.photoSupport === true}
              onToggle={() =>
                setFilters((f) => ({
                  ...f,
                  photoSupport: f.photoSupport === true ? undefined : true,
                }))
              }
            /> */}

            {/* Reset */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  tiers: undefined,
                  types: undefined,
                  // layouts: undefined,
                  // columns: undefined,
                  // colors: undefined,
                  // features: undefined,
                  // atsSafe: undefined,
                  // photoSupport: undefined,
                  search: "",
                })
              }
            >
              Reset filters
            </Button>

            <div className="ml-auto text-sm text-muted-foreground">
              Showing <strong>{filtered.length}</strong> of {TEMPLATES.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((tpl) => {
            const locked = isLocked(tpl, plan);
            const selected = selectedTemplate === tpl.id;
            return (
              <TemplateCard
                key={tpl.id}
                template={tpl}
                selected={!!selected}
                locked={locked}
                onSelect={() => handleTemplateSelect(tpl.id)}
                onPreview={() => openPreview(tpl)}
                onUnlock={goToPricing}
              />
            );
          })}
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
              // image shown after explicit user action → no need for priority
              loading="eager"
              decoding="async"
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />

            <div className="mt-3 flex items-center justify-between">
              <Button onClick={closeModal}>Close</Button>
              {isLocked(modalTemplate, plan) ? (
                <Button
                  onClick={() => {
                    closeModal();
                    goToPricing();
                  }}
                >
                  Unlock Premium
                </Button>
              ) : (
                <Button
                  disabled={selectedTemplate === modalTemplate.id}
                  onClick={() => {
                    handleTemplateSelect(modalTemplate.id);
                    closeModal();
                  }}
                >
                  {selectedTemplate === modalTemplate.id
                    ? "Selected"
                    : "Select"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---- Presentational card ----------------------------------------------------

type TemplateCardProps = {
  template: TemplateMeta;
  selected: boolean;
  locked: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onUnlock: () => void;
};

const TemplateCard = React.memo(function TemplateCard({
  template,
  selected,
  locked,
  onSelect,
  onPreview,
  onUnlock,
}: TemplateCardProps) {
  const handleActivate = locked ? onUnlock : onSelect;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className={[
        "relative cursor-pointer rounded-lg border p-4 transition-all",
        selected ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm",
        locked ? "opacity-75" : "",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{template.name}</h3>
        <div className="flex items-center gap-2">
          {template.tier === "premium" && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              Premium
            </span>
          )}
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
          className="h-full w-full object-contain z-50"
          width={400}
          height={565}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={selected}
        />

        {/* Selected overlay */}
        {selected && !locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded bg-white/90 px-3 py-1 text-sm font-medium text-black">
              Selected
            </span>
          </div>
        )}

        {/* Lock overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="flex items-center gap-1 rounded bg-white/95 px-2 py-1 text-xs font-medium text-black">
              <Lock className="h-3.5 w-3.5" /> Unlock to use
            </span>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {template.description}
      </p>

      {locked && (
        <Button className="mt-2 w-full" onClick={onUnlock}>
          Unlock Premium
        </Button>
      )}
    </div>
  );
});

function FacetRow<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: T[];
  selected: string[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(String(opt));
          return (
            <Button
              key={String(opt)}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              className="h-7 rounded-full px-3 text-xs"
              onClick={() => onToggle(opt)}
            >
              {String(opt)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// function FlagToggle({
//   label,
//   active,
//   onToggle,
// }: {
//   label: string;
//   active: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <Button
//       type="button"
//       size="sm"
//       variant={active ? "default" : "outline"}
//       className="rounded-full"
//       onClick={onToggle}
//     >
//       {label}
//     </Button>
//   );
// }
