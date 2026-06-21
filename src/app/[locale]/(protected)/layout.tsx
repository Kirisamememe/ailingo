import { getSession } from "@/lib/auth";
import { BaseLayout } from "@/components/layout";
import { DisplayWhenMobile } from "@/components/media-query-wrapper";
import { ScrollStateProvider } from "@/components/providers";
import { Header } from "./_components/nav/header";
import { Nav } from "./_components/nav/nav";
import { GlobalStoreProvider } from "./_hooks/global-store-provider";
import { planDailyLearning } from "./_utils";
import { DEFAULT_LOCALE, isLocale } from "@/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const RootLayout: React.FC<Props> = async ({ children, params }) => {
  const { operatorId } = await getSession();
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE;

  const dailyLearning = await planDailyLearning(operatorId);

  return (
    <GlobalStoreProvider
      dailyNewWords={dailyLearning?.newEntries ?? []}
      dailyReviewWords={dailyLearning?.reviewEntries ?? []}
    >
      <BaseLayout locale={locale}>
        <ScrollStateProvider>
          <Nav />
          <DisplayWhenMobile>
            <Header />
          </DisplayWhenMobile>
          <main className="flex flex-col items-center">{children}</main>
        </ScrollStateProvider>
      </BaseLayout>
    </GlobalStoreProvider>
  );
};

export default RootLayout;
