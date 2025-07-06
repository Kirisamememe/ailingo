import type { role } from "@/drizzle/schema";

/**
 * ユーザーの権限
 */
export type Role = (typeof role.enumValues)[number];
