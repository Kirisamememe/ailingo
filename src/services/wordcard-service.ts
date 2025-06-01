import "server-only";
import { dbExceptionHandler } from "@/lib/db";
import type { WordCard } from "@/generated/prisma";
import prisma from "@/prisma";

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
  async getMany(ids: number[]): Promise<WordCard[]> {
    const wordCards = await prisma.wordCard
      .findMany({ where: { id: { in: ids } } })
      .catch(dbExceptionHandler);
    return wordCards;
  }

  /**
   * 単語カードを作成する
   */
  async create(wordCard: WordCard): Promise<WordCard> {
    const newWordCard = await prisma.wordCard.create({ data: wordCard }).catch(dbExceptionHandler);
    return newWordCard;
  }

  /**
   * 単語カードを更新する
   */
  async update(id: number, wordCard: WordCard): Promise<WordCard> {
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
