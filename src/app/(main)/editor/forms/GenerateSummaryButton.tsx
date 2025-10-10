import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";
import { EditorFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (payload: { summary: string; aiUsed: boolean }) => void;
  userPlan: EditorFormProps["plan"]; // "FREE" | "PREMIUM" (adjust to your enum)
}

const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
  userPlan,
}: GenerateSummaryButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  async function handleClick() {
    // Client-side gate
    if (userPlan === "FREE") {
      setShowUpgradeDialog(true);
      return;
    }

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated({ summary: aiResponse, aiUsed: true });
    } catch (err) {
      // If server enforced with 402, open dialog
      console.error(err);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoadingButton
        variant="outline"
        type="button"
        onClick={handleClick}
        loading={loading}
      >
        <WandSparkles className="size-4" />
        Generate (AI)
      </LoadingButton>

      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
      />
    </>
  );
};

export default GenerateSummaryButton;

// --- Reusable Upgrade Dialog -----------------------------------------------

function UpgradeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to unlock AI</DialogTitle>
          <DialogDescription>
            AI summary is a Premium feature. Upgrade to generate an ATS-optimized
            professional summary in seconds.
          </DialogDescription>
        </DialogHeader>

        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex gap-2">
            <WandSparkles className="size-4 mt-0.5" />
            <span>Instant, tailored summaries from your resume data</span>
          </li>
          <li className="flex gap-2">
            <WandSparkles className="size-4 mt-0.5" />
            <span>Access to other AI tools and premium templates</span>
          </li>
        </ul>

        <div className="mt-6 flex gap-2">
          <Button asChild className="w-full">
            <Link href="/pricing">See plans</Link>
          </Button>
          {/* Or go straight to checkout if you prefer */}
          {/* <Button className="w-full" onClick={() => startCheckout("premium","monthly")}>Upgrade now</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
