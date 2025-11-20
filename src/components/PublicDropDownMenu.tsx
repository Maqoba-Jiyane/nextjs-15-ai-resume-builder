import {
  ArrowDown,
  ArrowUp,
  Contact,
  FileUser,
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
          className="flex items-center gap-2"
        >
          {isOpen ? (
            <ArrowUp className="w-5 h-5" />
          ) : (
            <ArrowDown className="w-5 h-5" />
          )}
          {isOpen ? "Close" : "Open"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <House />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/user"}>
            <UserPen />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/resumes"}>
              <FileUser />
              <span>Resumes</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href={"/cover-letters"}>
              <FileUser />
              <span>Cover Letters</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild>
            <Link href={"https://www.employmentecho.co.za"}>
              <FileUser />
              <span>Jobs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/contact-us"}>
              <Contact />
              <span>Contact Us</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/help-center"}>
              <HandHelping />
              <span>Help Center</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/blog"}>
              <Rss />
              <span>Blog</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex flex-col gap-3">
              <SignedOut>
                <SignInButton>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogIn />
                    <span>Sign In</span>
                  </div>
                </SignInButton>
                <SignUpButton>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User />
                    <span>Sign Up</span>
                  </div>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <div className="flex items-center gap-2 text-red-500 cursor-pointer">
                    <LogOut />
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
