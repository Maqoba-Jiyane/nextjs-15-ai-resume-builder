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
import { educationSchema, EducationValues } from "@/lib/validation";
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

const EducationForm = ({
  resumeData,
  setResumeData,
  personalDetails,
}: EditorFormProps) => {
  // Memoize default values
  const defaultValues = useMemo<EducationValues>(() => {
    const sourceEdus = resumeData.educations?.length
      ? resumeData.educations
      : personalDetails.educations || [];

    return {
      educations: sourceEdus.map((edu, i) => {
        const pdEdu = personalDetails.educations?.[i] ?? {};
        return {
          degree: edu.degree ?? pdEdu.degree ?? "",
          school: edu.school ?? pdEdu.school ?? "",
          fieldOfStudy: edu.fieldOfStudy ?? pdEdu.fieldOfStudy ?? "",
          location: edu.location ?? pdEdu.location ?? "",
          isCurrent: edu.isCurrent ?? pdEdu.isCurrent ?? false,
          startDate: edu.startDate
            ? new Date(edu.startDate)
            : (pdEdu.startDate ? new Date(pdEdu.startDate) : undefined),
          endDate: edu.endDate
            ? new Date(edu.endDate)
            : (pdEdu.endDate ? new Date(pdEdu.endDate) : undefined),
          description: edu.description ?? pdEdu.description ?? "",
        };
      }),
    };
  }, [resumeData.educations, personalDetails.educations]);

  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  // Watch only the educations array
  const watchedEducations = useWatch({
    control: form.control,
    name: "educations",
  });

  // Auto-save whenever watchedEducations changes
  useEffect(() => {
    if (!objectArraysEqual(resumeData.educations, watchedEducations ?? [])) {
      setResumeData({
        ...resumeData,
        educations: watchedEducations ?? [],
      });
    }
  }, [watchedEducations]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
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
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add as many educations as you like.
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
                <EducationItem
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
                  degree: "",
                  school: "",
                  fieldOfStudy: "",
                  location: "",
                  isCurrent: false,
                  startDate: undefined,
                  endDate: undefined,
                  description: "",
                })
              }
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

function EducationItem({ id, form, index, remove }: EducationItemProps) {
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
    fieldName: `educations.${number}.startDate` | `educations.${number}.endDate`,
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
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.fieldOfStudy`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Field of Study</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.location`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
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
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) => handleDateChange(
                    `educations.${index}.startDate`,
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
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) => handleDateChange(
                    `educations.${index}.endDate`,
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
        Check <span className="font-semibold">currently studying</span> if you&apos;re still enrolled.
      </FormDescription>
      <FormField
        control={form.control}
        name={`educations.${index}.isCurrent`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="size-4"
              />
            </FormControl>
            <FormLabel className="!mt-0">Currently studying here</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Include relevant coursework, achievements, or honors"
                className="min-h-[80px]"
              />
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