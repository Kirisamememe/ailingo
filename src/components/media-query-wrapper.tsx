"use client";

import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  children: ReactNode;
};

/**
 * モバイルのみ非表示
 */
export const HideWhenMobile: React.FC<Props> = ({ children }) => {
  const isMobile = useIsMobile();

  return isMobile ? null : children;
};

/**
 * モバイルのみ表示
 */
export const DisplayWhenMobile: React.FC<Props> = ({ children }) => {
  const isMobile = useIsMobile();

  return isMobile ? children : null;
};
