import "server-only";
import { desc } from "drizzle-orm";
import { db, dbExceptionHandler } from "@/lib/db";
import type { WritingCorrectionDBRequestSchema } from "@/app/[locale]/(protected)/writing-correction/_schema";
import { writing } from "@/drizzle/schema";

class WritingService {
  async create(data: WritingCorrectionDBRequestSchema, operatorId: string) {
    await db
      .insert(writing)
      .values({
        ...data,
        authorId: operatorId,
        updatedAt: new Date(),
      })
      .catch(dbExceptionHandler);
  }

  async findMany() {
    return await db.select().from(writing).orderBy(desc(writing.createdAt));
  }
}

const writingService = new WritingService();
export { writingService };
