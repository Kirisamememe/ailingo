"use client";

import type * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider
 */
export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
