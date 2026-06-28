import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  foreignKey,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Passkey認証情報
 */
export const passkey = pgTable(
  "passkey",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    webauthnUserId: text("webauthn_user_id").notNull(),
    publicKey: text("public_key").notNull(),
    counter: bigint({ mode: "number" }).default(0).notNull(),
    deviceType: text("device_type").notNull(),
    backedUp: boolean("backed_up").default(false).notNull(),
    transports: text().array(),
    name: text(),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastUsedAt: timestamp("last_used_at", { precision: 3 }),
  },
  (table) => [
    uniqueIndex("passkey_webauthn_user_id_user_id_key").using(
      "btree",
      table.webauthnUserId.asc().nullsLast().op("text_ops"),
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "passkey_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
