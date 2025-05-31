import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { baseConfig, nextConfig, reactConfig } from "./configs/eslint";

export default [
  ...baseConfig,
  ...nextConfig,
  ...reactConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
