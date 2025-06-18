import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { getSession } from "@/lib/auth";
import { languageToLocale } from "@/lib/utils";
import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { WordbookProvider } from "./_hooks/wordbook-provider";
import { getCookie } from "../_actions/cookies";
import type { Locale } from "@/i18n";
import { wordCardService } from "@/services";

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
  const translationLanguage = (translationLanguageCookie ?? "en") as Locale;

  return (
    <WordbookProvider model={model} translationLanguage={translationLanguage}>
      <InsetLayoutWithPadding>
        <FlexRow className="@[36rem]:bg-card/50 max-h-[calc(100dvh-3.5rem)] w-full flex-row-reverse gap-0 border-t sm:flex-row @[36rem]:gap-4 @[36rem]:rounded-lg @[36rem]:border @[36rem]:p-4 @[40rem]:max-h-[calc(100dvh-4.5rem)]">
          <WordbookList wordList={wordList} />
          <FlexColumn className="@[36rem]:bg-card/50 relative h-full w-full overflow-y-scroll border-r p-3 @[36rem]:rounded-md @[36rem]:border @[36rem]:p-6">
            <WordbookContent wordCards={wordCards} />
          </FlexColumn>
        </FlexRow>
      </InsetLayoutWithPadding>
    </WordbookProvider>
  );
};

export default WordbookPage;
