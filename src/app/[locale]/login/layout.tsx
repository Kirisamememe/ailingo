import { BaseLayout } from "@/components/layout";

type Props = {
  children: React.ReactNode;
};

const LoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <BaseLayout>
      <main className="grid min-h-dvh place-content-center">{children}</main>
    </BaseLayout>
  );
};

export default LoginLayout;
