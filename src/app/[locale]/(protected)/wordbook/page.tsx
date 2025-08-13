import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { getSession } from "@/lib/auth";
import { InsetLayoutNoPadding } from "@/components/layout";
import { WordbookContent } from "./_components/content";
import { WordbookList } from "./_components/list";
import { GenerateFormProvider } from "./_hooks/generate-form-provider";
import { StoreProvider } from "./_hooks/store-provider";
import { getCookie } from "../_actions/cookies";
import { wordCardService } from "@/services";
import type { LanguageCode } from "@/types";

const WordbookPage = async () => {
  const { operatorId } = await getSession();

  const modelCookie = await getCookie("WORDCARD_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;
  const translationLanguageCookie = await getCookie("WORDCARD_TRANSLATION_LANGUAGE");
  const translationLanguage = (translationLanguageCookie ?? "ja") as LanguageCode;

  const wordCards = await wordCardService.getMany(operatorId);

  return (
    <StoreProvider wordCards={wordCards}>
      <GenerateFormProvider model={model} translationLanguage={translationLanguage}>
        <InsetLayoutNoPadding className="w-full max-w-360 flex-row">
          <WordbookList />
          <WordbookContent />
        </InsetLayoutNoPadding>
      </GenerateFormProvider>
    </StoreProvider>
  );
};

export default WordbookPage;
