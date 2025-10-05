// app/(dashboard)/resumes/UpgradeDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  totalCount: number;
  resumeId?: string; // make optional for safety
};

export default function UpgradeDialog({
  open,
  onOpenChange,
  totalCount,
  resumeId,
}: Props) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Limit reached</DialogTitle>
          <DialogDescription>
            Free plan allows 1 resume. You currently have {totalCount}. Upgrade
            to Premium for more resumes, or delete some to free up space.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            onClick={() =>
              router.push(`/pricing${resumeId ? `?resumeId=${resumeId}` : ""}`)
            }
          >
            View Premium
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Manage resumes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
