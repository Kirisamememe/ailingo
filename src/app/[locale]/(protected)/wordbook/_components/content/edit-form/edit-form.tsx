import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import type z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { wordcardFormSchema } from "../../../_schema";
import type { WordCard } from "@/generated/prisma";

type Props = {
  wordCard: WordCard;
};

/**
 * 単語カード編集フォーム
 */
export const EditForm: React.FC<Props> = ({ wordCard }) => {
  const wordCardForm = useForm<z.infer<typeof wordcardFormSchema>>({
    resolver: zodResolver(wordcardFormSchema),
    defaultValues: {
      word: wordCard.word,
      phonetics: wordCard.phonetics,
      definitions: wordCard.definitions,
      example1: wordCard.example1,
      example2: wordCard.example2 ?? undefined,
      example3: wordCard.example3 ?? undefined,
      note: wordCard.note ?? undefined,
    },
  });

  return (
    <Form {...wordCardForm}>
      <form>
        <FormField
          control={wordCardForm.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Word</FormLabel>
              <FormControl>
                <Input
                  className="h-12 rounded-sm"
                  placeholder="Enter the word"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription hidden>
                Please enter the word you want to generate a wordcard for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
