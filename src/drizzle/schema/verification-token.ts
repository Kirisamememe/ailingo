import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

/**
 * 認証トークン
 */
export const verificationToken = pgTable(
  "verification_token",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.identifier, table.token], name: "verification_token_pkey" }),
  ],
);
