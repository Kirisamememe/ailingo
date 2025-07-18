import "server-only";
import { and, asc, desc, eq, isNull, lte } from "drizzle-orm";
import type z from "zod";
import { db, dbExceptionHandler } from "@/lib/db";
import type { wordcardFormSchema } from "@/app/[locale]/(protected)/wordbook/_schema/wordcard";
import { wordCard } from "@/drizzle/schema";

/**
 * WordCardService
 */
class WordCardService {
  /**
   * 単語カードを取得する
   */
  async getUnique(id: number) {
    const result = await db
      .select()
      .from(wordCard)
      .where(eq(wordCard.id, id))
      .catch(dbExceptionHandler);
    return result.length ? result[0] : null;
  }

  /**
   * 単語カードを複数件取得する
   */
  async getMany(operatorId: string) {
    const wordCards = await db
      .select()
      .from(wordCard)
      .where(and(eq(wordCard.authorId, operatorId), isNull(wordCard.deletedAt)))
      .orderBy(desc(wordCard.createdAt))
      .catch(dbExceptionHandler);
    return wordCards;
  }

  /**
   * 単語カードを作成する
   */
  async create(wordCardData: z.infer<typeof wordcardFormSchema>, operatorId: string) {
    await db
      .insert(wordCard)
      .values({ ...wordCardData, authorId: operatorId, updatedAt: new Date() })
      .catch(dbExceptionHandler);
  }

  /**
   * 単語カードを複数件作成する
   */
  async createMany(wordcards: z.infer<typeof wordcardFormSchema>[], operatorId: string) {
    await db
      .insert(wordCard)
      .values(
        wordcards.map((wordcard) => ({
          ...wordcard,
          authorId: operatorId,
          updatedAt: new Date(),
        })),
      )
      .catch(dbExceptionHandler);
  }

  /**
   * 単語カードを更新する
   */
  async update(id: number, wordCardData: z.infer<typeof wordcardFormSchema>) {
    await db
      .update(wordCard)
      .set({ ...wordCardData, updatedAt: new Date() })
      .where(eq(wordCard.id, id))
      .catch(dbExceptionHandler);
  }

  /**
   * 単語カードを削除する
   */
  async delete(id: number): Promise<void> {
    await db
      .update(wordCard)
      .set({ deletedAt: new Date() })
      .where(eq(wordCard.id, id))
      .catch(dbExceptionHandler);
  }

  /**
   * 今日覚える新しい単語を取得する
   */
  async getDailyNewWords(userId: string, number: number) {
    const result = await db
      .select({ id: wordCard.id, entry: wordCard.entry })
      .from(wordCard)
      .where(
        and(
          eq(wordCard.authorId, userId),
          eq(wordCard.retentionRate, 1),
          isNull(wordCard.deletedAt),
          isNull(wordCard.masteredAt),
        ),
      )
      .orderBy(
        asc(wordCard.createdAt),
        asc(wordCard.id),
        asc(wordCard.updatedAt),
        asc(wordCard.entry),
      )
      .limit(number)
      .catch(dbExceptionHandler);
    return result;
  }

  /**
   * 今日復習する単語を取得する
   */
  async getDailyReviewWords(userId: string, date: string) {
    const result = await db
      .select({ id: wordCard.id, entry: wordCard.entry })
      .from(wordCard)
      .where(
        and(
          eq(wordCard.authorId, userId),
          isNull(wordCard.deletedAt),
          isNull(wordCard.masteredAt),
          lte(wordCard.nextReviewAt, date),
        ),
      )
      .orderBy(asc(wordCard.lastReviewedAt))
      .catch(dbExceptionHandler);
    return result;
  }
}

const wordCardService = new WordCardService();
export { wordCardService };
