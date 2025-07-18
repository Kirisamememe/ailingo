import { BookOpenText, BookText, Home, NotebookPen } from "lucide-react";

/**
 * Nav Items
 */
export const navItems = [
  {
    title: "home",
    url: "/home",
    icon: Home,
  },
  {
    title: "wordbook",
    url: "/wordbook",
    icon: BookText,
  },
  {
    title: "input",
    url: "/input",
    icon: BookOpenText,
  },
  {
    title: "output",
    url: "/output",
    icon: NotebookPen,
  },
] as const;
