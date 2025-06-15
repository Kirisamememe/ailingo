"use client";

import { useTranslations } from "next-intl";
import { FlexRow } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import { useWordbook } from "../../_hooks/wordbook-provider";

/**
 * ワードブックリスト
 */
export const WordbookListStreaming = () => {
  const { isComplete } = useWordbook();
  const t = useTranslations("wordbook");

  if (isComplete) return null;

  return (
    <FlexRow className="h-13 w-full items-center justify-center">
      <Caption>{t("list.generating")}</Caption>
    </FlexRow>
  );
};
