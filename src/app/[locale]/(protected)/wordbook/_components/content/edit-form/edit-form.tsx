import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button, Submit } from "@/components/ui/button";
import { FlexRow } from "@/components/ui/flexbox";
import { InputItem, SelectFormItem, TextareaItem } from "@/components/ui/form";
import { Form, FormField } from "@/components/ui/form/form";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Headline } from "@/components/ui/typography";
import { DeleteBtn } from "./delete-btn";
import { Regenerate } from "./regenerate";
import { deleteWordCard } from "../../../_actions/delete";
import { updateWordCard } from "../../../_actions/update";
import { useWordbookStore } from "../../../_hooks/store-provider";
import { wordcardFormSchema } from "../../../_schema";
import { getWordCardFormData } from "../../../_utils";
import { priorityEnum } from "@/drizzle/schema/priority";
import type { Priority, WordCard } from "@/types";

type Props = {
  wordCard: WordCard;
};

/**
 * 単語カード編集フォーム
 */
export const EditForm: React.FC<Props> = ({ wordCard }) => {
  const t = useTranslations("wordbook");
  const tCommon = useTranslations("common");

  const setIsEditing = useWordbookStore((state) => state.setIsEditing);
  const closeDrawer = useWordbookStore((state) => state.closeDrawer);
  const removeWordCard = useWordbookStore((state) => state.removeWordCard);
  const upsertWordCard = useWordbookStore((state) => state.upsertWordCard);

  const wordCardForm = useForm<z.infer<typeof wordcardFormSchema>>({
    resolver: zodResolver(wordcardFormSchema),
    defaultValues: getWordCardFormData(wordCard),
    mode: "onChange",
  });

  const [, formAction, isPending] = useActionState(async () => {
    const validation = await wordCardForm.trigger();
    if (!validation)
      return { isSuccess: false, error: { message: t("editForm.save.invalidForm") } };

    const values = wordCardForm.getValues();
    const result = await updateWordCard(wordCard.id, values).catch((err: unknown) => {
      toast.error(t("editForm.save.error"), {
        description: err instanceof Error ? err.message : tCommon("error.database"),
      });
    });
    if (!result) return;
    upsertWordCard(result);
    toast.success(t("editForm.save.success"));
    handleEndEditing();
  }, null);

  const handleDelete = async () => {
    await deleteWordCard(wordCard.id);
    closeDrawer();
    handleEndEditing();
    removeWordCard(wordCard.id);
  };

  const handleEndEditing = () => {
    setIsEditing(false);
  };

  return (
    <Form {...wordCardForm}>
      <form className="appear flex flex-col gap-6 p-4" action={formAction}>
        <FlexRow className="items-center gap-3 pt-4">
          <Headline size={20} mx={1} className="mr-auto">
            {t("editForm.title")}
          </Headline>
          <Button variant="outline">{tCommon("save")}</Button>
          <Button variant="outline" onClick={handleEndEditing} type="button">
            {tCommon("cancel")}
          </Button>
        </FlexRow>
        <Separator />
        <Regenerate id={wordCard.id} form={wordCardForm} />
        <FormField
          control={wordCardForm.control}
          name="entry"
          render={({ field }) => (
            <InputItem
              label={t("editForm.entry.label")}
              description={t("editForm.entry.description")}
              placeholder={t("editForm.entry.placeholder")}
              autoComplete="off"
              hiddenDescription
              i18nNameSpace="wordbook.editForm.entry"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="phonetics"
          render={({ field }) => (
            <InputItem
              label={t("editForm.phonetics.label")}
              description={t("editForm.phonetics.description")}
              placeholder={t("editForm.phonetics.placeholder")}
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
              label={t("editForm.definitions.label")}
              description={t("editForm.definitions.description")}
              placeholder={t("editForm.definitions.placeholder")}
              className="field-sizing-content"
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
              label={`${t("editForm.example.label")}-1`}
              description={t("editForm.example.description")}
              placeholder={t("editForm.example.placeholder")}
              className="field-sizing-content"
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
              label={`${t("editForm.example.label")}-2`}
              description={t("editForm.example.description")}
              placeholder={t("editForm.example.placeholder")}
              className="field-sizing-content"
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
              label={`${t("editForm.example.label")}-3`}
              description={t("editForm.example.description")}
              placeholder={t("editForm.example.placeholder")}
              className="field-sizing-content"
              i18nNameSpace="wordbook.editForm.example"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="collocations"
          render={({ field }) => (
            <InputItem
              label={t("editForm.collocations.label")}
              description={t("editForm.collocations.description")}
              placeholder={t("editForm.collocations.placeholder")}
              i18nNameSpace="wordbook.editForm.collocations"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="derivatives"
          render={({ field }) => (
            <InputItem
              label={t("editForm.derivatives.label")}
              description={t("editForm.derivatives.description")}
              placeholder={t("editForm.derivatives.placeholder")}
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
              label={t("editForm.synonyms.label")}
              description={t("editForm.synonyms.description")}
              placeholder={t("editForm.synonyms.placeholder")}
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
              label={t("editForm.antonyms.label")}
              description={t("editForm.antonyms.description")}
              placeholder={t("editForm.antonyms.placeholder")}
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
              label={t("editForm.note.label")}
              description={t("editForm.note.description")}
              placeholder={t("editForm.note.placeholder")}
              className="h-48"
              i18nNameSpace="wordbook.editForm.note"
              {...field}
            />
          )}
        />
        <FormField
          control={wordCardForm.control}
          name="priority"
          render={() => (
            <SelectFormItem
              label={t("editForm.priority.label")}
              value={wordCardForm.getValues("priority")}
              onValueChange={(value) => {
                wordCardForm.setValue("priority", value as Priority);
              }}
              description={t("editForm.priority.description")}
              placeholder={t("editForm.priority.placeholder")}
            >
              {priorityEnum.enumValues.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {t(`priority.${priority}`)}
                </SelectItem>
              ))}
            </SelectFormItem>
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
