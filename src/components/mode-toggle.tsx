"use client";

import { ChevronRight, Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

/**
 * ModeToggle
 */
export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-full justify-start rounded-sm p-2 active:scale-100"
        >
          <Monitor size={16} className={cn("hidden", theme === "system" && "block")} />
          <Sun size={16} className={cn("hidden", theme === "light" && "block")} />
          <Moon size={16} className={cn("hidden", theme === "dark" && "block")} />
          {t("sidebar.footer.theme")}
          <ChevronRight className="ml-auto" size={16} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="-ml-1">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun size={16} />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon size={16} />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Monitor size={16} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
