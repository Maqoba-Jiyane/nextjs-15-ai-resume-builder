// components/ui/Sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LineChart, Sparkles,  } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ isAffiliate = false }: { isAffiliate?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // 🚀 NAV ITEMS – driven by affiliate status
  const navItems = isAffiliate
    ? [
        {
          href: "/earn-with-us/dashboard",
          label: "Affiliate Dashboard",
          icon: <LineChart className="h-4 w-4" />,
        },
        // {
        //   href: "/earn-with-us/resources",
        //   label: "Promo Resources",
        //   icon: <Sparkles className="h-4 w-4" />,
        // },
        // You can enable these later if needed:
        // {
        //   href: "/earn-with-us/payouts",
        //   label: "Payouts & History",
        //   icon: <Wallet className="h-4 w-4" />,
        // },
        // {
        //   href: "/earn-with-us/help",
        //   label: "Affiliate Help Center",
        //   icon: <HelpCircle className="h-4 w-4" />,
        // },
      ]
    : [
        {
          href: "/earn-with-us",
          label: "Join Affiliate Program",
          icon: <Sparkles className="h-4 w-4" />,
        },
        // {
        //   href: "/earn-with-us/faq",
        //   label: "How It Works",
        //   icon: <HelpCircle className="h-4 w-4" />,
        // },
        // Future ideas:
        // {
        //   href: "/earn-with-us/why-join",
        //   label: "Why Become an Affiliate?",
        //   icon: <Info className="h-4 w-4" />,
        // },
      ];

  return (
    <>
      {/* Overlay (mobile only feel) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full border-r border-slate-200 bg-white/90 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/95",
          "w-64 max-w-[80vw]",
          isOpen ? "translate-x-0 pt-20" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-5 py-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {isAffiliate ? "Affiliate" : "Earn with Eon Resume"}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {isAffiliate ? "Partner Panel" : "Start Earning"}
            </h2>
            <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
              {isAffiliate
                ? "Track performance, access resources, and grow your earnings."
                : "Join the program, get a link, and earn on every CV sold."}
            </p>
          </div>

          {/* Nav */}
          <nav className="space-y-2 text-sm">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-50",
                    isActive &&
                      "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer helper text */}
          <div className="mt-auto pt-6 text-[0.7rem] text-slate-400 dark:text-slate-500">
            {isAffiliate ? (
              <>Tip: Share your link often — WhatsApp, TikTok bio, Facebook groups, and LinkedIn work really well.</>
            ) : (
              <>Once you join, you&apos;ll get a unique link and a dashboard to track clicks, signups, and earnings.</>
            )}
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-24 left-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-800 shadow-[0_0_18px_rgba(15,23,42,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(56,189,248,0.6)] dark:border-slate-700 dark:bg-slate-950/95 dark:text-slate-100",
          isOpen && "translate-x-60 md:translate-x-64"
        )}
        aria-label={isOpen ? "Close panel" : "Open affiliate panel"}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </>
  );
}
