// components/ui/Sidebar.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Sidebar({
  isAffiliate = false,
}: {
  isAffiliate?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-opacity-50 z-40 ${theme === "dark" ? "bg-black" : " bg-white"}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full shadow-lg z-40 transition-transform duration-300 ease-in-out",
          isOpen
            ? "w-4/5 translate-x-0"
            : "w-0 -translate-x-full overflow-hidden",
          ` ${theme === "dark" ? "bg-black/95 text-white" : " bg-white/95 text-black"}`,
        )}
      >
        {isOpen && (
          <div className="h-full p-6 pt-32 overflow-auto">
            <h2 className="text-xl font-bold mb-4">My Panel</h2>
            <nav className="space-y-3">
              <a href="/user/profile" className="block hover:underline">
              👤 Account Details
              </a>
              {/* <a href="/user/subscription" className="block hover:underline">
              💳 Manage Subscription
              </a> */}
              {isAffiliate && (
                <a
                  href="/earn-with-us/dashboard"
                  className="block hover:underline"
                >
                  💼 Affiliate Dashboard
                </a>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          `fixed bottom-32 ${pathname === "/user" && "bottom-12"} left-4 z-50 border border-gray-300 p-2 rounded-full shadow-lg transition-left duration-300 ease-in-out`,
          isOpen ? `left-[84vw]` : "left-4",
        )}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </>
  );
}
