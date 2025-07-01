import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { getSession } from "@/lib/auth";
import { languageToLocale } from "@/lib/utils";
import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexRow } from "@/components/ui/flexbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { WordbookProvider } from "./_hooks/wordbook-provider";
import { getCookie } from "../_actions/cookies";
import { wordCardService } from "@/services";
import type { LanguageCode } from "@/types";

const WordbookPage = async () => {
  const { operatorId } = await getSession();
  const wordCards = await wordCardService.getMany(operatorId);
  const wordList = wordCards.map((wordCard) => ({
    id: wordCard.id,
    word: wordCard.word,
    language: languageToLocale(wordCard.language),
  }));

  const modelCookie = await getCookie("WORDCARD_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;
  const translationLanguageCookie = await getCookie("WORDCARD_TRANSLATION_LANGUAGE");
  const translationLanguage = (translationLanguageCookie ?? "en-US") as LanguageCode;

  return (
    <WordbookProvider model={model} translationLanguage={translationLanguage}>
      <InsetLayoutWithPadding>
        <FlexRow className="@[36rem]:bg-card/50 max-h-[calc(100dvh-3.5rem)] w-full flex-row-reverse gap-0 border-t sm:flex-row @[36rem]:gap-4 @[36rem]:rounded-lg @[36rem]:border @[36rem]:p-4 @[40rem]:max-h-[calc(100dvh-4.5rem)]">
          <WordbookList wordList={wordList} />
          <ScrollArea className="@[36rem]:bg-card/50 relative h-full w-full border-r p-3 @[36rem]:rounded-md @[36rem]:border @[36rem]:p-6 [&_[data-slot='scroll-area-scrollbar']]:mr-1 [&_[data-slot='scroll-area-scrollbar']]:py-2">
            <WordbookContent wordCards={wordCards} />
          </ScrollArea>
        </FlexRow>
      </InsetLayoutWithPadding>
    </WordbookProvider>
  );
};

export default WordbookPage;
