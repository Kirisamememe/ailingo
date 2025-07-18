import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { BasicInfo } from "./basic";
import { Example } from "./example/example";
import { Extra } from "./extra";
import { WordbookContentFooter } from "./footer/footer";
import type { WordCardClient } from "@/types";

type Props = {
  wordCard: WordCardClient;
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
        {wordCard.examples.map((example) => (
          <Example
            key={`${wordCard.id}-${wordCard.entry}-example-${example.sentence}`}
            sentence={example.sentence}
            translation={example.translation}
            language={wordCard.language}
          />
        ))}
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
