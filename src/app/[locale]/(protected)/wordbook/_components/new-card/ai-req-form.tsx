"use client";

import { useEffect, useRef } from "react";
import { MessageSquareOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { type AIModel, modelListTuple } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { Button, Submit } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Form, FormField, SelectFormItem, TextareaItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Headline } from "@/components/ui/typography";
import { setCookie } from "../../../_actions/cookies";
import { useWordbook } from "../../_hooks/wordbook-provider";
import type { Locale } from "@/i18n";
import { i18n } from "@/i18n";

/**
 * AIリクエストフォームビュー
 */
export const AiReqForm = () => {
  const { object, form, onSubmit, isLoading, stop } = useWordbook();
  const t = useTranslations("wordbook.newWordAIForm");
  const scrollRef = useRef<HTMLDivElement>(null);

  // object.wordcardsが更新されるたびに一番下にスクロール
  useEffect(() => {
    if (!object?.wordcards || !scrollRef.current || !isLoading) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [object?.wordcards, isLoading]);

  return (
    <Form {...form}>
      <form
        className="flex h-full w-full flex-col gap-6 rounded-lg shadow-xs"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FlexColumn className="shrink-0">
          <Headline size={20} mx={1} mb={3}>
            {t("title")}
          </Headline>
          <FormField
            control={form.control}
            name="words"
            render={({ field }) => (
              <TextareaItem
                label={t("words.label")}
                hiddenLabel
                disabled={isLoading}
                description={t("words.description")}
                placeholder={t("words.placeholder")}
                className="mb-1 h-32"
                {...field}
              />
            )}
          />
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
                  void setCookie("WORDCARD_MODEL", value);
                }}
                description={t("model.description")}
                placeholder={t("model.placeholder")}
                className="text-muted-foreground hover:text-foreground w-fit border-none bg-transparent px-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
              >
                {modelListTuple.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectFormItem>
            )}
          />
        </FlexColumn>
        <FlexRow className="w-full shrink-0 gap-4">
          <FormField
            control={form.control}
            name="learningLanguage"
            render={() => (
              <SelectFormItem
                label={t("learningLanguage.label")}
                hiddenDescription={false}
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
          <FormField
            control={form.control}
            name="translationLanguage"
            render={() => (
              <SelectFormItem
                label={t("translationLanguage.label")}
                hiddenDescription={false}
                defaultValue={form.getValues("translationLanguage")}
                onValueChange={(value) => {
                  form.setValue("translationLanguage", value as Locale);
                }}
                description={t("translationLanguage.description")}
                placeholder={t("translationLanguage.placeholder")}
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
        {object?.wordcards && (
          <FlexColumn
            ref={scrollRef}
            className="bg-card h-full max-h-96 min-h-36 w-full overflow-y-scroll rounded-sm p-4"
          >
            <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
              {JSON.stringify(object.wordcards, null, 2)}
            </pre>
          </FlexColumn>
        )}
        <FlexRow className="sticky bottom-4 mx-auto mt-auto mb-4 w-full shrink-0 items-center justify-center gap-6">
          <Submit
            type="submit"
            isPending={isLoading}
            size="lg"
            className="h-12 w-48 rounded-full text-base font-semibold"
          >
            {t("generate")}
          </Submit>
          {isLoading && (
            <Button
              type="button"
              onClick={stop}
              variant="destructive"
              size="icon"
              aria-label={t("stop")}
              className={cn(
                "absolute right-4",
                "border-destructive text-destructive hover:bg-destructive/10 size-10 rounded-full border bg-transparent font-semibold",
                "dark:border-destructive dark:text-destructive dark:hover:bg-destructive/10 dark:bg-transparent",
              )}
            >
              <MessageSquareOff className="size-5" />
            </Button>
          )}
        </FlexRow>
      </form>
    </Form>
  );
};
