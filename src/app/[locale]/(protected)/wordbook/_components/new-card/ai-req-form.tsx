"use client";

import { Button, Submit } from "@/components/ui/button";
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
import { modelListTuple } from "@/constants";
import type { AIModel } from "@/types";

/**
 * AIリクエストフォームビュー
 */
export const AiReqForm = () => {
  const { form, onSubmit, isLoading, stop } = useWordbook();

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
                  className="h-12 rounded-sm"
                  placeholder="Enter the word"
                  autoComplete="off"
                  disabled={isLoading}
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
                    <SelectTrigger
                      disabled={isLoading}
                      className="data-[placeholder]:hover:text-foreground h-16 cursor-pointer rounded-sm"
                    >
                      <SelectValue placeholder="Select a model" />
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
            <Button type="button" onClick={stop} variant="destructive">
              Stop
            </Button>
          )}
          <Submit type="submit" isPending={isLoading}>
            Generate
          </Submit>
        </div>
      </form>
    </Form>
  );
};
