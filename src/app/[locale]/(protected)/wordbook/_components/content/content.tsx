"use client";

import { useSearchParams } from "next/navigation";
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

  if (!wordCard) {
    return <div>Wordcard not found</div>;
  }

  return (
    <FlexColumn>
      <WordbookContentView wordCard={wordCard} />
    </FlexColumn>
  );
};
