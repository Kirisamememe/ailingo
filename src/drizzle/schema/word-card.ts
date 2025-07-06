import { sql } from "drizzle-orm";
import { foreignKey, pgTable, serial, smallint, text, timestamp } from "drizzle-orm/pg-core";
import { language } from "./language";
import { users } from "./users";

/**
 * 単語カード
 */
export const wordCard = pgTable(
  "word_card",
  {
    id: serial().primaryKey().notNull(),
    word: text().notNull(),
    phonetics: text().notNull(),
    example1: text("example_1").notNull(),
    example2: text("example_2"),
    example3: text("example_3"),
    note: text(),
    retentionRate: smallint("retention_rate").default(1).notNull(),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 }).notNull(),
    masteredAt: timestamp("mastered_at", { precision: 3 }),
    deletedAt: timestamp("deleted_at", { precision: 3 }),
    authorId: text("author_id").notNull(),
    antonyms: text(),
    definitions: text().notNull(),
    derivatives: text(),
    lastReviewedAt: timestamp("last_reviewed_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    nextReviewAt: timestamp("next_review_at", { precision: 3 }),
    synonyms: text(),
    language: language().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [users.id],
      name: "word_card_author_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
