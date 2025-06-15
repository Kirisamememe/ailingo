import type messages from "@/i18n/messages/en.json";
import type { routing } from "@/i18n/routing";
// import type { formats } from "@/i18n/request";

declare module "next-intl" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    // Formats: typeof formats;
  }
}

export {};
