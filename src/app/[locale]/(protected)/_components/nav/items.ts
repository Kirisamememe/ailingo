import { Book, Home, Settings } from "lucide-react";

/**
 * Sidebar Items
 */
export const generalItems = [
  {
    title: "daily",
    url: "/daily",
    icon: Home,
  },
  {
    title: "wordbook",
    url: "/wordbook",
    icon: Book,
  },
  {
    title: "preference",
    url: "/preference",
    icon: Settings,
  },
] as const;

/**
 * AI Booster Items
 */
export const aiBoosterItems = [
  {
    title: "quiz",
    url: "/quiz",
    icon: Book,
  },
  {
    title: "generatedMaterial",
    url: "/generated-material",
    icon: Book,
  },
  {
    title: "compositionCorrection",
    url: "/composition-correction",
    icon: Book,
  },
] as const;

const items = [...generalItems, ...aiBoosterItems];

/**
 * TITLES
 */
export const TITLES = items.map((item) => item.title);

/**
 * Title
 */
export type Title = (typeof TITLES)[number];
