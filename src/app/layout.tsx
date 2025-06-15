import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

const LocaleWrapper = ({ children }: Props) => {
  return children;
};

export default LocaleWrapper;
