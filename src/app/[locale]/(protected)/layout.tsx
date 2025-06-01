import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getSession } from "@/lib/auth";
import { BaseLayout } from "@/components/layout";
import { ScrollStateProvider } from "@/components/providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./_components/nav/header/header";
import { AppSidebar } from "./_components/nav/sidebar";
import { isLocale } from "@/i18n/locale";

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) => {
  const { locale } = await params;
  await getSession();

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="@container">
          <ScrollStateProvider>
            <Header />
            {children}
          </ScrollStateProvider>
        </SidebarInset>
      </SidebarProvider>
    </BaseLayout>
  );
};

export default RootLayout;
