"use client";

import { FlexRow } from "@/components/ui/flexbox";
import { AiReqForm } from "../new-card";

/**
 * ワードブックリスト
 */
export const WordbookListNew: React.FC = () => {
  return (
    <FlexRow className="bg-accent/60 dark:bg-accent/30 mb-2 w-full shrink-0 p-3 sm:rounded-xl">
      <AiReqForm />
    </FlexRow>
  );
};
