import { getAffiliateStats } from "@/lib/analytics";
import { auth } from "@clerk/nextjs/server";
import { AffiliateStats } from "@/components/ui/AffiliateStats";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AffiliateDashboard() {
  const { userId } = await auth();
  if (!userId) return null;

  const stats = await getAffiliateStats(userId);

  // ❌ No affiliate profile / stats yet
  if (!stats) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-50">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Welcome to the Eon Resume affiliate hub
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            You&apos;re not part of the affiliate program yet — but it&apos;s never
            too late to start.
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Share Eon Resume with your audience, help more people land interviews,
            and earn commission on every paid download. 🚀
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="bg-sky-500 text-xs font-semibold text-white shadow-[0_0_18px_rgba(56,189,248,0.5)] hover:bg-sky-600"
            >
              <Link href="/earn-with-us">Join the affiliate program</Link>
            </Button>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-500">
              Takes less than 2 minutes to set up your payout details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Has affiliate stats
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:mx-auto">
      <div className="mb-8 text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Affiliate dashboard
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
          Welcome back, partner 🌟
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Here&apos;s how your impact is growing — keep sharing your link and
          helping more job seekers get interview-ready.
        </p>
      </div>

      <div className="rounded-2xl">
        <AffiliateStats {...stats} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[0.75rem] text-slate-600 dark:text-slate-400">
        <p>
          Pro tip: add your affiliate link to your WhatsApp status, Facebook
          bio, and TikTok profile to get more clicks.
        </p>
        <Link
          href="/earn-with-us"
          className="text-sky-500 underline-offset-2 hover:underline"
        >
          View program details →
        </Link>
      </div>
    </div>
  );
}
