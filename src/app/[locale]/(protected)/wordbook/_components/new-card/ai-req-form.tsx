"use client";

import { useEffect, useRef } from "react";
import { BookPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { type AIModel, modelListTuple } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { Submit } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Form, FormField, SelectFormItem, TextareaItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { LanguageSetting } from "./language-setting";
import { setCookie } from "../../../_actions/cookies";
import { StopButton } from "../../../_components/stop-btn";
import { useGenerateForm } from "../../_hooks/generate-form-provider";

/**
 * AIリクエストフォームビュー
 */
export const AiReqForm = () => {
  const { object, form, onSubmit, isLoading, stop } = useGenerateForm();
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

  const handleSubmitByEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form className="flex h-full w-full gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative h-fit w-full">
          {isLoading && object?.wordcards ? (
            <FlexColumn
              ref={scrollRef}
              lang="en"
              className="bg-card h-full max-h-20 w-full overflow-y-scroll rounded-sm p-4 font-mono"
            >
              <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
                {JSON.stringify(object.wordcards, null, 2)}
              </pre>
            </FlexColumn>
          ) : (
            <FormField
              control={form.control}
              name="entries"
              render={({ field }) => (
                <TextareaItem
                  label={t("entries.label")}
                  hiddenLabel
                  disabled={isLoading}
                  description={t("entries.description")}
                  placeholder={t("entries.placeholder")}
                  className="bg-background dark:border-border/70 field-sizing-content min-h-20 rounded-md px-4 py-3"
                  i18nNameSpace="wordbook.newWordAIForm.entries"
                  {...field}
                  onKeyDown={handleSubmitByEnter}
                />
              )}
            />
          )}
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
                variant="ghost"
                align="end"
                alignOffset={-8}
                parentClass="h-fit [&>button]:text-xs [&>button>svg]:size-3 w-fit absolute bottom-0 right-2 "
              >
                {modelListTuple.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectFormItem>
            )}
          />
        </div>
        <FlexColumn className="shrink-0 gap-2">
          {isLoading ? <StopButton stop={stop} /> : <LanguageSetting />}
          <FlexRow className={cn("items-center justify-center gap-6")}>
            <Submit
              type="submit"
              size="icon"
              isPending={isLoading}
              hideChildrenWhenPending
              className="font-semibold"
              aria-label={t("generate")}
            >
              <BookPlus />
            </Submit>
          </FlexRow>
        </FlexColumn>
      </form>
    </Form>
  );
};
