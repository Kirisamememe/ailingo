import type { dailyLearning } from "@/drizzle/schema/daily";

/**
 * 学習履歴
 */
export type DailyLearning = typeof dailyLearning.$inferSelect;

/**
 * 学習履歴の新規単語
 */
export type DailyLearningNewEntry = DailyLearning["newEntries"][number];

/**
 * 学習履歴の復習単語
 */
export type DailyLearningReviewEntry = DailyLearning["reviewEntries"][number];
