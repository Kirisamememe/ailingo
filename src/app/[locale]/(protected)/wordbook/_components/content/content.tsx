"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FlexColumn } from "@/components/ui/flexbox";
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
  const wordCardId = Number(searchParams.get("wordCardId"));
  const wordCard = wordCards.find((wordCard) => wordCard.id === wordCardId);

  return (
    <FlexColumn className="bg-card/50 sticky top-12 h-fit min-h-[calc(100vh-8rem)] w-full rounded-md border p-6">
      {wordCard && (
        <Suspense>
          <WordbookContentView wordCard={wordCard} />
        </Suspense>
      )}
    </FlexColumn>
  );
};
