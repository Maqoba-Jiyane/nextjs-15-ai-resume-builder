"use client";

import * as React from "react";
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { EditorFormProps } from "@/lib/types";
import { referencesSchema, ReferencesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectArraysEqual } from "@/lib/utils/compare";
import {
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
import { cn } from "@/lib/utils";
import { GripHorizontal } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export default function ReferencesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  console.log(resumeData)
  const defaultValues = React.useMemo<ReferencesValues>(
    () => ({
      references:
        resumeData.references?.map((ref) => ({
          ...ref,
        })) || [],
    }),
    [resumeData.references],
  );

  const form = useForm<ReferencesValues>({
    resolver: zodResolver(referencesSchema),
    defaultValues,
  });

  // Watch only the workReferences array
  const watchedReferences = useWatch({
    control: form.control,
    name: "references",
  });

  // Auto-save whenever watchedReferences changes
  React.useEffect(() => {
    if (!objectArraysEqual(resumeData.references, watchedReferences ?? [])) {
      setResumeData({
        ...resumeData,
        references: watchedReferences ?? [],
      });
    }
  }, [watchedReferences]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "references",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">References</h2>
        <p className="text-sm text-muted-foreground">
          Add professional references.
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
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <ReferenceItem
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
                  role: "",
                  company: "",
                  email: "",
                  phone: "",
                  note: "",
                })
              }
            >
              Add Reference
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface ReferenceItemProps {
  form: UseFormReturn<ReferencesValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

function ReferenceItem({ id, form, index, remove }: ReferenceItemProps) {
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
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {/* Full name */}
      <FormField
        control={form.control}
        name={`references.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Role */}
      <FormField
        control={form.control}
        name={`references.${index}.role`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role/Title</FormLabel>
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
        name={`references.${index}.company`}
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

      {/* Email */}
      <FormField
        control={form.control}
        name={`references.${index}.email`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone */}
      <FormField
        control={form.control}
        name={`references.${index}.phone`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>

      {/* Note */}
      <FormField
        control={form.control}
        name={`references.${index}.note`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
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
