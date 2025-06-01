"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { kebabToCamelCase } from "@/lib/utils";
import { HeaderWrapper } from "./header-wrapper";
import { TITLES, type Title } from "../items";

/**
 * Header
 */
export const Header = () => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const segments = pathname.split("/");
  const title = segments[2];
  const camelTitle = kebabToCamelCase(title) as Title;

  if (!TITLES.includes(camelTitle)) {
    return null;
  }

  return <HeaderWrapper>{t(camelTitle)}</HeaderWrapper>;
};
