import type { AbstractIntlMessages } from "next-intl";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./locale";
import { routing } from "./routing";

/**
 * Get Request Config
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (
      (await import(`@/i18n/messages/${locale}.json`)) as {
        default: AbstractIntlMessages;
      }
    ).default,
  };
});
