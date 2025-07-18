import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FormField, SelectFormItem } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { setCookie } from "../../../_actions/cookies";
import { useGenerateForm } from "../../_hooks/generate-form-provider";
import { LANGUAGES } from "@/drizzle/schema";
import type { LanguageCode } from "@/types";

/**
 * 言語設定ポップオーバー
 */
export const LanguageSetting = () => {
  const t = useTranslations("wordbook.newWordAIForm");
  const { form } = useGenerateForm();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="bg-foreground/5 w-full shadow-none">
          <Languages className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="left" className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="learningLanguage"
          render={() => (
            <SelectFormItem
              label={t("learningLanguage.label")}
              hiddenDescription={false}
              value={form.getValues("learningLanguage") ?? "auto"}
              onValueChange={(value) => {
                form.setValue(
                  "learningLanguage",
                  value === "auto" ? undefined : (value as LanguageCode),
                );
              }}
              description={t("learningLanguage.description")}
              placeholder={t("learningLanguage.placeholder")}
            >
              <SelectItem value="auto">{t("learningLanguage.auto")}</SelectItem>
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
          name="translationLanguage"
          render={() => (
            <SelectFormItem
              label={t("translationLanguage.label")}
              hiddenDescription={false}
              defaultValue={form.getValues("translationLanguage")}
              onValueChange={(value) => {
                form.setValue("translationLanguage", value as LanguageCode);
                void setCookie("WORDCARD_TRANSLATION_LANGUAGE", value);
              }}
              description={t("translationLanguage.description")}
              placeholder={t("translationLanguage.placeholder")}
            >
              {Object.entries(LANGUAGES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectFormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );
};
