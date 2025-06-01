import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
        <CardDescription>Login with your Apple or Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="min-w-80" action={action}>
          <Button variant="outline" className="w-full">
            <FaGoogle />
            Login with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
