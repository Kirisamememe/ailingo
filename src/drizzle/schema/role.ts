import { pgEnum } from "drizzle-orm/pg-core";

/**
 * ユーザーの権限
 */
export const role = pgEnum("Role", ["ADMIN", "USER", "VIEWER", "BLOCKED"]);
