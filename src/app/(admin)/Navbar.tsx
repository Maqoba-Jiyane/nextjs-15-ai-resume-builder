"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import DropDownMenu from "@/components/DropDownMenu";
import { useScreenWidth } from "@/hooks/useScreenWidth";

function Navbar() {
  const { theme } = useTheme();
  const width = useScreenWidth();

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
          <span className="text-lg font-bold tracking-tight hidden md:flex">
            Eon Resume
          </span>
        </Link>
        {width > 1074 ? (
          <>
            <div className="flex gap-3">
              <Link href="/admin/download-requests">
                <Button variant="outline">Download Requests</Button>
              </Link>
              <Link href="/admin/promotions">
                <Button variant="outline">Promotions</Button>
              </Link>
              <Link href="/admin/unpaid-resumes">
                <Button variant="outline">Unpaid Resumes</Button>
              </Link>
              <Link href="/admin/half-way-payment">
                <Button variant="outline">Half Way Payment</Button>
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
