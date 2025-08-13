import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db, dbExceptionHandler } from "@/lib/db";
import { dailyLearning } from "@/drizzle/schema";
import type { DailyLearningNewEntry, DailyLearningReviewEntry } from "@/types/db";

class DailyService {
  /**
   * 今日の学習を取得する
   */
  async getDailyLearning(userId: string, date: string) {
    const result = await db
      .select()
      .from(dailyLearning)
      .where(and(eq(dailyLearning.userId, userId), eq(dailyLearning.date, date)));
    return result.length ? result[0] : undefined;
  }

  /**
   * 今日の学習が生成されているかどうかを確認する
   */
  async isTodayLearningGenerated(userId: string, date: string) {
    const result = await db
      .select()
      .from(dailyLearning)
      .where(and(eq(dailyLearning.userId, userId), eq(dailyLearning.date, date)));
    return result.length > 0;
  }

  /**
   * 最後の学習を取得する
   */
  async getLastLearning(userId: string) {
    const result = await db
      .select()
      .from(dailyLearning)
      .where(eq(dailyLearning.userId, userId))
      .orderBy(desc(dailyLearning.createdAt))
      .limit(1);
    return result.length ? result[0] : undefined;
  }

  /**
   * 今日の学習を生成する
   */
  async createDailyLearning(
    userId: string,
    date: string,
    newEntries: DailyLearningNewEntry[],
    reviewEntries: DailyLearningReviewEntry[],
  ) {
    const result = await db
      .insert(dailyLearning)
      .values({
        userId,
        date,
        newEntries,
        reviewEntries,
      })
      .returning()
      .catch(dbExceptionHandler);
    return result.length ? result[0] : undefined;
  }

  /**
   * 今日の学習の日付を更新する
   */
  async updateDailyLearning(userId: string, learningId: number, date: string) {
    const result = await db
      .update(dailyLearning)
      .set({ date })
      .where(and(eq(dailyLearning.userId, userId), eq(dailyLearning.id, learningId)))
      .returning()
      .catch(dbExceptionHandler);
    return result.length ? result[0] : undefined;
  }
}

const dailyService = new DailyService();
export { dailyService };
