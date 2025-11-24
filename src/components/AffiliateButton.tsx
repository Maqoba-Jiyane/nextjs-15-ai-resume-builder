"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import AffiliateSignupForm from "@/app/(main)/earn-with-us/AffiliateSignupForm";

interface AffiliateButtonProps {
  isAffiliate: boolean;
  totalNumber: number;
  affiliate: AffiliateProps | null;
}

interface AffiliateProps {
  code: string
  bank: string;
  payshapId: string;
}

const AffiliateButton = ({ isAffiliate, totalNumber, affiliate }: AffiliateButtonProps) => {
  const [showForm, setShowForm] = React.useState(false);

  console.log("isAffiliate: ", isAffiliate)

  // If already an affiliate → only show View Dashboard
  if (isAffiliate) {
    return (
      <Button asChild>
        <Link href="/earn-with-us/dashboard">View Dashboard</Link>
      </Button>
    );
  }

  // Not an affiliate yet
  return (
    <div>
      {totalNumber < 10  ? <>{!showForm ? (
        // Show only Join Program button
        <Button onClick={() => setShowForm(true)}>
          Join Program
        </Button>
      ) : (
        // After clicking → show the form instead of the button
        <AffiliateSignupForm existingAffiliate={affiliate ?? null} />
      )}</> : <Button>
      Volume Reached
    </Button>}
    </div>
  );
};

export default AffiliateButton;
