"use client";

import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import { modelListTuple } from "@/lib/ai/constants";
import type { AIModel } from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { Submit } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Form, FormField, SelectFormItem, TextareaItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Headline } from "@/components/ui/typography";
import { LANGUAGES } from "@/constants/language";
import { setCookie } from "../../../_actions/cookies";
import { type CompositionCorrectionAIRequestSchema } from "../../_schema";
import type { LanguageCode } from "@/types/language";

type Props = {
  form: UseFormReturn<CompositionCorrectionAIRequestSchema>;
  submit: (data: CompositionCorrectionAIRequestSchema) => void;
  isLoading: boolean;
};

/**
 * 作文修正リクエストフォーム
 */
export const RequestForm: React.FC<Props> = ({ form, submit, isLoading }) => {
  const t = useTranslations("compositionCorrection.requestForm");

  return (
    <Form {...form}>
      <form
        className={cn("bg-card/50 flex h-full flex-col gap-3 rounded-lg border p-4")}
        onSubmit={form.handleSubmit(submit)}
      >
        <Headline size={20} mx={1}>
          {t("title")}
        </Headline>
        <FlexColumn className="mb-3">
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
                className="[&[lang='en-US'],&[lang='en-GB']]:font-english-writing mb-1 h-[55vh] text-base leading-relaxed tracking-wide md:text-lg"
                i18nNameSpace="compositionCorrection.requestForm.original"
                {...field}
              />
            )}
          />
          <FlexRow gap={2}>
            <FormField
              control={form.control}
              name="model"
              render={() => (
                <SelectFormItem
                  label={t("model.label")}
                  hiddenLabel
                  value={form.getValues("model")}
                  onValueChange={(value) => {
                    form.setValue("model", value as AIModel);
                    void setCookie("COMPOSITION_CORRECTION_MODEL", value);
                  }}
                  description={t("model.description")}
                  placeholder={t("model.placeholder")}
                  parentClass="w-fit"
                  variant="ghost"
                >
                  {modelListTuple.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetLanguage"
              render={() => (
                <SelectFormItem
                  label={t("targetLanguage.label")}
                  hiddenLabel
                  value={form.getValues("targetLanguage")}
                  onValueChange={(value) => {
                    form.setValue("targetLanguage", value as LanguageCode);
                  }}
                  description={t("targetLanguage.description")}
                  placeholder={t("targetLanguage.placeholder")}
                  parentClass="w-fit"
                  variant="ghost"
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
                  hiddenLabel
                  value={form.getValues("feedbackLanguage")}
                  onValueChange={(value) => {
                    form.setValue("feedbackLanguage", value as LanguageCode);
                  }}
                  description={t("feedbackLanguage.description")}
                  placeholder={t("feedbackLanguage.placeholder")}
                  parentClass="w-fit"
                  variant="ghost"
                >
                  {Object.entries(LANGUAGES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />
          </FlexRow>
        </FlexColumn>
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <TextareaItem
              label={t("context.label")}
              description={t("context.description")}
              placeholder={t("context.placeholder")}
              className="mb-1 h-24"
              i18nNameSpace="compositionCorrection.requestForm.context"
              {...field}
            />
          )}
        />

        <Submit className="w-fit" isPending={isLoading}>
          {t("submit")}
        </Submit>
      </form>
    </Form>
  );
};
