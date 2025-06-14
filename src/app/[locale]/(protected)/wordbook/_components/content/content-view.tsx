import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { BasicInfo } from "./basic";
import { Example } from "./example/example";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCard: WordCard;
};

/**
 * ワードブックコンテンツビュー
 */
export const WordbookContentView: React.FC<Props> = ({ wordCard }) => {
  return (
    <FlexColumn gap={6} className="w-full">
      <BasicInfo
        createdAt={wordCard.createdAt}
        word={wordCard.word}
        phonetics={wordCard.phonetics}
        definitions={wordCard.definitions}
      />
      <Separator />
      <FlexColumn gap={3}>
        <Example example={wordCard.example1} />
        {wordCard.example2 && <Example example={wordCard.example2} />}
        {wordCard.example3 && <Example example={wordCard.example3} />}
      </FlexColumn>
    </FlexColumn>
  );
};
