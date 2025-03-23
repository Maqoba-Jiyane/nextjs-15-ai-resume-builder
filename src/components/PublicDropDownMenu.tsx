import { ArrowDown, ArrowUp, Contact, FileUser, HandHelping, House, LogOut } from "lucide-react";
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
import { SignOutButton,  } from "@clerk/nextjs";

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
            <Link href={"/resumes"}>
            <FileUser />
              <span>Resumes</span>
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
            <Link href={"/blog/How-to-Write-a-Resume-That-Stands-Out"}>
            <HandHelping />
              <span>Blog</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <div className="flex items-center gap-2 text-red-500 cursor-pointer">
                <LogOut />
                <span>Sign Out</span>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PublicDropDownMenu;
