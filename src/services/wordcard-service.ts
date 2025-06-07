import "server-only";
import type z from "zod";
import { dbExceptionHandler } from "@/lib/db";
import type { WordCard } from "@/generated/prisma";
import prisma from "@/prisma";
import type { wordcardFormSchema } from "@/types/schema/wordcard";

/**
 * WordCardService
 */
class WordCardService {
  /**
   * 単語カードを取得する
   */
  async getUnique(id: number): Promise<WordCard | null> {
    const wordCard = await prisma.wordCard
      .findUnique({
        where: { id },
      })
      .catch(dbExceptionHandler);
    return wordCard;
  }

  /**
   * 単語カードを複数件取得する
   */
  async getMany(operatorId: string): Promise<WordCard[]> {
    const wordCards = await prisma.wordCard
      .findMany({
        where: { deletedAt: null, authorId: operatorId },
        orderBy: { updatedAt: "desc" },
      })
      .catch(dbExceptionHandler);
    return wordCards;
  }

  /**
   * 単語カードを作成する
   */
  async create(
    wordCard: z.infer<typeof wordcardFormSchema>,
    operatorId: string,
  ): Promise<WordCard> {
    const newWordCard = await prisma.wordCard
      .create({ data: { ...wordCard, authorId: operatorId } })
      .catch(dbExceptionHandler);
    return newWordCard;
  }

  /**
   * 単語カードを複数件作成する
   */
  async createMany(wordcards: z.infer<typeof wordcardFormSchema>[], operatorId: string) {
    const newWordCards = await prisma.wordCard
      .createMany({ data: wordcards.map((wordcard) => ({ ...wordcard, authorId: operatorId })) })
      .catch(dbExceptionHandler);
    return newWordCards;
  }

  /**
   * 単語カードを更新する
   */
  async update(id: number, wordCard: z.infer<typeof wordcardFormSchema>): Promise<WordCard> {
    const updatedWordCard = await prisma.wordCard
      .update({ where: { id }, data: wordCard })
      .catch(dbExceptionHandler);
    return updatedWordCard;
  }

  /**
   * 単語カードを削除する
   */
  async delete(id: number): Promise<void> {
    await prisma.wordCard
      .update({ where: { id }, data: { deletedAt: new Date() } })
      .catch(dbExceptionHandler);
  }
}

const wordCardService = new WordCardService();
export { wordCardService };
