"use client";

import { useTranslations } from "next-intl";
import { modelListTuple } from "@/lib/ai/constants";
import type { AIModel } from "@/lib/ai/types";
import { Submit } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Form, FormField, SelectFormItem, TextareaItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectItem } from "@/components/ui/select";
import { Headline } from "@/components/ui/typography";
import { setCookie } from "../../../_actions/cookies";
import { StopButton } from "../../../_components/stop-btn";
import { useWritingCorrection } from "../../_hooks/writing-provider";
import { LANGUAGES } from "@/drizzle/schema";
import { type LanguageCode } from "@/types";

/**
 * 作文修正リクエストフォーム
 */
export const RequestForm = () => {
  const t = useTranslations("writingCorrection.requestForm");
  const { form, isLoading, submit } = useWritingCorrection();

  return (
    <Form {...form}>
      <ScrollArea className="bg-card/50 h-full w-full max-w-96 min-w-80 rounded-lg border">
        <form onSubmit={form.handleSubmit(submit)} className="p-4">
          <Headline size={20} mb={3}>
            {t("title")}
          </Headline>
          <FlexColumn gap={6}>
            <FormField
              control={form.control}
              name="original"
              render={({ field }) => (
                <TextareaItem
                  label={t("original.label")}
                  lang={form.getValues("targetLanguage")}
                  hiddenLabel
                  description={t("original.description")}
                  placeholder={t("original.placeholder")}
                  className="[&[lang='en-US'],&[lang='en-GB']]:font-english-writing mb-1 h-64 leading-relaxed tracking-wide md:text-base"
                  i18nNameSpace="writingCorrection.requestForm.original"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <TextareaItem
                  label={t("context.label")}
                  description={t("context.description")}
                  placeholder={t("context.placeholder")}
                  className="mb-1 h-24"
                  i18nNameSpace="writingCorrection.requestForm.context"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="targetLanguage"
              render={() => (
                <SelectFormItem
                  label={t("targetLanguage.label")}
                  value={form.getValues("targetLanguage")}
                  onValueChange={(value) => {
                    form.setValue("targetLanguage", value as LanguageCode);
                    void setCookie("WRITING_CORRECTION_TARGET_LANGUAGE", value);
                  }}
                  description={t("targetLanguage.description")}
                  placeholder={t("targetLanguage.placeholder")}
                >
                  {Object.entries(LANGUAGES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedbackLanguage"
              render={() => (
                <SelectFormItem
                  label={t("feedbackLanguage.label")}
                  value={form.getValues("feedbackLanguage")}
                  onValueChange={(value) => {
                    form.setValue("feedbackLanguage", value as LanguageCode);
                    void setCookie("WRITING_CORRECTION_FEEDBACK_LANGUAGE", value);
                  }}
                  description={t("feedbackLanguage.description")}
                  placeholder={t("feedbackLanguage.placeholder")}
                >
                  {Object.entries(LANGUAGES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={() => (
                <SelectFormItem
                  label={t("model.label")}
                  value={form.getValues("model")}
                  onValueChange={(value) => {
                    form.setValue("model", value as AIModel);
                    void setCookie("WRITING_CORRECTION_MODEL", value);
                  }}
                  description={t("model.description")}
                  placeholder={t("model.placeholder")}
                >
                  {modelListTuple.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />

            <FlexRow gap={3} className="ml-auto">
              {isLoading && <StopButton stop={stop} />}
              <Submit className="w-fit" isPending={isLoading}>
                {t("submit")}
              </Submit>
            </FlexRow>
          </FlexColumn>
        </form>
      </ScrollArea>
    </Form>
  );
};
