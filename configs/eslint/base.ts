import { includeIgnoreFile } from "@eslint/compat";
import eslintJs from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";
// @ts-ignore 型情報がないのでignore
import eslintImportPlugin from "eslint-plugin-import";
import eslintJsdocPlugin from "eslint-plugin-jsdoc";
import globals from "globals";
import tsEslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");
const gitignorePath = path.resolve(rootDir, ".gitignore");

/** eslint共通設定 */
export const baseConfig = [
  includeIgnoreFile(gitignorePath),
  eslintJs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    name: "base-language-options",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: "ignore-custom",
    ignores: ["**/*.d.ts", "configs/*", "next.config.ts"],
  },
  {
    name: "ts-language-options",
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDir,
      },
    },
  },
  {
    name: "js-custom",
    rules: {
      "no-console": "warn",
    },
  },
  {
    name: "ts-custom",
    rules: {
      // import type 構文を強制
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      // 型定義をtypeに統一
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
  {
    name: "import",
    plugins: {
      import: eslintImportPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "index", "object"],
          pathGroups: [
            {
              pattern: "next",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/lib/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/hooks/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/utils/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/constants/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          named: true,
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "never",
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],
    },
  },
  {
    name: "jsdoc",
    ignores: ["src/app/**/page.tsx", "src/app/**/layout.tsx", "src/middleware.ts"],
    plugins: {
      jsdoc: eslintJsdocPlugin,
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            "VariableDeclaration",
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
            "TSPropertySignature",
            "TSMethodSignature",
          ],
          enableFixer: false,
        },
      ],
    },
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx"],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-call": "off",
    },
  },
];
