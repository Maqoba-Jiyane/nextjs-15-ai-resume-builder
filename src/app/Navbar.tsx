"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import PublicDropDownMenu from "@/components/PublicDropDownMenu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";

function Navbar() {
  const { theme } = useTheme();
  const width = useScreenWidth();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid hydration mismatch with theme / Clerk
  if (!isMounted) return null;

  const isDark = theme === "dark";

  // Only use pathname after the component has mounted on the client side
  if (!isMounted || pathname !== "/") {
    return null; // Hide the navbar on all pages except the home page
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo2.png"
              alt="Eon Resume logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="max-md:hidden">
              <Image
                src="/assets/logo3.png"
                alt="Eon Resume wordmark"
                width={213}
                height={69}
                className="rounded-full"
              />
            </div>
          </Link>
        </div>

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
              <Link href="/cover-letters" className="hover:text-sky-400">
                Cover Letters
              </Link>
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
                </SignedIn>
              </div>
            </nav>
          </div>
        ) : (
          // Mobile nav
          <div className="flex">
            <PublicDropDownMenu />
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
