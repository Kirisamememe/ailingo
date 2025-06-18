import { usePathname, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button, Submit } from "@/components/ui/button";
import { FlexRow } from "@/components/ui/flexbox";
import { InputItem, TextareaItem } from "@/components/ui/form";
import { Form, FormField } from "@/components/ui/form/form";
import { Separator } from "@/components/ui/separator";
import { Headline } from "@/components/ui/typography";
import { DeleteBtn } from "./delete-btn";
import { deleteWordCard } from "../../../_actions/delete";
import { updateWordCard } from "../../../_actions/update";
import { wordcardFormSchema } from "../../../_schema";
import { getWordCardFormData } from "../../../_utils";
import type { WordCard } from "@/generated/prisma";
import { useRouter } from "@/i18n";

type Props = {
  wordCard: WordCard;
};

/**
 * 単語カード編集フォーム
 */
export const EditForm: React.FC<Props> = ({ wordCard }) => {
  const t = useTranslations("wordbook.editForm");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const wordCardForm = useForm<z.infer<typeof wordcardFormSchema>>({
    resolver: zodResolver(wordcardFormSchema),
    defaultValues: getWordCardFormData(),
    mode: "onChange",
  });

  useEffect(() => {
    wordCardForm.reset(getWordCardFormData(wordCard));
  }, [wordCard, wordCardForm]);

  const [, formAction, isPending] = useActionState(async () => {
    const validation = await wordCardForm.trigger();
    if (!validation) return { isSuccess: false, error: { message: t("save.invalidForm") } };

    const values = wordCardForm.getValues();
    await updateWordCard(wordCard.id, values).catch((err: unknown) => {
      toast.error(t("save.error"), {
        description: err instanceof Error ? err.message : tCommon("error.database"),
      });
    });
    toast.success(t("save.success"));
    handleEndEditing();
  }, null);

  const handleDelete = async () => {
    await deleteWordCard(wordCard.id).then(() => {
      router.push("/wordbook");
    });
  };

  const handleEndEditing = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.delete("edit");

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <Form {...wordCardForm}>
      <form className="appear flex flex-col gap-6" action={formAction}>
        <FlexRow className="items-center gap-3">
          <Headline size={20} mx={1} className="mr-auto">
            {t("title")}
          </Headline>
          <Button variant="outline">{tCommon("save")}</Button>
          <Button variant="outline" onClick={handleEndEditing} type="button">
            {tCommon("cancel")}
          </Button>
        </FlexRow>
        <Separator />
        <FormField
          control={wordCardForm.control}
          name="word"
          render={({ field }) => (
            <InputItem
              label={t("word.label")}
              description={t("word.description")}
              placeholder={t("word.placeholder")}
              autoComplete="off"
              hiddenDescription
              i18nNameSpace="wordbook.editForm.word"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="phonetics"
          render={({ field }) => (
            <InputItem
              label={t("phonetics.label")}
              description={t("phonetics.description")}
              placeholder={t("phonetics.placeholder")}
              autoComplete="off"
              hiddenDescription
              i18nNameSpace="wordbook.editForm.phonetics"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="definitions"
          render={({ field }) => (
            <TextareaItem
              label={t("definitions.label")}
              description={t("definitions.description")}
              placeholder={t("definitions.placeholder")}
              className="h-20"
              i18nNameSpace="wordbook.editForm.definitions"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="example1"
          render={({ field }) => (
            <TextareaItem
              label={`${t("example.label")}-1`}
              description={t("example.description")}
              placeholder={t("example.placeholder")}
              className="h-20"
              i18nNameSpace="wordbook.editForm.example"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="example2"
          render={({ field }) => (
            <TextareaItem
              label={`${t("example.label")}-2`}
              description={t("example.description")}
              placeholder={t("example.placeholder")}
              className="h-20"
              i18nNameSpace="wordbook.editForm.example"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="example3"
          render={({ field }) => (
            <TextareaItem
              label={`${t("example.label")}-3`}
              description={t("example.description")}
              placeholder={t("example.placeholder")}
              className="h-20"
              i18nNameSpace="wordbook.editForm.example"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="derivatives"
          render={({ field }) => (
            <InputItem
              label={t("derivatives.label")}
              description={t("derivatives.description")}
              placeholder={t("derivatives.placeholder")}
              i18nNameSpace="wordbook.editForm.derivatives"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="synonyms"
          render={({ field }) => (
            <InputItem
              label={t("synonyms.label")}
              description={t("synonyms.description")}
              placeholder={t("synonyms.placeholder")}
              i18nNameSpace="wordbook.editForm.synonyms"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="antonyms"
          render={({ field }) => (
            <InputItem
              label={t("antonyms.label")}
              description={t("antonyms.description")}
              placeholder={t("antonyms.placeholder")}
              i18nNameSpace="wordbook.editForm.antonyms"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="note"
          render={({ field }) => (
            <TextareaItem
              label={t("note.label")}
              description={t("note.description")}
              placeholder={t("note.placeholder")}
              className="h-48"
              i18nNameSpace="wordbook.editForm.note"
              {...field}
            />
          )}
        />
        <Separator />
        <FlexRow className="items-center gap-3">
          <DeleteBtn onDelete={handleDelete} />
          <Button variant="outline" onClick={handleEndEditing} type="button">
            {tCommon("cancel")}
          </Button>
          <Submit isPending={isPending}>{tCommon("save")}</Submit>
        </FlexRow>
      </form>
    </Form>
  );
};
