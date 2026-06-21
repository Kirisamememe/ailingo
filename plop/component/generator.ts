/* eslint-disable no-console */

import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import type { NodePlopAPI } from "plop";
import { z } from "zod/v4";

const componentNameSchema = z.string().trim().min(1, "コンポーネント名を入力してください");

const directorySchema = z
  .string()
  .regex(/^[a-zA-Z0-9-_/]*$/, "ディレクトリパスは英数字、ハイフン、スラッシュのみ使用できます");

const fileStructureSchema = z.enum(["folder", "file"]);

/** コンポーネント生成プロンプトのスキーマ */
const componentGeneratorInputSchema = z.object({
  componentName: componentNameSchema,
  directory: directorySchema,
  fileStructure: fileStructureSchema,
});

/** plopを使用したコンポーネントファイルテンプレートを生成する関数 */
export const setComponentGenerator = (plop: NodePlopAPI): void => {
  plop.setGenerator("component", {
    description: "Reactのコンポーネントを生成します",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "コンポーネント名を入力してください (e.g. Button, Card, Modal)",
        validate: (input: unknown) => {
          const result = componentNameSchema.safeParse(input);
          return result.success || result.error.issues[0].message;
        },
      },
      {
        type: "input",
        name: "directory",
        message: "ディレクトリパスを入力してください (例: components/ui/buttons, features/auth)",
        default: "components",
        validate: (input: string) => {
          const result = directorySchema.safeParse(input.trim());
          return result.success || result.error.issues[0]?.message;
        },
      },
      {
        type: "list",
        name: "fileStructure",
        message: "ファイル構造を選択してください",
        choices: [
          { name: "フォルダー + index.tsx (例: Button/index.tsx)", value: "folder" },
          { name: "単一ファイル (例: Button.tsx)", value: "file" },
        ],
      },
    ],
    actions: (_data) => {
      const parseResult = componentGeneratorInputSchema.safeParse(_data);

      if (!parseResult.success) {
        return [];
      }

      const { data } = parseResult;

      const pascalCaseHelper = plop.getHelper("pascalCase") as (string: string) => string;

      // コンポーネント名（パスカルケース）
      const componentName = pascalCaseHelper(data.componentName);

      // コンポーネントのパス
      const directory = data.directory.trim();

      // featuresディレクトリの場合は自動的にcomponentsサブディレクトリを追加
      const dirParts = directory.split("/");
      let componentPath: string;
      let componentFilePath: string;

      // ベースディレクトリの設定
      if (dirParts[0] === "features") {
        // パスの最後にcomponentsを追加（まだなければ）
        if (dirParts.includes("components")) {
          componentPath = path.join("src", directory);
        } else {
          componentPath = path.join("src", directory, "components");
        }
      } else {
        componentPath = path.join("src", directory);
      }

      // ファイル構造に基づいてパスを設定
      if (data.fileStructure === "folder") {
        // フォルダー + index.tsx
        componentPath = path.join(componentPath, componentName);
        componentFilePath = path.join(componentPath, "index.tsx");

        // フォルダーを作成
        if (!fs.existsSync(componentPath)) {
          fs.mkdirSync(componentPath, { recursive: true });
        }
      } else {
        // 単一ファイル
        componentFilePath = path.join(componentPath, `${componentName}.tsx`);

        // 親ディレクトリが存在しない場合は作成
        const parentDir = path.dirname(componentFilePath);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
      }

      return [
        {
          type: "add",
          path: componentFilePath,
          templateFile: "plop/component/templates/index.tsx.hbs",
        },
        function formatWithPrettier() {
          console.log("Formatting component with Prettier...");
          try {
            if (fs.existsSync(componentFilePath)) {
              execFileSync("bun", ["x", "prettier", "--write", componentFilePath], {
                stdio: "inherit",
              });
              return "✅ Prettier formatting applied to the generated component.";
            }
            return "⚠️ Component path does not exist, skipping Prettier.";
          } catch (error) {
            console.error("Prettier formatting failed:", error);
            return "🚨 Prettier formatting failed.";
          }
        },
      ];
    },
  });
};
