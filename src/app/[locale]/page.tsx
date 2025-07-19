import { getLocale } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { redirect } from "@/i18n";

const RootPage = async () => {
  await getSession();
  const locale = await getLocale();

  redirect({ href: "/home", locale });
};

export default RootPage;
