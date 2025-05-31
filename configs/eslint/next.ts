// @ts-ignore 型情報がないのでignore
import nextPlugin from "@next/eslint-plugin-next";

/** nextに関するeslint設定 */
export const nextConfig = [
  {
    name: "next",
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    name: "next-custom",
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];
