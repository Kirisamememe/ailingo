import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * ログインを許可するメールアドレス
 */
export const allowedEmail = pgTable("allowed_email", {
  email: text().primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3 })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
