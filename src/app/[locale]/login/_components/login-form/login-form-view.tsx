import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PasskeyLoginForm } from "./passkey-login-form";

type Props = {
  action: () => Promise<void>;
};

/**
 * Login form view
 */
export const LoginFormView = ({ action }: Props) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login with Google or a registered passkey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="min-w-80" action={action}>
          <Button variant="outline" className="w-full">
            <FaGoogle />
            Login with Google
          </Button>
        </form>
        <div className="border-t pt-4">
          <PasskeyLoginForm />
        </div>
      </CardContent>
    </Card>
  );
};
