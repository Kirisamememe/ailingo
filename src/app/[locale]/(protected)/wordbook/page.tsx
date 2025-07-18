import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { getSession } from "@/lib/auth";
import { InsetLayoutWithPadding } from "@/components/layout";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { StoreProvider } from "./_hooks/store-provider";
import { WordbookProvider } from "./_hooks/wordbook-provider";
import { convertWordCardData } from "./_utils";
import { getCookie } from "../_actions/cookies";
import { wordCardService } from "@/services";
import type { LanguageCode } from "@/types";

const WordbookPage = async () => {
  const { operatorId } = await getSession();
  const wordCards = await wordCardService.getMany(operatorId);
  const wordCardsClient = wordCards.map(convertWordCardData);
  const wordList = wordCardsClient.map((wordCard) => {
    const { id, entry, language, phonetics, definitions, examples } = wordCard;
    return {
      id,
      entry,
      language,
      phonetics,
      definitions,
      examples,
    };
  });

  const modelCookie = await getCookie("WORDCARD_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;
  const translationLanguageCookie = await getCookie("WORDCARD_TRANSLATION_LANGUAGE");
  const translationLanguage = (translationLanguageCookie ?? "en-US") as LanguageCode;

  return (
    <StoreProvider>
      <WordbookProvider model={model} translationLanguage={translationLanguage}>
        <InsetLayoutWithPadding className="w-full max-w-360 flex-row gap-0 @[36rem]:gap-4">
          <WordbookList wordList={wordList} />
          <WordbookContent wordCards={wordCards} />
        </InsetLayoutWithPadding>
      </WordbookProvider>
    </StoreProvider>
  );
};

export default WordbookPage;
