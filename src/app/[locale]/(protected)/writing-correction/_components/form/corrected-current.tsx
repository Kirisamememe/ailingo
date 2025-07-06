"use client";

import { FlexColumn } from "@/components/ui/flexbox";
import { Paragraph } from "@/components/ui/typography";
import { useWritingCorrection } from "../../_hooks/writing-provider";

/**
 * 作文修正結果
 */
export const CorrectedCurrent = () => {
  const { object } = useWritingCorrection();

  if (!object) return null;

  return (
    <FlexColumn className="bg-card/50 col-span-2 w-full rounded-lg border p-4">
      {object.corrected && (
        <FlexColumn gap={4} className="h-full min-h-36 w-full overflow-y-scroll rounded-sm">
          <Paragraph>{object.corrected}</Paragraph>
          <Paragraph className="text-muted-foreground whitespace-pre-wrap">
            {object.feedback}
          </Paragraph>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
