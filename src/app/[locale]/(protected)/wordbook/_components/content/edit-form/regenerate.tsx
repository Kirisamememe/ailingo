import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import type { AIModel } from "@/lib/ai";
import { modelListTuple } from "@/lib/ai";
import { mergeDefinitions } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexRow } from "@/components/ui/flexbox";
import { SelectFormItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useWordbookStore } from "../../../_hooks/store-provider";
import { wordcardAISchemaArray, type wordcardFormSchema } from "../../../_schema";
import { getCookie, setCookie } from "@/app/[locale]/(protected)/_actions/cookies";
import { StopButton } from "@/app/[locale]/(protected)/_components/stop-btn";

type Props = {
  id: number;
  form: UseFormReturn<z.infer<typeof wordcardFormSchema>>;
};

/**
 * 再生成ボタン
 */
export const Regenerate: React.FC<Props> = ({ form }) => {
  const [selectedModel, setSelectedModel] = useState<AIModel>("deepseek-chat");

  const setIsSaving = useWordbookStore((state) => state.setIsSaving);

  const t = useTranslations("wordbook.editForm.regenerate");

  const { submit, isLoading, stop, object } = useObject({
    api: "/api/generate-wordcards",
    schema: wordcardAISchemaArray,
    onFinish: ({ object }) => {
      if (!object) {
        toast.error("Failed to regenerate wordcard");
        return;
      }
      toast.success("Wordcard regenerated successfully");
    },
    onError: () => {
      setIsSaving(false);
    },
  });

  const onRegenerateSubmit = () => {
    const values = {
      entries: [form.getValues("entry")],
      model: selectedModel,
      learningLanguage: form.getValues("language"),
      translationLanguage: form.getValues("translationLanguage"),
    };
    submit(values);
  };

  useEffect(() => {
    void (async () => {
      const cookie = await getCookie("WORDCARD_EDIT_MODEL");
      if (!cookie) return;
      setSelectedModel(cookie as AIModel);
    })();
  }, []);

  useEffect(() => {
    const wordCard = object?.wordcards?.[0];
    if (!wordCard || !isLoading) return;
    form.setValue("entry", wordCard.entry ?? "");
    form.setValue("phonetics", wordCard.phonetics ?? "");
    form.setValue("definitions", mergeDefinitions(wordCard.definitions));
    form.setValue("example1", wordCard.example1 ?? "");
    form.setValue("example2", wordCard.example2 ?? "");
    form.setValue("example3", wordCard.example3 ?? "");
    form.setValue("collocations", wordCard.collocations);
    form.setValue("derivatives", wordCard.derivatives);
    form.setValue("synonyms", wordCard.synonyms);
    form.setValue("antonyms", wordCard.antonyms);
    form.setValue("tags", wordCard.tags?.filter((tag) => !!tag) ?? []);
  }, [form, isLoading, object?.wordcards]);

  return (
    <FlexRow className="items-end gap-3">
      <SelectFormItem
        label={t("label")}
        value={selectedModel}
        onValueChange={(value) => {
          setSelectedModel(value as AIModel);
          void setCookie("WORDCARD_EDIT_MODEL", value);
        }}
        description={t("description")}
        placeholder={t("description")}
      >
        {modelListTuple.map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </SelectFormItem>
      {isLoading ? (
        <StopButton stop={stop} />
      ) : (
        <Button variant="outline" size="icon" onClick={onRegenerateSubmit}>
          <RefreshCcw />
        </Button>
      )}
    </FlexRow>
  );
};
