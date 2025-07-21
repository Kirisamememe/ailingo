import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { language } from "./language";
import { questionTag } from "./question-tag";
import { users } from "./users";

/**
 * 多肢選択問題
 */
export const multipleChoiceQuestion = pgTable(
  "multiple_choice_question",
  {
    id: serial().primaryKey().notNull(),
    question: text().notNull(),
    choices: text("choices").array().notNull(),
    explanation: text().notNull(),
    questionTranslation: text("question_translation").notNull(),
    choicesTranslation: text("choices_translation").array().notNull(),
    explanationTranslation: text("explanation_translation").notNull(),
    correctAnswers: integer("correct_answers").array().notNull(),
    authorId: text("author_id").notNull(),
    language: language().notNull(),
    translationLanguage: language("translation_language").notNull(),
    tags: questionTag().array().notNull(),
    isPublic: boolean("is_public").default(true).notNull(),
    correctCount: integer("correct_count").default(0).notNull(),
    incorrectCount: integer("incorrect_count").default(0).notNull(),
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
      name: "multiple_choice_question_author_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
