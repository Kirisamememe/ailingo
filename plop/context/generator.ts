/* eslint-disable no-console */

import { execFileSync } from "child_process";
import path from "path";
import type { NodePlopAPI } from "plop";
import { z } from "zod/v4";

const CONTEXT_PATH = "src/contexts";
const HOOKS_PATH = "src/hooks";

const contextNameSchema = z.string().trim().min(1, "コンテキスト名を入力してください");

/** コンテキスト生成プロンプトのスキーマ */
const contextGeneratorInputSchema = z.object({
  contextName: contextNameSchema,
});

/** plopを使用したコンテキストファイルテンプレートを生成する関数 */
export const setContextGenerator = (plop: NodePlopAPI): void => {
  plop.setGenerator("context", {
    description: "React Context・Provider・Hooksを生成します",
    prompts: [
      {
        type: "input",
        name: "contextName",
        message: "コンテキスト名を入力してください (e.g. dialog, web-view)",
        validate: (input: unknown) => {
          const result = contextNameSchema.safeParse(input);
          return result.success || result.error.issues[0].message;
        },
      },
    ],
    actions: (_data) => {
      const parseResult = contextGeneratorInputSchema.safeParse(_data);

      if (!parseResult.success) {
        return [];
      }

      const { contextName } = parseResult.data;

      const kebabCaseHelper = plop.getHelper("kebabCase") as (string: string) => string;

      const contextNameKebabCase = kebabCaseHelper(contextName);

      return [
        {
          type: "add",
          path: path.join(CONTEXT_PATH, `${contextNameKebabCase}.tsx`),
          templateFile: "plop/context/templates/index.tsx.hbs",
        },
        {
          type: "add",
          path: path.join(HOOKS_PATH, `use-${contextNameKebabCase}.ts`),
          templateFile: "plop/context/templates/hooks.ts.hbs",
        },
        function formatWithPrettier() {
          console.log("Formatting context with Prettier...");
          try {
            execFileSync("bun", ["x", "prettier", "--write", "src/{contexts,hooks}/*.{ts,tsx}"], {
              stdio: "inherit",
            });
            return "✅ Prettier formatting applied to the generated context.";
          } catch (error) {
            console.error("Prettier formatting failed:", error);
            return "🚨 Prettier formatting failed.";
          }
        },
      ];
    },
  });
};
