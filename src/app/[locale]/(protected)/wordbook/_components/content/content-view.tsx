import { languageToLocale } from "@/lib/utils";
import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { BasicInfo } from "./basic";
import { Example } from "./example/example";
import { Extra } from "./extra";
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
    <FlexColumn gap={6} className="w-full">
      <BasicInfo
        createdAt={wordCard.createdAt}
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
      <Separator />
      <Extra
        derivatives={wordCard.derivatives ?? ""}
        synonyms={wordCard.synonyms ?? ""}
        antonyms={wordCard.antonyms ?? ""}
      />
    </FlexColumn>
  );
};
