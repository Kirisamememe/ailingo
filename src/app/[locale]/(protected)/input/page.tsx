import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { InsetLayoutWithPadding } from "@/components/layout";
import { MultipleChoiceQuestion } from "./_components/multiple-choice-question";
import { getCookie } from "../_actions/cookies";
import type { LanguageCode } from "@/types";

const InputPage = async () => {
  const modelCookie = await getCookie("MULTIPLE_CHOICE_QUESTION_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;

  const learningLanguageCookie = await getCookie("MULTIPLE_CHOICE_QUESTION_LEARNING_LANGUAGE");
  const learningLanguage = (learningLanguageCookie ?? "en") as LanguageCode;

  const translationLanguageCookie = await getCookie(
    "MULTIPLE_CHOICE_QUESTION_TRANSLATION_LANGUAGE",
  );
  const translationLanguage = (translationLanguageCookie ?? "ja") as LanguageCode;

  return (
    <InsetLayoutWithPadding className="w-full max-w-280 gap-0 sm:gap-4 sm:pt-5">
      <MultipleChoiceQuestion
        model={model}
        learningLanguage={learningLanguage}
        translationLanguage={translationLanguage}
      />
    </InsetLayoutWithPadding>
  );
};

export default InputPage;
