import { sql } from "drizzle-orm";
import { boolean, foreignKey, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { language } from "./language";
import { users } from "./users";

/**
 * クローズテスト問題
 */
export const clozeTestQuestion = pgTable(
  "cloze_test_question",
  {
    id: text("id").primaryKey(),
    /** 問題文（穴埋め箇所は{blank}などで表現） */
    question: text("question").notNull(),
    /** 正解（複数の穴がある場合は配列で管理） */
    answers: text("answers").array().notNull(),
    /** 問題の説明・解説 */
    explanation: text("explanation"),
    /** 問題文の翻訳 */
    questionTranslation: text("question_translation").notNull(),
    /** 正解の翻訳 */
    answersTranslation: text("answers_translation").array().notNull(),
    /** 解説の翻訳 */
    explanationTranslation: text("explanation_translation"),
    /** 作成者ID */
    authorId: text("author_id").notNull(),
    /** 問題の言語 */
    language: language().notNull(),
    /** 翻訳言語 */
    translationLanguage: language("translation_language").notNull(),
    /** 問題のタグ（文法項目など） */
    tags: text().array().notNull(),
    /** 公開設定 */
    isPublic: boolean("is_public").default(true).notNull(),
    /** 正解数 */
    correctCount: integer("correct_count").default(0).notNull(),
    /** 不正解数 */
    incorrectCount: integer("incorrect_count").default(0).notNull(),
    /** 生成方法 */
    generatedBy: text("generated_by").notNull(),
    /** 作成日時 */
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    /** 更新日時 */
    updatedAt: timestamp("updated_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [users.id],
      name: "cloze_test_question_author_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
