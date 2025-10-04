// app/(editor)/components/LanguagesEditor.tsx
"use client";

import React, { useEffect } from "react";
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";

import { languageLevelEnum, languagesSchema } from "@/lib/validation"; // <- from your validations
import type { LanguagesValues } from "@/lib/validation";
import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectArraysEqual } from "@/lib/utils/compare";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { DndContext, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguagesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const defaultValues = React.useMemo<LanguagesValues>(
    () => ({
      languages: resumeData.languages || [],
    }),
    [resumeData.languages],
  );

  const form = useForm<LanguagesValues>({
    resolver: zodResolver(languagesSchema),
    defaultValues,
  });

  const watchedLanguages = useWatch({
    control: form.control,
    name: "languages",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (!objectArraysEqual(resumeData.languages, watchedLanguages ?? [])) {
      setResumeData({
        ...resumeData,
        languages: watchedLanguages ?? [],
      });
    }
  }, [watchedLanguages]);

  // Ensure languages exists in form state (for older data it might be undefined)
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "languages",
  });

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
        <h3 className="text-2xl font-semibold">Languages</h3>
        <p className="text-sm text-muted-foreground">Add languages.</p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <LanguageItem
                  id={field.id}
                  key={field.id}
                  form={form}
                  index={index}
                  remove={remove}
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
                  level: "", // ✅ valid enum value
                })
              }
            >
              Add language
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface LangiageItemProps {
  form: UseFormReturn<LanguagesValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

function LanguageItem({ id, form, index, remove }: LangiageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className={cn(
        "space-y-3 border rounded-md bg-background p-3",
        isDragging && "shadow-xl z-50 cursor-grab relative",
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Language {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Name */}
        <FormField
          control={form.control}
          name={`languages.${index}.name`}
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

        {/* Level */}
        <FormField
          control={form.control}
          name={`languages.${index}.level`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""} // 👈 start empty
                  onValueChange={(v) => field.onChange(v)}
                  placeholder="Select level"
                  className="w-full"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <Input {...field}/>
                    {/* placeholder, not selectable */}
                    {languageLevelEnum.options.map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
