import "server-only";
import { db } from "@/lib/db";
import type { WritingCorrectionDBRequestSchema } from "@/app/[locale]/(protected)/writing-correction/_schema";
import { writing } from "@/drizzle/schema";

class WritingService {
  async create(data: WritingCorrectionDBRequestSchema, operatorId: string) {
    await db.insert(writing).values({
      ...data,
      authorId: operatorId,
      updatedAt: new Date(),
    });
  }
}

const writingService = new WritingService();
export { writingService };
