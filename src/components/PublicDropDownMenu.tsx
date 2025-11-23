"use client";

import {
  ArrowDown,
  ArrowUp,
  Contact,
  FileText,
  HandHelping,
  House,
  LogIn,
  LogOut,
  Rss,
  User,
  UserPen,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import React, { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

const PublicDropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
        >
          {isOpen ? (
            <ArrowUp className="h-5 w-5" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
          <span className="text-xs font-medium">
            {isOpen ? "Close" : "Menu"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 border-slate-700 bg-slate-900 text-slate-100">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <House className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/user">
              <UserPen className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/resumes">
              <FileText className="mr-2 h-4 w-4" />
              <span>Resumes</span>
            </Link>
          </DropdownMenuItem>

          {/* <DropdownMenuItem asChild>
            <Link href="/cover-letters">
              <FileText className="mr-2 h-4 w-4" />
              <span>Cover Letters</span>
            </Link>
          </DropdownMenuItem> */}

          <DropdownMenuItem asChild>
            <Link href="https://www.employmentecho.co.za">
              <FileText className="mr-2 h-4 w-4" />
              <span>Jobs</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/contact-us">
              <Contact className="mr-2 h-4 w-4" />
              <span>Contact Us</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/help-center">
              <HandHelping className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/blog">
              <Rss className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <div className="flex w-full flex-col gap-3">
              <SignedOut>
                <SignInButton>
                  <div className="flex cursor-pointer items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                </SignInButton>

                <SignUpButton>
                  <div className="flex cursor-pointer items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Sign Up</span>
                  </div>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <div className="flex cursor-pointer items-center gap-2 text-red-400">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </SignOutButton>
              </SignedIn>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PublicDropDownMenu;
