import { LoginFormView } from "./login-form-view";
import { signIn } from "@/auth";

/**
 * Login form
 */
export const LoginForm = () => {
  const login = async () => {
    "use server";
    await signIn("google");
  };

  return <LoginFormView action={login} />;
};
