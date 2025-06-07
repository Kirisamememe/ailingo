import { BaseLayout } from "@/components/layout";

type Props = {
  children: React.ReactNode;
};

const LoginLayout: React.FC<Props> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default LoginLayout;
