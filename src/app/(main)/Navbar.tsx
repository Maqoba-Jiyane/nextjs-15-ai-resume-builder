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

  if (!mounted) {
    return null; // Avoid rendering until the component mounts
  }

  return (
    <header
      className={`shadow-sm sticky top-0 z-50 ${theme === "light" ? "bg-gray-100" : "bg-black"}`}
    >
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={"/assets/logo2.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="max-md:hidden">
            {theme === "light" ? (
              <Image
                src={"/assets/logo3.png"}
                alt="logo"
                width={213}
                height={69}
                className="rounded-full"
              />
            ) : (
              <Image
                src={"/assets/white-logo3.png"}
                alt="logo"
                width={213}
                height={69}
                className="rounded-full"
              />
            )}
          </div>
        </Link>
        {width > 1074 ? (
          <div className="flex items-end">
            <div
              className={`flex gap-5 items-center text-md ${theme === "dark" ? "text-white" : "text-black "}`}
            >
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/resumes" className="hover:text-blue-600">
                Resumes
              </Link>
              <Link href="https://www.employmentecho.co.za" target="_blank" className="hover:text-blue-600">Jobs</Link>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <Link href="/contact-us" className="hover:text-blue-600">
                Contact
              </Link>

              <div className="flex flex-col gap-3">
                <SignedOut>
                  <Button asChild size="default" variant="premium">
                    <Link href="/resumes">Get started</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <div className="flex gap-4">
                    <ThemeToggle />
                    <UserButton
                      appearance={{
                        baseTheme: theme === "dark" ? dark : undefined,
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
            </div>
          </div>
        ) : (
          <div className="flex">
            <ThemeToggle />
            <DropDownMenu />
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
