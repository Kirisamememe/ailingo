import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Navigation
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
