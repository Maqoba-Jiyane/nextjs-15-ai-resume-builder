'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import {dark} from '@clerk/themes'
import { useTheme } from "next-themes";

function Navbar() {
  const {theme} = useTheme();
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full filter hue-rotate-90"
          />
          <span className="text-lg font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
        <ThemeToggle/>
        <UserButton appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          elements: {
            avatarBox: {
              width: 35,
              height: 35
            }
          }
        }}>
          {/* <UserButton.MenuItems>
            <UserButton.Link label="Billing"
            labelIcon={<CreditCard className="size-4" />}
            href="/billing"/>
          </UserButton.MenuItems> */}
        </UserButton>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
