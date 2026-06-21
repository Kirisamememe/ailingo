"use client";

import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { Badge } from "@/components/ui/badge";
import { Submit } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Form, FormField, SelectFormItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Headline } from "@/components/ui/typography";
import { setCookie } from "../../_actions/cookies";
import { StopButton } from "../../_components/stop-btn";
import { useGlobalStore } from "../../_hooks/global-store-provider";
import type { multipleChoiceQuestionAIRequestSchema } from "../_schema";
import { LanguageSetting } from "./language-setting";

type Props = {
  form: UseFormReturn<z.infer<typeof multipleChoiceQuestionAIRequestSchema>>;
  submit: (input: z.infer<typeof multipleChoiceQuestionAIRequestSchema>) => void;
  isLoading: boolean;
  stop: () => void;
};

/**
 * 複数選択問題生成フォーム
 */
export const GenerateForm: React.FC<Props> = ({ form, submit, isLoading, stop }) => {
  const t = useTranslations("input.multipleChoiceQuestion");

  const dailyNewWords = useGlobalStore((state) => state.dailyNewEntries);
  const dailyReviewWords = useGlobalStore((state) => state.dailyReviewEntries);

  const onSubmit = (data: z.infer<typeof multipleChoiceQuestionAIRequestSchema>) => {
    submit({ ...data, entries: [...dailyNewWords, ...dailyReviewWords] });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card relative flex flex-col gap-3 rounded-lg border p-4"
      >
        <FlexColumn gap={2}>
          <Headline>今日の新単語</Headline>
          <FlexRow gap={2}>
            {dailyNewWords.map((word) => (
              <Badge variant="outline" key={word.id}>
                {word.entry}
              </Badge>
            ))}
          </FlexRow>
        </FlexColumn>
        {!!dailyReviewWords.length && (
          <FlexColumn gap={2}>
            <Headline>今日の復習単語</Headline>
            <FlexRow>
              {dailyReviewWords.map((word) => (
                <Badge variant="outline" key={word.id}>
                  {word.entry}
                </Badge>
              ))}
            </FlexRow>
          </FlexColumn>
        )}
        <FlexRow>
          <LanguageSetting form={form} />
          <FormField
            control={form.control}
            name="model"
            render={() => (
              <SelectFormItem
                label={t("generateForm.model.label")}
                hiddenLabel
                value={form.getValues("model")}
                onValueChange={(value) => {
                  form.setValue("model", value as AIModel);
                  void setCookie("MULTIPLE_CHOICE_QUESTION_MODEL", value);
                }}
                description={t("generateForm.model.description")}
                placeholder={t("generateForm.model.placeholder")}
                variant="ghost"
                align="end"
                alignOffset={-8}
                parentClass="h-fit [&>button]:text-xs [&>button>svg]:size-3 w-fit"
              >
                {modelListTuple.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectFormItem>
            )}
          />
          <StopButton stop={stop}>{t("stop")}</StopButton>
          <FlexRow gap={3}>
            <Submit isPending={isLoading}>{t("generateWithDailyWords")}</Submit>
            <Submit isPending={isLoading}>{t("generateWithRandomWords")}</Submit>
          </FlexRow>
        </FlexRow>
      </form>
    </Form>
  );
};
