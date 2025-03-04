import { ArrowDown, ArrowUp, Download, LogOut, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import React, { useState } from "react";
import Link from "next/link";
import { SignOutButton,  } from "@clerk/nextjs";

const DropDownMenu = () => {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/admin/download-requests"}>
              <Download />
              <span>Download Requests</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/admin/promotions"}>
              <TrendingUp />
              <span>Promotions</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/admin/unpaid-resumes"}>
              <Download />
              <span>Unpaid Resumes</span>
            </Link>
          </DropdownMenuItem>
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

export default DropDownMenu;
