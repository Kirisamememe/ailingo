import { sql } from "drizzle-orm";
import { foreignKey, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * 認証チャレンジ種別
 */
export type AuthChallengeType = "google_oauth" | "passkey_registration" | "passkey_authentication";

/**
 * 認証チャレンジ
 */
export const authChallenge = pgTable(
  "auth_challenge",
  {
    id: text().primaryKey().notNull(),
    type: text().$type<AuthChallengeType>().notNull(),
    challenge: text().notNull(),
    codeVerifier: text("code_verifier"),
    nonce: text(),
    redirectTo: text("redirect_to"),
    email: text(),
    userId: text("user_id"),
    expiresAt: timestamp("expires_at", { precision: 3 }).notNull(),
    consumedAt: timestamp("consumed_at", { precision: 3 }),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "auth_challenge_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
