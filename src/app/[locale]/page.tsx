import { getLocale } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { redirect } from "@/i18n";

const RootPage = async () => {
  await getSession();

  const locale = await getLocale();

  redirect({ href: "/daily", locale });
};

export default RootPage;
