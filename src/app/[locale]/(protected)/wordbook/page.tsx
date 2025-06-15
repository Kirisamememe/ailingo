import { getSession } from "@/lib/auth";
import { languageToLocale } from "@/lib/utils";
import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { WordbookProvider } from "./_hooks/wordbook-provider";
import { wordCardService } from "@/services";

const WordbookPage = async () => {
  const { operatorId } = await getSession();
  const wordCards = await wordCardService.getMany(operatorId);
  const wordList = wordCards.map((wordCard) => ({
    id: wordCard.id,
    word: wordCard.word,
    language: languageToLocale(wordCard.language),
  }));

  return (
    <WordbookProvider>
      <InsetLayoutWithPadding>
        <FlexRow className="bg-card/50 max-h-[calc(100vh-13.125rem)] w-full gap-4 rounded-lg border p-4 @[40rem]:max-h-[calc(100vh-4.5rem)]">
          <WordbookList wordList={wordList} />
          <FlexColumn className="bg-card/50 relative h-full w-full overflow-y-scroll rounded-md border p-6">
            <WordbookContent wordCards={wordCards} />
          </FlexColumn>
        </FlexRow>
      </InsetLayoutWithPadding>
    </WordbookProvider>
  );
};

export default WordbookPage;
