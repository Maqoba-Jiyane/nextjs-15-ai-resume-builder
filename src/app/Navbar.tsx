"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { usePathname } from "next/navigation"; // Use this for pathname instead of useRouter()
import PublicDropDownMenu from "@/components/PublicDropDownMenu";

function Navbar() {
  const { theme } = useTheme();
  const width = useScreenWidth();

  // State to check if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // Use usePathname from next/navigation to get the current path
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); // This will run once the component is mounted on the client
  }, []);

  // Only use pathname after the component has mounted on the client side
  if (!isMounted || pathname !== "/") {
    return null; // Hide the navbar on all pages except the home page
  }

  return (
    <header className="shadow-sm bg-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={'/assets/logo2.png'}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className={`max-md:hidden`}>
          <Image
            src={'/assets/logo3.png'}
            alt="logo"
            width={213}
            height={69}
            className="rounded-full"
          />
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
            <PublicDropDownMenu />
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
