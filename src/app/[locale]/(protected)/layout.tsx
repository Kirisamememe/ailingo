import { cookies } from "next/headers";
import type { Locale } from "next-intl";
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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <BaseLayout locale={locale}>
      <SidebarProvider defaultOpen={defaultOpen}>
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
