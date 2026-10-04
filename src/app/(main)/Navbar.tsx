"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import PublicDropDownMenu from "@/components/PublicDropDownMenu";
import { cn } from "@/lib/utils";

// Navigation items
const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Resumes",
    href: "/resumes",
  },
  {
    label: "Jobs",
    href: "https://www.employmentecho.co.za",
    external: true,
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
] as const;

// Shared styles
const headerStyles = cn(
  "sticky top-0 z-50",
  "border-b border-slate-200",
  "bg-white/80 text-slate-900",
  "backdrop-blur-md",
  "transition-colors duration-200",
  "dark:border-slate-800",
  "dark:bg-slate-950/80",
  "dark:text-slate-100",
);

const navLinkStyles = cn(
  "transition-colors duration-200",
  "hover:text-sky-600",
  "dark:hover:text-sky-400",
);

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={headerStyles}>
      <div
        className={cn(
          "mx-auto flex max-w-7xl",
          "items-center justify-between",
          "gap-3 px-4 py-3",
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="Eon Resume homepage"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/assets/logo2.png"
            alt="Eon Resume"
            width={42}
            height={42}
            className="rounded-full"
            priority
          />

          {/* Light mode logo */}
          <Image
            src="/assets/logo3.png"
            alt=""
            width={213}
            height={69}
            className={cn(
              "hidden h-auto max-w-[180px]",
              "md:block dark:md:hidden",
            )}
            priority
          />

          {/* Dark mode logo */}
          <Image
            src="/assets/white-logo3.png"
            alt=""
            width={213}
            height={69}
            className={cn("hidden h-auto max-w-[180px]", "dark:md:block")}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "hidden items-center gap-5",
            "text-sm font-medium",
            "text-slate-700",
            "dark:text-slate-200",
            "min-[1075px]:flex",
          )}
        >
          {NAV_ITEMS.map((item) => {
            const external = "external" in item && item.external;

            const active = !external && isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  navLinkStyles,
                  active && "text-sky-700 dark:text-sky-400",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Theme and authentication */}
          <div className="ml-3 flex items-center gap-3">
            <ThemeToggle />

            <SignedOut>
              <Button asChild size="default" variant="premium">
                <Link href="/resumes">Get started</Link>
              </Button>
            </SignedOut>

            <SignedIn>
              {mounted && (
                <UserButton
                  appearance={{
                    baseTheme: isDark ? dark : undefined,
                    elements: {
                      avatarBox: {
                        width: 35,
                        height: 35,
                      },
                    },
                  }}
                />
              )}
            </SignedIn>
          </div>
        </nav>

        {/* Mobile navigation */}
        <div className="flex items-center min-[1075px]:hidden">
          <PublicDropDownMenu />
        </div>
      </div>
    </header>
  );
}
