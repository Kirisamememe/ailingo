"use client";

import { useTranslations } from "next-intl";
import { type AIModel, modelListTuple } from "@/lib/ai";
import { Button, Submit } from "@/components/ui/button";
import { FlexRow, Flexbox } from "@/components/ui/flexbox";
import { Form, FormField, InputItem, SelectFormItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useWordbook } from "../../_hooks/wordbook-provider";
import type { Locale } from "@/i18n";
import { i18n } from "@/i18n";

/**
 * AIリクエストフォームビュー
 */
export const AiReqForm = () => {
  const { form, onSubmit, isLoading, stop } = useWordbook();
  const t = useTranslations("wordbook.newWordAIForm");

  return (
    <Form {...form}>
      <form
        className="bg-card/50 flex flex-col gap-3 rounded-lg border p-4 shadow-xs"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="words"
          render={({ field }) => (
            <InputItem
              hiddenLabel
              disabled={isLoading}
              description={t("words.description")}
              placeholder={t("words.placeholder")}
              {...field}
            />
          )}
        />
        <Flexbox className="w-full flex-col gap-2 @[40rem]:flex-row">
          <FlexRow gap={3} className="@[40rem]:mr-auto">
            <FormField
              control={form.control}
              name="model"
              render={() => (
                <SelectFormItem
                  defaultValue={form.getValues("model")}
                  onValueChange={(value) => {
                    form.setValue("model", value as AIModel);
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
            <FormField
              control={form.control}
              name="learningLanguage"
              render={() => (
                <SelectFormItem
                  defaultValue={form.getValues("learningLanguage")}
                  onValueChange={(value) => {
                    form.setValue("learningLanguage", value as Locale);
                  }}
                  description={t("learningLanguage.description")}
                  placeholder={t("learningLanguage.placeholder")}
                >
                  {Object.entries(i18n.locales).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectFormItem>
              )}
            />
          </FlexRow>
          {isLoading && (
            <Button type="button" onClick={stop} variant="destructive">
              {t("stop")}
            </Button>
          )}
          <Submit type="submit" isPending={isLoading}>
            {t("generate")}
          </Submit>
        </Flexbox>
      </form>
    </Form>
  );
};
