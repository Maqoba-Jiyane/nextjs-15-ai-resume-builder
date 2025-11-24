"use client";

import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, Sparkles } from "lucide-react";
import { useState } from "react";

export function AffiliateStats({
  code,
  clicks,
  purchases,
  signups,
  earnings,
}: {
  code: string | undefined;
  clicks: number;
  purchases: number;
  signups: number;
  earnings: number;
}) {
  const [copied, setCopied] = useState(false);

  const referralUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/?refCode=${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Referral Link Section */}
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          🚀 Your Referral Link
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Share your link and earn commission from every signup & purchase.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="w-full truncate rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            {referralUrl}
          </code>

          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto dark:border-slate-600 dark:text-slate-200"
          >
            <ClipboardCopyIcon className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Clicks" value={clicks} />
        <Stat label="Signups" value={signups} />
        <Stat label="Purchases" value={purchases} />
        <Stat label="Earnings" value={`R${(earnings/100).toFixed(2)}`} />
      </div>

      {/* Pro tip */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Pro Tip
          </h3>
        </div>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Post your link on WhatsApp Status, TikTok, Facebook bio, and job
          groups. The more visibility you create, the more you earn. 🚀
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm text-center dark:border-slate-700 dark:bg-slate-950/90 dark:shadow-lg transition hover:shadow-md dark:hover:shadow-xl">
      <div className="text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}
