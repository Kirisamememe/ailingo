/**
 * モデルリスト
 */
export const geminiModelListTuple = ["gemini-2.5-pro", "gemini-2.5-flash"] as const;

/**
 * OpenAIモデルリスト
 */
export const openAIModelListTuple = ["gpt-4.1", "gpt-4.1-mini", "gpt-4.1-nano"] as const;

/**
 * DeepSeekモデルリスト
 */
export const deepseekModelListTuple = ["deepseek-chat"] as const;

/**
 * モデルリスト
 */
export const modelListTuple = [
  ...geminiModelListTuple,
  ...openAIModelListTuple,
  ...deepseekModelListTuple,
] as const;
