import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { BasicInfo } from "./basic";
import { Example } from "./example/example";
import { Extra } from "./extra";
import { WordbookContentFooter } from "./footer/footer";
import type { WordCard } from "@/types";

type Props = {
  wordCard: WordCard;
};

/**
 * ワードブックコンテンツビュー
 */
export const WordbookContentView: React.FC<Props> = ({ wordCard }) => {
  return (
    <FlexColumn gap={6} className="w-full shrink-0 p-4 sm:p-6">
      <BasicInfo
        entry={wordCard.entry}
        phonetics={wordCard.phonetics}
        definitions={wordCard.definitions}
        language={wordCard.language}
      />
      <Separator />
      <FlexColumn gap={4}>
        <Example
          key={`${wordCard.id}-${wordCard.entry}-example-${wordCard.example1}`}
          example={wordCard.example1}
          language={wordCard.language}
        />
        {wordCard.example2 && (
          <Example
            key={`${wordCard.id}-${wordCard.entry}-example-${wordCard.example2}`}
            example={wordCard.example2}
            language={wordCard.language}
          />
        )}
        {wordCard.example3 && (
          <Example
            key={`${wordCard.id}-${wordCard.entry}-example-${wordCard.example3}`}
            example={wordCard.example3}
            language={wordCard.language}
          />
        )}
      </FlexColumn>
      <Extra
        collocations={wordCard.collocations ?? ""}
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
