import { getSession } from "@/lib/auth";
import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexRow } from "@/components/ui/flexbox";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { AiReqForm } from "./_components/new-card";
import { wordCardService } from "@/services";

const WordbookPage = async () => {
  const { operatorId } = await getSession();
  const wordCards = await wordCardService.getMany(operatorId);
  const wordList = wordCards.map((wordCard) => ({
    id: wordCard.id,
    word: wordCard.word,
  }));

  return (
    <InsetLayoutWithPadding className="@[40rem]:py-0">
      <AiReqForm />
      <FlexRow className="bg-card/50 sticky top-72 w-full gap-4 rounded-lg border p-4">
        <WordbookList wordList={wordList} />
        <WordbookContent wordCards={wordCards} />
      </FlexRow>
    </InsetLayoutWithPadding>
  );
};

export default WordbookPage;
