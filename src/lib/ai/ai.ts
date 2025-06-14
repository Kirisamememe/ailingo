import "server-only";
import { deepseek } from "@ai-sdk/deepseek";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";
import { streamObject } from "ai";
import type { z } from "zod";
import type { AIModel } from "@/lib/ai/types";
import { deepseekModelListTuple, geminiModelListTuple, openAIModelListTuple } from "./constants";

type Models = Record<AIModel, LanguageModelV1>;

/**
 * AI SDK
 */
class AI {
  private geminiModels = Object.fromEntries(
    geminiModelListTuple.map((model) => [model, google(model, { structuredOutputs: false })]),
  ) as Record<(typeof geminiModelListTuple)[number], LanguageModelV1>;

  private openAIModels = Object.fromEntries(
    openAIModelListTuple.map((model) => [model, openai(model)]),
  ) as Record<(typeof openAIModelListTuple)[number], LanguageModelV1>;

  private deepseekModels = Object.fromEntries(
    deepseekModelListTuple.map((model) => [model, deepseek(model)]),
  ) as Record<(typeof deepseekModelListTuple)[number], LanguageModelV1>;

  private models: Models = {
    ...this.geminiModels,
    ...this.openAIModels,
    ...this.deepseekModels,
  };

  generate(model: AIModel, prompt: string, system: string, schema: z.ZodType) {
    return streamObject({
      model: this.models[model],
      prompt,
      system,
      schema,
      maxTokens: 2000,
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    });
  }
}

/**
 * AI SDKのインスタンス
 */
export const ai = new AI();
