import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n";

const RootPage = async () => {
  const locale = await getLocale();

  redirect({ href: "/daily", locale });
};

export default RootPage;
