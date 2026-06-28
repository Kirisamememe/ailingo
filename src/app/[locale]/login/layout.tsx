type Props = {
  children: React.ReactNode;
};

const LoginLayout: React.FC<Props> = ({ children }) => {
  return <main className="grid min-h-dvh place-content-center">{children}</main>;
};

export default LoginLayout;
