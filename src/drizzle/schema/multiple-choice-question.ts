import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { language } from "./language";
import { questionTag } from "./question-tag";
import { users } from "./users";

/**
 * 多肢選択問題の種類（出題形式）
 */
export const multipleChoiceQuestionType = pgEnum("multiple_choice_question_type", [
  "FILL_IN_BLANK", // 穴埋め形式
  "SELECT_FOR_UNDERLINED", // 下線部選択形式
  "COMPREHENSION", // 読解・聴解選択形式
  "ARRANGEMENT", // 並び替え選択形式
]);

/**
 * 多肢選問題の難易度
 */
export const multipleChoiceQuestionDifficulty = pgEnum("multiple_choice_question_difficulty", [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "NATIVE",
]);

/**
 * 多肢選択問題
 */
export const multipleChoiceQuestion = pgTable(
  "multiple_choice_question",
  {
    id: serial().primaryKey().notNull(),
    type: multipleChoiceQuestionType().notNull(),
    difficulty: multipleChoiceQuestionDifficulty().notNull(),
    question: text().notNull(),
    choices: text("choices").array().notNull(),
    explanation: text().notNull(),
    questionTranslation: text("question_translation").notNull(),
    choicesTranslation: text("choices_translation")
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
    explanationTranslation: text("explanation_translation").notNull(),
    correctAnswers: integer("correct_answers").array().notNull(),
    authorId: text("author_id").notNull(),
    language: language().notNull(),
    translationLanguage: language("translation_language").notNull(),
    tags: questionTag().array().notNull(),
    isPublic: boolean("is_public").default(true).notNull(),
    isSingleChoice: boolean("is_single_choice").default(true).notNull(),
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

/**
 * 複数選択問題挿入スキーマ
 */
export const multipleChoiceQuestionInsertSchema = createInsertSchema(multipleChoiceQuestion);
