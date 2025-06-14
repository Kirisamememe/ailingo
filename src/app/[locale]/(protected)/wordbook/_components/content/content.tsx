"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FlexColumn } from "@/components/ui/flexbox";
import { Paragraph } from "@/components/ui/typography";
import { WordbookContentView } from "./content-view";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCards: WordCard[];
};

/**
 * ワードブックコンテンツ
 */
export const WordbookContent: React.FC<Props> = ({ wordCards }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const idParam = searchParams.get("wordCardId");
  const wordCardId = Number(idParam);
  const wordCard =
    wordCardId > 0 ? wordCards.find((wordCard) => wordCard.id === wordCardId) : undefined;

  useEffect(() => {
    if (!wordCards.length) return;
    if (idParam) return; // 既に選択されている場合は何もしない

    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("wordCardId", wordCards[0].id.toString());

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [idParam, pathname, searchParams, wordCards]);

  return (
    <FlexColumn className="bg-card/50 sticky top-12 h-fit min-h-[calc(100vh-8rem)] w-full rounded-md border p-6">
      {wordCard && (
        <Suspense>
          <WordbookContentView wordCard={wordCard} />
        </Suspense>
      )}
      {wordCardId < 0 && <Paragraph>generating...</Paragraph>}
    </FlexColumn>
  );
};
