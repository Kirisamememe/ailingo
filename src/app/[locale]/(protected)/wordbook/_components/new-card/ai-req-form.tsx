"use client";

import { useTranslations } from "next-intl";
import { type AIModel, modelListTuple } from "@/lib/ai";
import { Button, Submit } from "@/components/ui/button";
import { FlexRow, Flexbox } from "@/components/ui/flexbox";
import { FormField } from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
            <FormItem>
              <FormLabel hidden />
              <FormControl>
                <Input
                  className="h-12 rounded-sm"
                  placeholder={t("words.placeholder")}
                  autoComplete="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription hidden>{t("words.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Flexbox className="w-full flex-col gap-2 @[40rem]:flex-row">
          <FlexRow gap={3} className="@[40rem]:mr-auto">
            <FormField
              control={form.control}
              name="model"
              render={() => (
                <FormItem>
                  <FormLabel hidden />
                  <Select
                    defaultValue={form.getValues("model")}
                    onValueChange={(value) => {
                      form.setValue("model", value as AIModel);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger
                        disabled={isLoading}
                        className="data-[placeholder]:hover:text-foreground h-16 cursor-pointer rounded-sm"
                      >
                        <SelectValue placeholder={t("model.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelListTuple.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription hidden>{t("model.description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningLanguage"
              render={() => (
                <FormItem>
                  <FormLabel hidden />
                  <Select
                    defaultValue={form.getValues("learningLanguage")}
                    onValueChange={(value) => {
                      form.setValue("learningLanguage", value as Locale);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger
                        disabled={isLoading}
                        className="data-[placeholder]:hover:text-foreground h-16 cursor-pointer rounded-sm"
                      >
                        <SelectValue placeholder={t("learningLanguage.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(i18n.locales).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription hidden>{t("learningLanguage.description")}</FormDescription>
                  <FormMessage />
                </FormItem>
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
