import { FlexRow } from "@/components/ui/flexbox";
import { FlexColumn } from "@/components/ui/flexbox";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCard: WordCard;
};

/**
 * ワードブックコンテンツビュー
 */
export const WordbookContentView: React.FC<Props> = ({ wordCard }) => {
  return (
    <FlexColumn>
      <FlexRow>
        <h1>{wordCard.word}</h1>
      </FlexRow>
      <FlexRow>
        <h2>{wordCard.phonetics}</h2>
      </FlexRow>
      <FlexRow>
        <h2>{wordCard.definitions}</h2>
      </FlexRow>
      <FlexRow>
        <h2>{wordCard.example1}</h2>
      </FlexRow>
    </FlexColumn>
  );
};
