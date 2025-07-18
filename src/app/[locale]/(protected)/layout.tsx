import type { Locale } from "next-intl";
import { getSession } from "@/lib/auth";
import { BaseLayout } from "@/components/layout";
import { ScrollStateProvider } from "@/components/providers";
import { Header } from "./_components/nav/header";
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
        <Header />
        {children}
      </ScrollStateProvider>
    </BaseLayout>
  );
};

export default RootLayout;
