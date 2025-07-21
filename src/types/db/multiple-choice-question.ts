import type { multipleChoiceQuestion } from "@/drizzle/schema";

/**
 * 複数選択問題
 */
export type MultipleChoiceQuestion = typeof multipleChoiceQuestion.$inferSelect;

/**
 * 複数選択問題挿入
 */
export type MultipleChoiceQuestionInsert = typeof multipleChoiceQuestion.$inferInsert;
