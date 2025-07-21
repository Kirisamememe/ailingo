import { sql } from "drizzle-orm";
import { boolean, foreignKey, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { language } from "./language";
import { users } from "./users";

/**
 * 生成記事
 */
export const generatedReading = pgTable(
  "generated_reading",
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    translation: text().notNull(),
    keyWordsOrPhrases: text("key_words_or_phrases").array().notNull(),
    keyDifficultyExplanation: text("key_difficulty_explanation").notNull(),
    language: language().notNull(),
    translationLanguage: language("translation_language").notNull(),
    authorId: text("author_id").notNull(),
    tags: text("tags").array().notNull(),
    isPublic: boolean("is_public").default(true).notNull(),
    generatedBy: text("generated_by").notNull(),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [users.id],
      name: "generated_reading_author_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
