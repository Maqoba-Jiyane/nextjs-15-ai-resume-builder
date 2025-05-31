"use client";

import { useTransition } from "react";
import { joinAffiliateProgram } from "@/app/(main)/earn-with-us/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  isAffiliate: boolean;
}

export function JoinAffiliateButton({ isAffiliate }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    if (isAffiliate) {
        router.push('/earn-with-us/dashboard')
    } else {
      startTransition(async () => {
        await joinAffiliateProgram();
        router.refresh();
      });
    }
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isAffiliate ? "View Dashboard" : "Join the Program"}
    </Button>
  );
}
