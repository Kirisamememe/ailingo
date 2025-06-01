import { FlexColumn } from "@/components/ui/flexbox";
import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
  return (
    <FlexColumn center className="h-screen w-screen">
      <LoginForm />
    </FlexColumn>
  );
};

export default LoginPage;
