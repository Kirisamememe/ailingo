import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db, dbExceptionHandler } from "@/lib/db";
import { dailyLearning } from "@/drizzle/schema";

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
    newWords: string,
    reviewWords: string | undefined,
  ) {
    await db
      .insert(dailyLearning)
      .values({
        userId,
        date,
        newWords,
        reviewWords,
      })
      .catch(dbExceptionHandler);
  }

  /**
   * 今日の学習の日付を更新する
   */
  async updateDailyLearning(userId: string, learningId: number, date: string) {
    await db
      .update(dailyLearning)
      .set({ date })
      .where(and(eq(dailyLearning.userId, userId), eq(dailyLearning.id, learningId)))
      .catch(dbExceptionHandler);
  }
}

const dailyService = new DailyService();
export { dailyService };
