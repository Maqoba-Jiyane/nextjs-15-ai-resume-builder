"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          <Sun
            className="
              size-[1.2rem]
              rotate-0 scale-100
              transition-all
              dark:-rotate-90 dark:scale-0
            "
          />

          <Moon
            className="
              absolute size-[1.2rem]
              rotate-90 scale-0
              transition-all
              dark:rotate-0 dark:scale-100
            "
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {(["light", "dark", "system"] as const).map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setTheme(option)}
            className="flex items-center justify-between"
          >
            <span className="capitalize">{option}</span>

            {mounted && theme === option && <Check className="ml-3 size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
