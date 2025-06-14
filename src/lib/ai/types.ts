import type {
  deepseekModelListTuple,
  geminiModelListTuple,
  openAIModelListTuple,
} from "./constants";

/**
 * AIモデル
 */
export type AIModel =
  | (typeof geminiModelListTuple)[number]
  | (typeof openAIModelListTuple)[number]
  | (typeof deepseekModelListTuple)[number];
