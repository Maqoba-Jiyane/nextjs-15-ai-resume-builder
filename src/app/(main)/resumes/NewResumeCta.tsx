// app/(dashboard)/resumes/NewResumeCta.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { createResumeAction } from "./actions";
import UpgradeDialog from "./UpgradeDialog";

export default function NewResumeCta({ latestResumeId }: { latestResumeId?: string }) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const onClick = () => {
    startTransition(async () => {
      const res = await createResumeAction();
      if (res?.ok) {
        router.push(`/editor`);
        return;
      }
      if (res?.code === "LIMIT_REACHED") {
        setTotal(res.totalCount ?? 1);
        setOpen(true);
        return;
      }
      // Optional: handle other errors (toast/snackbar)
    });
  };

  return (
    <>
      <Button className="mx-auto flex w-fit gap-2" disabled={pending} onClick={onClick}>
        <PlusSquare className="size-5" />
        {pending ? "Creating…" : "New resume"}
      </Button>

      <UpgradeDialog
        open={open}
        onOpenChange={setOpen}
        totalCount={total}
        resumeId={latestResumeId}
      />
    </>
  );
}
