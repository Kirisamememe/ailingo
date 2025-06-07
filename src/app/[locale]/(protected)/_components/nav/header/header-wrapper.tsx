"use client";

import { cn } from "@/lib/utils";
import { useScrollState } from "@/components/providers";
import { FlexRow } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Headline } from "@/components/ui/typography";

type Props = {
  children: React.ReactNode;
};

/**
 * HeaderWrapper
 */
export const HeaderWrapper: React.FC<Props> = ({ children }) => {
  const { atTop, isGoingUp, headerFixed } = useScrollState();

  return (
    <FlexRow
      className={cn(
        "sticky top-0 z-50 h-16 w-full shrink-0 items-center justify-between shadow-[0_1px_0_0_hsla(var(--foreground)/0.1)] backdrop-blur-xl transition-transform duration-300",
        !atTop && !isGoingUp && !headerFixed && "-translate-y-16",
        headerFixed && "translate-y-0",
      )}
    >
      <FlexRow p={3} gap={2} center>
        <SidebarTrigger className="size-9" />
        <Separator orientation="vertical" className="mr-2 py-2" />
        <Headline>{children}</Headline>
      </FlexRow>
    </FlexRow>
  );
};
