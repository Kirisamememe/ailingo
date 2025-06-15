/**
 * I18n
 */
export const i18n = {
  defaultLocale: "en",
  locales: {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  },
} as const;

/**
 * キーからなる列挙型（配列形式）
 */
export const LOCALES = Object.keys(i18n.locales) as (keyof typeof i18n.locales)[];

/** デフォルトで表示する言語 */
export const DEFAULT_LOCALE = i18n.defaultLocale;

/**
 * Locale Names
 */
export const LOCALE_NAMES = Object.entries(i18n.locales).map(([, value]) => value);

/**
 * Locale
 */
export type Locale = keyof typeof i18n.locales;

/**
 * Locale Name
 */
export type LocaleName = (typeof i18n.locales)[Locale];

/**
 * 多言語をサポートする言語かどうかを判定する関数
 *
 * @param locale
 * @returns 多言語をサポートする言語かどうか
 */
export const isLocale = (locale: unknown): locale is Locale => {
  return typeof locale === "string" && (LOCALES as string[]).includes(locale);
};

/**
 * Accept-Languageヘッダーから言語を取得する関数
 *
 * @param acceptLanguage
 * @returns 言語（サポートされていない場合はデフォルト言語）
 */
export const getLocaleFromAcceptLanguage = (acceptLanguage: string): Locale => {
  const languages = acceptLanguage.split(",").map((language) => language.split(";")[0]?.trim());

  for (const language of languages) {
    if (isLocale(language)) {
      return language;
    }
  }

  return DEFAULT_LOCALE;
};
