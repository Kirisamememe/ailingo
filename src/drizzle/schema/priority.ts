import { pgEnum } from "drizzle-orm/pg-core";

/**
 * 優先度
 */
export const priorityEnum = pgEnum("priority", ["high", "medium", "low"]);
