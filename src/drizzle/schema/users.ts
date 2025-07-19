import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { language } from "./language";
import { role } from "./role";

/**
 * ユーザー
 */
export const users = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().default("Anonymous").notNull(),
    role: role().default("VIEWER").notNull(),
    image: text(),
    email: text().notNull(),
    emailVerified: timestamp({ precision: 3 }),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    masteredWords: text("mastered_words").default("I, you, he, she, it, we, they").notNull(),
    learningLanguage: language("learning_language"),
    nativeLanguage: language("native_language"),
  },
  (table) => [
    uniqueIndex("user_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
  ],
);
