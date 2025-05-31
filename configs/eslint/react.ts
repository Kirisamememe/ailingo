import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
// @ts-ignore 型情報がないのでignore
import reactHooksPlugin from "eslint-plugin-react-hooks";

// ESMだと読み込めないのでCommonJSで読み込む
const reactCompilerPlugin = require("eslint-plugin-react-compiler");

/** reactに関するeslint設定 */
export const reactConfig = [
  reactPlugin.configs.flat?.recommended,
  reactPlugin.configs.flat?.["jsx-runtime"],
  jsxA11yPlugin.flatConfigs.recommended,
  {
    name: "react-language-options",
    languageOptions: {
      ...reactPlugin.configs.flat?.recommended?.languageOptions,
    },
  },
  {
    name: "react-custom",
    rules: {
      "react/button-has-type": "error",
      "react/jsx-boolean-value": "error",
      "react/self-closing-comp": "error",
      "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "react-hooks",
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    name: "react-compiler",
    plugins: {
      "react-compiler": reactCompilerPlugin,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
];
