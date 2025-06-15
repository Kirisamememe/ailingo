import { languageToLocale } from "@/lib/utils";
import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { BasicInfo } from "./basic";
import { Example } from "./example/example";
import { Extra } from "./extra";
import { WordbookContentFooter } from "./footer/footer";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCard: WordCard;
};

/**
 * ワードブックコンテンツビュー
 */
export const WordbookContentView: React.FC<Props> = ({ wordCard }) => {
  const language = languageToLocale(wordCard.language);

  return (
    <FlexColumn gap={6} className="appear w-full shrink-0">
      <BasicInfo
        word={wordCard.word}
        phonetics={wordCard.phonetics}
        definitions={wordCard.definitions}
        language={language}
      />
      <Separator />
      <FlexColumn gap={4}>
        <Example example={wordCard.example1} language={language} />
        {wordCard.example2 && <Example example={wordCard.example2} language={language} />}
        {wordCard.example3 && <Example example={wordCard.example3} language={language} />}
      </FlexColumn>
      <Extra
        derivatives={wordCard.derivatives ?? ""}
        synonyms={wordCard.synonyms ?? ""}
        antonyms={wordCard.antonyms ?? ""}
      />
      <WordbookContentFooter
        createdAt={wordCard.createdAt}
        updatedAt={wordCard.updatedAt}
        lastReviewedAt={wordCard.lastReviewedAt}
        nextReviewAt={wordCard.nextReviewAt}
        masteredAt={wordCard.masteredAt}
      />
    </FlexColumn>
  );
};
