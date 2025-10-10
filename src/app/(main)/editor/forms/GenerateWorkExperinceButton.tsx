import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import Link from "next/link";
import { EditorFormProps } from "@/lib/types";

interface GenerateWorkExperinceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
  onAiUsed: (aiUsed: boolean) => void;
  userPlan: EditorFormProps["plan"];
}

const GenerateWorkExperinceButton = ({
  onWorkExperienceGenerated,
  onAiUsed,
  userPlan,
}: GenerateWorkExperinceButtonProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
console.log("userPlan: ", userPlan)
  const handleClick = () => {
    if (userPlan === "FREE") {
      setShowUpgradeDialog(true);
      // Tell parent this attempt used AI intent but was blocked (optional):
      onAiUsed(false);
      return;
    }
    setShowInputDialog(true);
  };

  return (
    <>
      <Button variant="outline" type="button" onClick={handleClick}>
        <WandSparkles className="size-4" />
        Smart fill (AI)
      </Button>

      {/* Upgrade gate */}
      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
      />

      {/* Actual AI input */}
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
          onAiUsed(true);
        }}
      />
    </>
  );
};


export default GenerateWorkExperinceButton;

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);

      onWorkExperienceGenerated(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g "from nov 2019 to dec 2020 I worked at amazon as a software developer, tasks were: ..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function UpgradeDialog({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to unlock AI</DialogTitle>
          <DialogDescription>
            Smart fill (AI) is a Premium feature. Upgrade to generate tailored, ATS-optimized work experience entries in seconds.
          </DialogDescription>
        </DialogHeader>

        {/* <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <WandSparkles className="size-4 mt-0.5" />
            <span>AI-generated bullet points based on your description</span>
          </li>
          <li className="flex items-start gap-2">
            <WandSparkles className="size-4 mt-0.5" />
            <span>Faster PDF printing & premium templates</span>
          </li>
        </ul> */}

        <div className="mt-6 flex gap-2">
          <Button asChild className="w-full">
            <Link href="/pricing">See plans</Link>
          </Button>
          {/* or go straight to checkout if you want */}
          {/* <Button className="w-full" onClick={() => startCheckout("premium","monthly")}>Upgrade now</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
