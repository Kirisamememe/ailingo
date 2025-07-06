"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GridColumn } from "@/components/ui/gridbox";
import { Corrected } from "./corrected";
import { RequestForm } from "./request-form";
import { createCompositionCorrection } from "../../_actions/create";
import {
  type CompositionCorrectionAIRequestSchema,
  compositionCorrectionAIGeneratedContentSchema,
  compositionCorrectionAIRequestSchema,
} from "../../_schema";

/**
 * 作文修正フォームコンテナ
 */
export const FormContainer = () => {
  const form = useForm<CompositionCorrectionAIRequestSchema>({
    resolver: zodResolver(compositionCorrectionAIRequestSchema),
    defaultValues: {
      original: "",
      targetLanguage: "en-US",
      feedbackLanguage: "ja",
      context: undefined,
      model: "gpt-4.1",
    },
  });

  const { object, submit, isLoading } = useObject({
    api: "/api/composition-correction",
    schema: compositionCorrectionAIGeneratedContentSchema,
    onFinish: async ({ object }) => {
      if (!object) return;

      try {
        const { original, context } = form.getValues();
        const payload = {
          original,
          context,
          ...object,
        };
        await createCompositionCorrection(payload);
        form.reset();
        toast.success("Composition correction created successfully");
      } catch {
        toast.error("Failed to create composition correction");
      }
    },
  });

  return (
    <GridColumn className="h-full" grid={2}>
      <RequestForm form={form} submit={submit} isLoading={isLoading} />
      <Corrected object={object} />
    </GridColumn>
  );
};
