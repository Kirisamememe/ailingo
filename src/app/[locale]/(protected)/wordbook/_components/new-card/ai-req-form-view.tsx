import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
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
import { modelListTuple } from "@/constants";
import type { AIModel, wordcardRequestSchema } from "@/types";

type Props = {
  form: UseFormReturn<z.infer<typeof wordcardRequestSchema>>;
  onSubmit: () => void;
  isLoading: boolean;
  stop: () => void;
};

/**
 * AIリクエストフォームビュー
 */
export const AiReqFormView: React.FC<Props> = ({ form, onSubmit, isLoading, stop }) => {
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
              <FormLabel hidden>Word</FormLabel>
              <FormControl>
                <Input
                  className="h-12"
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
        <div className="flex w-full items-center gap-2">
          <FormField
            control={form.control}
            name="model"
            render={() => (
              <FormItem className="mr-auto">
                <FormLabel hidden />
                <Select
                  defaultValue={modelListTuple[1]}
                  onValueChange={(value) => {
                    form.setValue("model", value as AIModel);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="data-[placeholder]:hover:text-foreground h-16 cursor-pointer rounded-sm">
                      <SelectValue placeholder="Select a verified email to display" />
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
                <FormDescription hidden />
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading && (
            <Button type="button" onClick={stop}>
              Stop
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
};
