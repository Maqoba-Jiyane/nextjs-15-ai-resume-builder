"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
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
          <>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
              <Link href="/resumes">
                <Button variant="outline">Resumes</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline">Blog</Button>
              </Link>
            </div>{" "}
            <div className="flex items-center gap-3">
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
          </>
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