"use client";

import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
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
import GenerateWorkExperinceButton from "./GenerateWorkExperinceButton";
import { objectArraysEqual } from "@/lib/utils/compare";

export default function WorkExperienceForm({ resumeData, setResumeData, onAiUsed, }: EditorFormProps) {
  // Memoize default values so identity only changes when resumeData.workExperiences changes
  const defaultValues = useMemo<WorkExperienceValues>(() => ({
    workExperiences:
      resumeData.workExperiences?.map((exp) => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
        endDate: exp.endDate ? new Date(exp.endDate) : undefined,
      })) || [],
  }), [resumeData.workExperiences]);

  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues,
  });

  // Watch only the workExperiences array
  const watchedExperiences = useWatch({
    control: form.control,
    name: "workExperiences",
  });

  // Auto-save whenever watchedExperiences changes
  useEffect(() => {
    if (!objectArraysEqual(resumeData.workExperiences, watchedExperiences ?? [])) {
      setResumeData({
        ...resumeData,
        workExperiences: watchedExperiences ?? [],
      });
    }
  }, [watchedExperiences]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
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
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-sm text-muted-foreground">
          Add as many experiences as you like.
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
                <WorkExperienceItem
                  id={field.id}
                  key={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                  onAiUsed={onAiUsed}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: undefined,
                  endDate: undefined,
                  description: "",
                })
              }
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
  onAiUsed: (aiUsed: boolean) => void;
}

function WorkExperienceItem({ id, form, index, remove, onAiUsed }: WorkExperienceItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  const handleDateChange = (
    fieldName: `workExperiences.${number}.startDate` | `workExperiences.${number}.endDate`,
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
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <div className="flex justify-center">
        <GenerateWorkExperinceButton
          onWorkExperienceGenerated={(exp) =>
            form.setValue(`workExperiences.${index}`, {
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : undefined,
              endDate: exp.endDate ? new Date(exp.endDate) : undefined,
            })
          }
          onAiUsed={onAiUsed}
        />
      </div>

      {/* Position */}
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Company */}
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) => handleDateChange(
                    `workExperiences.${index}.startDate`,
                    e.target.value
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) => handleDateChange(
                    `workExperiences.${index}.endDate`,
                    e.target.value
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you
        currently work here.
      </FormDescription>

      {/* Description */}
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
