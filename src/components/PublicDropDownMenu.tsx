"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import {
  BriefcaseBusiness,
  Check,
  Contact,
  FileText,
  HandHelping,
  House,
  LogIn,
  LogOut,
  Menu,
  Rss,
  User,
  UserPen,
  X,
} from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

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

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/resumes",
    label: "Resumes",
    icon: FileText,
  },
  {
    href: "https://www.employmentecho.co.za",
    label: "Jobs",
    icon: BriefcaseBusiness,
    external: true,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: Rss,
  },
] as const;

const SUPPORT_ITEMS = [
  {
    href: "/contact-us",
    label: "Contact Us",
    icon: Contact,
  },
  {
    href: "/help-center",
    label: "Help Center",
    icon: HandHelping,
  },
] as const;

export default function PublicDropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemStyles = (active = false) =>
    cn(
      "flex min-h-11 w-full cursor-pointer",
      "items-center gap-3 rounded-md px-3 py-2.5",
      "text-sm font-medium",
      "outline-none transition-colors",

      "focus:bg-slate-100",
      "dark:focus:bg-slate-800",

      active
        ? ["bg-sky-50 text-sky-700", "dark:bg-sky-500/10", "dark:text-sky-400"]
        : [
            "text-slate-700",
            "hover:bg-slate-100",
            "dark:text-slate-200",
            "dark:hover:bg-slate-800",
          ],
    );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {/* Menu trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className={cn(
            "flex h-10 items-center gap-2",
            "rounded-md border px-3",
            "text-sm font-medium shadow-sm",
            "transition-colors duration-200",

            "border-slate-200",
            "bg-white text-slate-800",
            "hover:bg-slate-100",
            "hover:text-sky-700",

            "dark:border-slate-700",
            "dark:bg-slate-900",
            "dark:text-slate-100",
            "dark:hover:bg-slate-800",
            "dark:hover:text-sky-400",

            "focus-visible:ring-2",
            "focus-visible:ring-sky-500/50",
          )}
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}

          <span>{isOpen ? "Close" : "Menu"}</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "z-[60] w-[min(19rem,calc(100vw-1.5rem))]",
          "max-h-[min(75dvh,36rem)]",
          "overflow-y-auto overscroll-contain",
          "rounded-md border p-2 shadow-xl",

          "border-slate-200",
          "bg-white text-slate-900",
          "shadow-slate-900/10",

          "dark:border-slate-800",
          "dark:bg-slate-950",
          "dark:text-slate-100",
          "dark:shadow-black/40",
        )}
      >
        {/* Main navigation */}
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className="
              px-3 py-2 text-[11px]
              font-semibold uppercase
              tracking-wider text-slate-500
              dark:text-slate-400
            "
          >
            Main Navigation
          </DropdownMenuLabel>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            const active = !("external" in item) && isActive(item.href);

            return (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={itemStyles(active)}
              >
                <Link
                  href={item.href}
                  {...("external" in item && item.external
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0",
                      active
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-slate-500 dark:text-slate-400",
                    )}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <Check
                      className="
                        size-4 text-sky-600
                        dark:text-sky-400
                      "
                    />
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator
          className="
            my-2 bg-slate-200
            dark:bg-slate-800
          "
        />

        {/* Support */}
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className="
              px-3 py-2 text-[11px]
              font-semibold uppercase
              tracking-wider text-slate-500
              dark:text-slate-400
            "
          >
            Support
          </DropdownMenuLabel>

          {SUPPORT_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={itemStyles(active)}
              >
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0",
                      active
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-slate-500 dark:text-slate-400",
                    )}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <Check
                      className="
                        size-4 text-sky-600
                        dark:text-sky-400
                      "
                    />
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator
          className="
            my-2 bg-slate-200
            dark:bg-slate-800
          "
        />

        <DropdownMenuSeparator className="my-2 bg-slate-200 dark:bg-slate-800" />

        <DropdownMenuGroup>
          <DropdownMenuLabel
            className="
      px-3 py-2 text-[11px]
      font-semibold uppercase tracking-wider
      text-slate-500 dark:text-slate-400
    "
          >
            Appearance
          </DropdownMenuLabel>

          <div className="grid grid-cols-3 gap-2 px-2 pb-2">
            {[
              {
                value: "light",
                label: "Light",
                icon: Sun,
              },
              {
                value: "dark",
                label: "Dark",
                icon: Moon,
              },
              {
                value: "system",
                label: "System",
                icon: Monitor,
              },
            ].map((option) => {
              const Icon = option.icon;

              const selected = mounted && theme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={!mounted}
                  aria-pressed={selected}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "flex flex-col items-center justify-center",
                    "gap-2 rounded-md border px-2 py-3",
                    "text-xs font-medium transition-colors",

                    selected
                      ? [
                          "border-sky-500",
                          "bg-sky-50 text-sky-700",
                          "dark:bg-sky-500/10",
                          "dark:text-sky-400",
                        ]
                      : [
                          "border-slate-200",
                          "bg-white text-slate-600",
                          "hover:bg-slate-100",

                          "dark:border-slate-700",
                          "dark:bg-slate-900",
                          "dark:text-slate-300",
                          "dark:hover:bg-slate-800",
                        ],
                  )}
                >
                  <Icon className="size-5" />

                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </DropdownMenuGroup>

        {/* Account */}
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className="
              px-3 py-2 text-[11px]
              font-semibold uppercase
              tracking-wider text-slate-500
              dark:text-slate-400
            "
          >
            Account
          </DropdownMenuLabel>

          <SignedOut>
            <SignInButton mode="modal">
              <DropdownMenuItem
                className={itemStyles()}
                onSelect={(event) => {
                  // Allow Clerk to open its modal
                  // after Radix closes the menu.
                  event.preventDefault();
                  setIsOpen(false);
                }}
              >
                <LogIn
                  className="
                    size-[18px] text-slate-500
                    dark:text-slate-400
                  "
                />

                <span>Sign In</span>
              </DropdownMenuItem>
            </SignInButton>

            <SignUpButton mode="modal">
              <DropdownMenuItem
                className={cn(
                  itemStyles(),
                  "mt-1",
                  "bg-sky-600 text-white",
                  "hover:bg-sky-700",
                  "focus:bg-sky-700",
                  "focus:text-white",
                  "dark:bg-sky-500",
                  "dark:text-slate-950",
                  "dark:hover:bg-sky-400",
                  "dark:focus:bg-sky-400",
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  setIsOpen(false);
                }}
              >
                <User className="size-[18px]" />

                <span>Create an Account</span>
              </DropdownMenuItem>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <DropdownMenuItem asChild className={itemStyles(isActive("/user"))}>
              <Link href="/user" onClick={() => setIsOpen(false)}>
                <UserPen
                  className="
                    size-[18px] text-slate-500
                    dark:text-slate-400
                  "
                />

                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <SignOutButton>
              <DropdownMenuItem
                className={cn(
                  itemStyles(),
                  "mt-1 text-red-600",
                  "hover:bg-red-50",
                  "focus:bg-red-50",
                  "focus:text-red-700",
                  "dark:text-red-400",
                  "dark:hover:bg-red-500/10",
                  "dark:focus:bg-red-500/10",
                )}
              >
                <LogOut className="size-[18px]" />

                <span>Sign Out</span>
              </DropdownMenuItem>
            </SignOutButton>
          </SignedIn>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
