"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import DropDownMenu from "@/components/PublicDropDownMenu";
import { useScreenWidth } from "@/hooks/useScreenWidth";

function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const width = useScreenWidth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo2.png"
            alt="Eon Resume logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="max-md:hidden">
            <Image
              src={isDark ? "/assets/white-logo3.png" : "/assets/logo3.png"}
              alt="Eon Resume wordmark"
              width={213}
              height={69}
              className="rounded-full"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        {width > 1074 ? (
          <div className="flex items-center">
            <nav
              className={`flex items-center gap-5 text-sm ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              <Link href="/" className="hover:text-sky-400">
                Home
              </Link>
              <Link href="/resumes" className="hover:text-sky-400">
                Resumes
              </Link>
              {/* <Link href="/cover-letters" className="hover:text-sky-400">
                Cover Letters
              </Link> */}
              <Link
                href="https://www.employmentecho.co.za"
                target="_blank"
                className="hover:text-sky-400"
              >
                Jobs
              </Link>
              <Link href="/blog" className="hover:text-sky-400">
                Blog
              </Link>
              <Link href="/contact-us" className="hover:text-sky-400">
                Contact
              </Link>

              <div className="flex flex-col items-end gap-3">
                <SignedOut>
                  <Button asChild size="default" variant="premium">
                    <Link href="/resumes">Get started</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
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
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        ) : (
          // Mobile: theme toggle + dropdown menu
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropDownMenu />
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
