import "server-only";
import { db, dbExceptionHandler } from "@/lib/db";
import { multipleChoiceQuestion } from "@/drizzle/schema";
import type { MultipleChoiceQuestionInsert } from "@/types/db";

class MultipleChoiceQuestionService {
  /**
   * 複数選択問題を保存する
   */
  async saveMultipleChoiceQuestions(questions: MultipleChoiceQuestionInsert[]) {
    return await db
      .insert(multipleChoiceQuestion)
      .values(questions)
      .returning()
      .catch(dbExceptionHandler);
  }
}

const multipleChoiceQuestionService = new MultipleChoiceQuestionService();

export { multipleChoiceQuestionService };
