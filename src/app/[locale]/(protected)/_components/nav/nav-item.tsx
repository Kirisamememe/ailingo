"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  href: string;
  text: string;
  blank?: boolean;
  icon?: React.ReactNode;
} & React.ComponentPropsWithRef<typeof Link>;

/**
 * NavItem
 */
export const NavItem: React.FC<Props> = ({ href, text, blank, icon, ...props }) => {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === href.split("/").pop();

  return (
    <Button
      asChild
      variant={isActive ? "coloredSecondary" : "ghost"}
      className={cn(
        "font-medium shadow-none",
        "h-fit flex-grow flex-col rounded-full py-3 text-[0.625rem]",
        "sm:h-auto sm:w-fit sm:flex-row sm:rounded-md sm:py-2 sm:text-sm",
        isActive && "font-bold",
      )}
    >
      <Link
        href={href}
        {...(blank && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
        className="[&>span]:hidden sm:[&>span]:block"
      >
        {icon}
        <span>{text}</span>
      </Link>
    </Button>
  );
};
