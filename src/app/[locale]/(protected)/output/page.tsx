import { type AIModel, modelListTuple } from "@/lib/ai";
import { InsetLayoutWithPadding } from "@/components/layout";
import { FlexRow } from "@/components/ui/flexbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WritingCorrectionProvider } from "./_hooks/writing-provider";
import { getCookie } from "../_actions/cookies";
import { Corrected } from "./_components/form/corrected";
import { RequestForm } from "./_components/form/request-form";
import { writingService } from "@/services";
import type { LanguageCode } from "@/types";

const WritingCorrection = async () => {
  const modelCookie = await getCookie("WRITING_CORRECTION_MODEL");
  const model = (modelCookie ?? modelListTuple[5]) as AIModel;

  const targetLanguageCookie = await getCookie("WRITING_CORRECTION_TARGET_LANGUAGE");
  const targetLanguage = (targetLanguageCookie ?? "en-US") as LanguageCode;

  const feedbackLanguageCookie = await getCookie("WRITING_CORRECTION_FEEDBACK_LANGUAGE");
  const feedbackLanguage = (feedbackLanguageCookie ?? "ja") as LanguageCode;

  const writingCorrections = await writingService.findMany();

  return (
    <InsetLayoutWithPadding className="relative">
      <WritingCorrectionProvider
        model={model}
        targetLanguage={targetLanguage}
        feedbackLanguage={feedbackLanguage}
      >
        <FlexRow className="h-full sm:max-h-[calc(100dvh-4.5rem)]" gap={4}>
          <ScrollArea className="bg-card/50 h-full w-full rounded-lg border">
            <Corrected writings={writingCorrections} />
          </ScrollArea>
          <RequestForm />
        </FlexRow>
      </WritingCorrectionProvider>
    </InsetLayoutWithPadding>
  );
};

export default WritingCorrection;
