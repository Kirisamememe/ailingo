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
    <FlexRow className="w-full shrink-0 items-center justify-between px-4 pt-6">
      <FlexRow p={3} gap={2} center>
        <Headline size={24}>{children}</Headline>
      </FlexRow>
    </FlexRow>
  );
};
