import { getSession } from "@/lib/auth";
import { DisplayWhenMobile } from "@/components/media-query-wrapper";
import { ScrollStateProvider } from "@/components/providers";
import { Header } from "./_components/nav/header";
import { Nav } from "./_components/nav/nav";
import { GlobalStoreProvider } from "./_hooks/global-store-provider";
import { planDailyLearning } from "./_utils";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = async ({ children }) => {
  const { operatorId } = await getSession();
  const dailyLearning = await planDailyLearning(operatorId);

  return (
    <GlobalStoreProvider
      dailyNewWords={dailyLearning?.newEntries ?? []}
      dailyReviewWords={dailyLearning?.reviewEntries ?? []}
    >
      <ScrollStateProvider>
        <Nav />
        <DisplayWhenMobile>
          <Header />
        </DisplayWhenMobile>
        <main className="flex flex-col items-center">{children}</main>
      </ScrollStateProvider>
    </GlobalStoreProvider>
  );
};

export default RootLayout;
