"use client";

import { FlexRow } from "@/components/ui/flexbox";
import { Headline } from "@/components/ui/typography";

type Props = {
  children: React.ReactNode;
};

/**
 * HeaderWrapper
 */
export const HeaderWrapper: React.FC<Props> = ({ children }) => {
  return (
    <FlexRow className="w-full max-w-360 shrink-0 items-center justify-between px-4 pt-8 pb-2 shadow-[0_1px_0_0_hsla(var(--foreground)/0.1)] backdrop-blur-xl">
      <FlexRow p={3} gap={2} center>
        <Headline size={24}>{children}</Headline>
      </FlexRow>
    </FlexRow>
  );
};
