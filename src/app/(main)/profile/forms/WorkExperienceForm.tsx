import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PersonalDetailsFormProps } from "@/lib/types";
import {
  workExperiencePromptSchema,
  WorkExperiencePromptValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const WorkExperienceForm = ({
  personalDetailsData,
  setPersonalDetailsData,
}: PersonalDetailsFormProps) => {
  const form = useForm<WorkExperiencePromptValues>({
    resolver: zodResolver(workExperiencePromptSchema),
    defaultValues: {
      prompts: personalDetailsData.prompts?.map((prom)=> ({
        ...prom,
        title: prom.title || undefined,
        prompt: prom.prompt || undefined,
      })) || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "prompts",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (isValid) {
        setPersonalDetailsData({
          ...personalDetailsData,
          prompts: values.prompts?.filter((prompt) => prompt !== undefined) || []
        });
      }
    });
    return () => subscription.unsubscribe?.();
  }, [form, personalDetailsData, setPersonalDetailsData]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience desciption</h2>
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
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => append({ prompt: "" })}
            >
              Add experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkExperienceForm;

// --- Component for each sortable item ---
const WorkExperienceItem = ({
  id,
  index,
  form,
  remove,
}: {
  id: string;
  index: number;
  form: ReturnType<typeof useForm<WorkExperiencePromptValues>>;
  remove: (index: number) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative border rounded-md p-4 bg-background space-y-2"
    >
      <div
        {...listeners}
        className="absolute left-2 top-2 text-muted-foreground cursor-move"
      >
        <GripHorizontal size={18} />
      </div>
      <FormField
        control={form.control}
        name={`prompts.${index}.prompt`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="resize-none"
                placeholder={`E.g "from nov 2019 to dec 2020 I worked at amazon as a software developer, tasks were: ..."`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="destructive"
        onClick={() => remove(index)}
        size="sm"
      >
        Remove
      </Button>
    </div>
  );
};
