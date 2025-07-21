import "server-only";
import { getCurrentDate } from "@/lib/utils";
import { wordCardService } from "@/services";
import { dailyService } from "@/services/daily-service";

/**
 * 日々の学習計画を作成する
 * @param userId ユーザーID
 */
export const planDailyLearning = async (userId: string) => {
  const date = getCurrentDate();
  const lastLearning = await dailyService.getLastLearning(userId);

  if (!lastLearning || lastLearning.date !== date) {
    const newEntries = await wordCardService.getDailyNewWords(userId, 10);
    const reviewEntries = await wordCardService.getDailyReviewWords(userId, date);

    if (!newEntries.length && !reviewEntries.length) {
      return;
    }

    if (
      lastLearning &&
      JSON.stringify(newEntries) === JSON.stringify(lastLearning.newEntries) &&
      JSON.stringify(reviewEntries) === JSON.stringify(lastLearning.reviewEntries)
    ) {
      await dailyService.updateDailyLearning(userId, lastLearning.id, date);
      return;
    }

    await dailyService.createDailyLearning(userId, date, newEntries, reviewEntries);
  }
};
