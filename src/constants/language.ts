import type { LanguageCode } from "@/types";

/** 単語帳対応の言語 */
export const LANGUAGES = {
  /** 英語 */
  "en-US": "English (US)",
  /** 英語（英国） */
  "en-GB": "English (UK)",
  /** 日本語 */
  ja: "日本語",
  /** 中国語 */
  "zh-CN": "简体中文（中国大陆）",
  /** 中国語（台湾） */
  "zh-TW": "繁體中文（台灣）",
  /** 韓国語 */
  "ko-KR": "한국어",
  /** ドイツ語 */
  "de-DE": "Deutsch",
  /** スペイン語 */
  "es-ES": "Español",
  /** フランス語 */
  "fr-FR": "Français",
  /** イタリア語 */
  "it-IT": "Italiano",
} as const;

/** 単語帳対応の言語のコード */
export const LANGUAGE_CODES = Object.keys(LANGUAGES) as [LanguageCode];
