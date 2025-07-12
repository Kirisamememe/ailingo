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
    const newWords = await wordCardService.getDailyNewWords(userId, 10);
    const reviewWords = await wordCardService.getDailyReviewWords(userId, date);

    if (!newWords.length && !reviewWords.length) {
      return;
    }

    const newWordsString = newWords.map((word) => `${word.id}|${word.word}`).join(",");
    const reviewWordsString = reviewWords.map((word) => `${word.id}|${word.word}`).join(",");

    if (
      newWordsString === lastLearning?.newWords &&
      reviewWordsString === lastLearning.reviewWords
    ) {
      await dailyService.updateDailyLearning(userId, lastLearning.id, date);
      return;
    }

    await dailyService.createDailyLearning(userId, date, newWordsString, reviewWordsString);
  }
};
