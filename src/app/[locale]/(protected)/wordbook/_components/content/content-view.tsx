import { FlexRow } from "@/components/ui/flexbox";
import { FlexColumn } from "@/components/ui/flexbox";
import { Headline } from "@/components/ui/typography";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCard: WordCard;
};

/**
 * ワードブックコンテンツビュー
 */
export const WordbookContentView: React.FC<Props> = ({ wordCard }) => {
  return (
    <FlexColumn className="w-full gap-4">
      <Headline size={30}>{wordCard.word}</Headline>
      <FlexRow>
        <h2>{wordCard.phonetics}</h2>
      </FlexRow>
      <FlexRow>
        <h2>{wordCard.definitions}</h2>
      </FlexRow>
      <FlexColumn gap={2}>
        <h2>{wordCard.example1}</h2>
        <h2>{wordCard.example2}</h2>
        <h2>{wordCard.example3}</h2>
      </FlexColumn>
    </FlexColumn>
  );
};
