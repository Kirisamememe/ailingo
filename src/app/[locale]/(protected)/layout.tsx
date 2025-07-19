import type { Locale } from "next-intl";
import { getSession } from "@/lib/auth";
import { BaseLayout } from "@/components/layout";
import { DisplayWhenMobile } from "@/components/media-query-wrapper";
import { ScrollStateProvider } from "@/components/providers";
import { Header } from "./_components/nav/header";
import { Nav } from "./_components/nav/nav";
import { planDailyLearning } from "./_utils";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

const RootLayout: React.FC<Props> = async ({ children, params }) => {
  const { operatorId } = await getSession();
  const { locale } = await params;

  await planDailyLearning(operatorId);

  return (
    <BaseLayout locale={locale}>
      <ScrollStateProvider>
        <Nav />
        <DisplayWhenMobile>
          <Header />
        </DisplayWhenMobile>
        <main className="grid min-h-dvh place-content-center">{children}</main>
      </ScrollStateProvider>
    </BaseLayout>
  );
};

export default RootLayout;
