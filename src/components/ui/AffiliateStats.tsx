"use client";

import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, Sparkles } from "lucide-react";
import { useState } from "react";

export function AffiliateStats({
  code,
  purchases,
  signups,
  earnings,
}: {
  code: string | null;
  purchases: number;
  signups: number;
  earnings: number;
}) {
  const [copied, setCopied] = useState(false);

  const referralUrl = `https://www.eonresume.co.za/?refCode=${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Referral Link Section */}
      <div className="bg-muted p-4 sm:p-6 rounded-lg shadow-sm max-w-screen">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary">
          🚀 Your Referral Link
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Share this link with others. You’ll earn rewards for every signup and
          purchase they make!
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <code className="bg-white text-black px-3 py-2 rounded-md text-sm w-full overflow-x-hidden whitespace-nowrap text-ellipsis">
            {referralUrl}
          </code>

          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <ClipboardCopyIcon className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-black">
        <Stat
          label="Signups"
          value={signups}
          description="People you've inspired to join"
        />
        <Stat
          label="Purchases"
          value={purchases}
          description="Conversions from your referrals"
        />
        <Stat
          label="Earnings"
          value={`R${earnings.toFixed(2)}`}
          description="Your total commission earned"
        />
      </div>

      {/* Motivation / Tips */}
      <div className="bg-primary/5 p-4 sm:p-6 rounded-lg">
        <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-md font-semibold text-primary">Pro Tip</h3>
        </div>
        <p className="text-sm text-gray-500">
          Share your link on social media, in your bio, or with friends in chat
          groups. The more visibility you get, the more you earn. Let’s grow
          together!
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  description,
}: {
  label: string;
  value: number | string;
  description?: string;
}) {
  return (
    <div className="text-center border p-4 sm:p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="text-2xl sm:text-3xl font-extrabold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {description && (
        <div className="mt-1 text-xs text-gray-400">{description}</div>
      )}
    </div>
  );
}
