import "server-only";
import { db } from "@/lib/db";
import type { CompositionCorrectionDBRequestSchema } from "@/app/[locale]/(protected)/composition-correction/_schema";
import { composition } from "@/drizzle/schema";

class CompositionService {
  async create(data: CompositionCorrectionDBRequestSchema, operatorId: string) {
    await db.insert(composition).values({
      ...data,
      authorId: operatorId,
      updatedAt: new Date(),
    });
  }
}

const compositionService = new CompositionService();
export { compositionService };
