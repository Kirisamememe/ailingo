import type { writing } from "@/drizzle/schema";

/**
 * 作文
 */
export type Writing = typeof writing.$inferSelect;
