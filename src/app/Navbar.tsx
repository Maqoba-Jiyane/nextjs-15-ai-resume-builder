"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import PublicDropDownMenu from "@/components/PublicDropDownMenu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show the navbar on the homepage.
  if (pathname !== "/") {
    return null;
  }

  // Resolve the actual theme after hydration.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-slate-200
        bg-white/80
        text-slate-900
        backdrop-blur-md
        transition-colors duration-200

        dark:border-slate-800
        dark:bg-slate-950/80
        dark:text-slate-100
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
          gap-3 px-4 py-3
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo2.png"
            alt="Eon Resume logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />

          <div className="max-md:hidden">
            <Image
              src="/assets/logo3.png"
              alt="Eon Resume wordmark"
              width={213}
              height={69}
              className="rounded-full"
              priority
            />
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden min-[1075px]:flex items-center">
          <nav
            className="
              flex items-center gap-5
              text-sm font-medium
              text-slate-700
              dark:text-slate-200
            "
          >
            <Link
              href="/"
              className="
                transition-colors
                hover:text-sky-600
                dark:hover:text-sky-400
              "
            >
              Home
            </Link>

            <Link
              href="/resumes"
              className="
                transition-colors
                hover:text-sky-600
                dark:hover:text-sky-400
              "
            >
              Resumes
            </Link>

            <Link
              href="https://www.employmentecho.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="
                transition-colors
                hover:text-sky-600
                dark:hover:text-sky-400
              "
            >
              Jobs
            </Link>

            <Link
              href="/blog"
              className="
                transition-colors
                hover:text-sky-600
                dark:hover:text-sky-400
              "
            >
              Blog
            </Link>

            <Link
              href="/contact-us"
              className="
                transition-colors
                hover:text-sky-600
                dark:hover:text-sky-400
              "
            >
              Contact
            </Link>

            {/* Authentication */}
            <div className="flex items-center gap-4">
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
        </div>

        {/* Mobile navigation */}
        <div className="flex min-[1075px]:hidden">
          <PublicDropDownMenu />
        </div>
      </div>
    </header>
  );
}
