import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { LoginFormView } from "./login-form-view";

/**
 * Login form
 */
export const LoginForm = () => {
  const login = async () => {
    "use server";
    const locale = await getLocale();
    redirect(`/api/auth/google/start?redirectTo=/${locale}/home`);
  };

  return <LoginFormView action={login} />;
};
