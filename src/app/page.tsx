import { redirect } from "@/i18n";

const LocaleWrapperPage = () => {
  redirect({ href: "/", locale: "en" });
};

export default LocaleWrapperPage;
