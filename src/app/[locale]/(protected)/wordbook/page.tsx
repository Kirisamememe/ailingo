import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexRow } from "@/components/ui/flexbox";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { wordCardService } from "@/services";

const WordbookPage = async () => {
  const wordCards = await wordCardService.getMany();
  const wordList = wordCards.map((wordCard) => ({
    id: wordCard.id,
    word: wordCard.word,
  }));

  return (
    <InsetLayoutWithPadding>
      <FlexRow>
        <WordbookList wordList={wordList} />
        <WordbookContent wordCards={wordCards} />
      </FlexRow>
    </InsetLayoutWithPadding>
  );
};

export default WordbookPage;
