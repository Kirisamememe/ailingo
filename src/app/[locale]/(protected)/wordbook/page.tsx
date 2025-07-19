import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { getSession } from "@/lib/auth";
import { InsetLayoutWithPadding } from "@/components/layout";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { GenerateFormProvider } from "./_hooks/generate-form-provider";
import { StoreProvider } from "./_hooks/store-provider";
import { convertWordCardDBToClient } from "./_utils";
import { getCookie } from "../_actions/cookies";
import { wordCardService } from "@/services";
import type { LanguageCode } from "@/types";

const WordbookPage = async () => {
  const { operatorId } = await getSession();

  const modelCookie = await getCookie("WORDCARD_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;
  const translationLanguageCookie = await getCookie("WORDCARD_TRANSLATION_LANGUAGE");
  const translationLanguage = (translationLanguageCookie ?? "en-US") as LanguageCode;

  const wordCards = await wordCardService.getMany(operatorId);
  const wordCardsClient = wordCards.map(convertWordCardDBToClient);

  return (
    <StoreProvider wordCards={wordCardsClient}>
      <GenerateFormProvider model={model} translationLanguage={translationLanguage}>
        <InsetLayoutWithPadding className="w-full max-w-360 flex-row gap-0 sm:gap-4 sm:pt-5">
          <WordbookList />
          <WordbookContent />
        </InsetLayoutWithPadding>
      </GenerateFormProvider>
    </StoreProvider>
  );
};

export default WordbookPage;
