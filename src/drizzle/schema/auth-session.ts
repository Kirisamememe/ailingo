import { sql } from "drizzle-orm";
import { foreignKey, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * 認証セッション
 */
export const authSession = pgTable(
  "auth_session",
  {
    id: text().primaryKey().notNull(),
    tokenHash: text("token_hash").notNull(),
    userId: text("user_id").notNull(),
    expiresAt: timestamp("expires_at", { precision: 3 }).notNull(),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
  },
  (table) => [
    uniqueIndex("auth_session_token_hash_key").using(
      "btree",
      table.tokenHash.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "auth_session_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
