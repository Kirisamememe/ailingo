import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/components/ui/flexbox";
import { NavAvatar } from "./nav-avatar";
import { NavItem } from "./nav-item";
import { navItems } from "./nav-items";
import { LogoText } from "./sidebar/logo-text";
import { Link } from "@/i18n";

/**
 * Nav
 */
export const Nav = () => {
  const t = useTranslations("nav");

  return (
    <FlexRow
      className={cn(
        "z-10 w-full gap-8",
        "fixed bottom-2 left-0 justify-center px-0 py-0 backdrop-blur-none",
        "sm:bg-background/70 sm:sticky sm:top-0 sm:bottom-auto sm:justify-start sm:rounded-none sm:px-8 sm:py-4 sm:backdrop-blur-sm",
        "sm:outline] sm:outline-foreground/5 sm:outline-1",
      )}
    >
      <Link href="/home" className="hidden sm:block">
        <LogoText />
      </Link>
      <FlexRow
        className={cn(
          "relative w-full sm:w-fit sm:gap-4",
          "bg-background/70 w-[calc(100%-2rem)] rounded-full p-1 outline-[0.03125rem] outline-black/15 backdrop-blur-sm dark:outline-black/90",
          "dark:after:border-foreground/15 dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:h-full dark:after:w-full dark:after:rounded-full dark:after:border dark:after:content-['']",
          "sm:bg-transparent sm:p-0 sm:backdrop-blur-none sm:outline-none sm:after:hidden",
        )}
      >
        {navItems.map((item) => (
          <NavItem key={item.title} href={item.url} text={t(item.title)} icon={<item.icon />} />
        ))}
      </FlexRow>
      <NavAvatar />
    </FlexRow>
  );
};
