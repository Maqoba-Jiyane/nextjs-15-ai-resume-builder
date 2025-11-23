// app/(dashboard)/resumes/NewResumeCta.tsx
"use client";

import {  useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

export default function NewResumeCta() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    startTransition(async () => {
        router.push(`/editor`);
        return;
      
    });
  };

  return (
    <>
      <Button className="mx-auto flex w-fit gap-2" disabled={pending} onClick={onClick}>
        <PlusSquare className="size-5" />
        {pending ? "Creating…" : "New resume"}
      </Button>
    </>
  );
}
