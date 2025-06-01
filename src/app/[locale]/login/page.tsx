import { LoginForm } from "@/components/login-form";
import { FlexColumn } from "@/components/ui/flexbox";

const LoginPage = () => {
  return (
    <FlexColumn center className="h-screen w-screen">
      <LoginForm />
    </FlexColumn>
  );
};

export default LoginPage;
