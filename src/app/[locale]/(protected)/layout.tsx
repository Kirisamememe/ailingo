import type { Locale } from "next-intl";
import { getSession } from "@/lib/auth";
import { BaseLayout } from "@/components/layout";
import { ScrollStateProvider } from "@/components/providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./_components/nav/header/header";
import { AppSidebar } from "./_components/nav/sidebar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

const RootLayout: React.FC<Props> = async ({ children, params }) => {
  const { locale } = await params;
  await getSession();

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
