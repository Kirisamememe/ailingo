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
import { dailyLearning } from "./daily";
import { multipleChoiceQuestion } from "./multiple-choice-question";
import { users } from "./users";

/**
 * 多肢選択問題の回答履歴
 */
export const multipleChoiceAnswer = pgTable(
  "multiple_choice_answer",
  {
    id: serial().primaryKey().notNull(),
    /** ユーザーID */
    userId: text("user_id").notNull(),
    /** 問題ID */
    questionId: integer("question_id").notNull(),
    /** 正解かどうか */
    isCorrect: boolean("is_correct").notNull(),
    /** ユーザーが選択した答え */
    selectedAnswers: integer("selected_answers").array().notNull(),
    /** 解答にかかった時間（ミリ秒） */
    timeSpent: integer("time_spent").notNull(),
    /** 学習セッションID（同じセッションで解いた問題をグループ化） */
    dailyLearningId: integer("daily_learning_id"),
    /** 解答日時 */
    answeredAt: timestamp("answered_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "multiple_choice_answer_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.questionId],
      foreignColumns: [multipleChoiceQuestion.id],
      name: "multiple_choice_answer_question_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.dailyLearningId],
      foreignColumns: [dailyLearning.id],
      name: "multiple_choice_answer_daily_learning_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
