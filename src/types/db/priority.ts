import type { priorityEnum } from "@/drizzle/schema/priority";

/**
 * 優先度
 */
export type Priority = (typeof priorityEnum.enumValues)[number];
