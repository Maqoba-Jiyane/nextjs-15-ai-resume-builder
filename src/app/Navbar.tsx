"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { usePathname } from "next/navigation"; // Use this for pathname instead of useRouter()
import PublicDropDownMenu from "@/components/PublicDropDownMenu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/assets/logo2.png"}
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className={`max-md:hidden`}>
              <Image
                src={"/assets/logo3.png"}
                alt="logo"
                width={213}
                height={69}
                className="rounded-full"
              />
            </div>
          </Link>
        </div>
        {width > 1074 ? (
          <div className="flex items-end">
            <div
              className={`flex gap-5 items-center text-md ${theme === "dark" ? "text-white" : "text-black "}`}
            >
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/resumes" className="hover:text-blue-600">Resumes</Link>
              <Link href="/employmentecho.co.za" className="hover:text-blue-600">Jobs</Link>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <Link href="/contact-us" className="hover:text-blue-600">Contact</Link>
              
            <div className="flex flex-col gap-3">
              <SignedOut>
              <Button asChild size="default" variant="premium">
                <Link href="/resumes">Get started</Link>
              </Button>
              </SignedOut>
              <SignedIn>
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
              </SignedIn>
            </div>
            </div>
          </div>
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
