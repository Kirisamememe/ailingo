import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { FormField, SelectFormItem } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { setCookie } from "../../_actions/cookies";
import type { multipleChoiceQuestionAIRequestSchema } from "../_schema/ai-request";
import { LANGUAGES } from "@/drizzle/schema";
import type { LanguageCode } from "@/types";

type Props = {
  form: UseFormReturn<z.infer<typeof multipleChoiceQuestionAIRequestSchema>>;
};

/**
 * 言語設定ポップオーバー
 */
export const LanguageSetting: React.FC<Props> = ({ form }) => {
  const t = useTranslations("wordbook.newWordAIForm");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="bg-foreground/5 shadow-none">
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
              defaultValue={form.getValues("learningLanguage")}
              onValueChange={(value) => {
                form.setValue("learningLanguage", value as LanguageCode);
                void setCookie("MULTIPLE_CHOICE_QUESTION_LEARNING_LANGUAGE", value);
              }}
              description={t("learningLanguage.description")}
              placeholder={t("learningLanguage.placeholder")}
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
          name="translationLanguage"
          render={() => (
            <SelectFormItem
              label={t("translationLanguage.label")}
              hiddenDescription={false}
              defaultValue={form.getValues("translationLanguage")}
              onValueChange={(value) => {
                form.setValue("translationLanguage", value as LanguageCode);
                void setCookie("MULTIPLE_CHOICE_QUESTION_TRANSLATION_LANGUAGE", value);
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
