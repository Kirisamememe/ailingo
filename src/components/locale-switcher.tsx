"use client";

import { useParams } from "next/navigation";
import { Check, ChevronRight, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, i18n } from "@/i18n/locale";
import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  className?: string;
  variant?: "ghost" | "outline";
  side?: "top" | "bottom" | "left" | "right";
  align?: "end" | "center" | "start";
  sideOffset?: number;
};

/**
 * LocaleSwitcher
 */
export const LocaleSwitcher = ({
  className,
  variant = "outline",
  side = "right",
  align = "end",
  sideOffset = -2,
}: Props) => {
  const t = useTranslations("sidebar.footer");
  const params = useParams<{ locale: string }>();
  const pathname = usePathname();
  const localeParam = params.locale;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size="sm"
            className={cn(
              "h-9 w-full cursor-pointer justify-start active:scale-100",
              variant === "outline" && "size-10 w-auto justify-center p-0",
              className,
            )}
          >
            <Languages size={16} />
            {variant === "ghost" && (
              <>
                {t("language")}
                <ChevronRight className="ml-auto" size={16} />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} side={side} sideOffset={sideOffset}>
          {LOCALES.map((locale, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={pathname} locale={locale}>
                <Check
                  size={16}
                  className={cn(locale !== localeParam && "text-transparent", "mr-2")}
                />
                {i18n.locales[locale]}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
