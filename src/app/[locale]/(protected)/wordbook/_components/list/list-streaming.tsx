"use client";

import { useTranslations } from "next-intl";
import { FlexRow } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import { useWordbook } from "../../_hooks/wordbook-provider";

/**
 * ワードブックリスト
 */
export const WordbookListStreaming = () => {
  const { isSaving, isLoading } = useWordbook();
  const t = useTranslations("wordbook");

  if (!isSaving && !isLoading) return null;

  return (
    <FlexRow className="bg-accent my-2 h-12 w-full shrink-0 animate-pulse items-center justify-start rounded-sm p-4">
      <Caption size={14} weight={600}>
        {t("list.generating")}
      </Caption>
    </FlexRow>
  );
};
