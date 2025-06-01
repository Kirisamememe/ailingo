import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import BaseLayout from "@/components/layout/base-layout";
import { isLocale } from "@/i18n/locale";

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
};

export default RootLayout;
