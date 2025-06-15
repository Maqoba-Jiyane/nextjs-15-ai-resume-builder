"use client";

import React, { useEffect, useMemo } from "react";
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
import { EditorFormProps } from "@/lib/types";
import { certificationSchema, CertificationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useForm, useFieldArray, useWatch, UseFormReturn } from "react-hook-form";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { objectArraysEqual } from "@/lib/utils/compare";

const CertificationForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  // Memoize default values
  const defaultValues = useMemo<CertificationValues>(() => {
    const sourceEdus = resumeData.certifications?.length
      ? resumeData.certifications
      :  [];

    return {
      certifications: sourceEdus.map((cert) => {
        return {
          name: cert.name ??  "",
          issuer: cert.issuer ??  "",
          credentialUrl: cert.credentialUrl ?? "",
          date: cert.date
            ? new Date(cert.date) : undefined,
          
        };
      }),
    };
  }, [resumeData.certifications]);

  const form = useForm<CertificationValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues,
  });

  // Watch only the certifications array
  const watchedcertifications = useWatch({
    control: form.control,
    name: "certifications",
  });

  // Auto-save whenever watchedcertifications changes
  useEffect(() => {
    if (!objectArraysEqual(resumeData.certifications, watchedcertifications ?? [])) {
      setResumeData({
        ...resumeData,
        certifications: watchedcertifications ?? [],
      });
    }
  }, [watchedcertifications]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Certification</h2>
        <p className="text-sm text-muted-foreground">
          Add as many certifications as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
              {fields.map((field, index) => (
                <CertificationItem
                  key={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                  id={field.id}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  issuer: "",
                  date: undefined,
                  credentialUrl: "",
                })
              }
            >
              Add certificate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CertificationForm;

interface CertificationItemProps {
  form: UseFormReturn<CertificationValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

function CertificationItem({ id, form, index, remove }: CertificationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  const handleDateChange = (
    fieldName: `certifications.${number}.date`,
    value: string
  ) => {
    form.setValue(fieldName, value ? new Date(value) : undefined);
  };

  return (
    <div
      className={cn(
        "space-y-3 border rounded-md bg-background p-3",
        isDragging && "shadow-xl z-50 cursor-grab relative"
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Certification {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`certifications.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certifications.${index}.issuer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issuer</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certifications.${index}.credentialUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Credential URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`certifications.${index}.date`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) => handleDateChange(
                    `certifications.${index}.date`,
                    e.target.value
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}