import "server-only";
import { prisma } from "@/lib/db";
import type { CompositionCorrectionDBRequestSchema } from "@/app/[locale]/(protected)/composition-correction/_schema";

class CompositionService {
  async create(data: CompositionCorrectionDBRequestSchema, operatorId: string) {
    const composition = await prisma.composition.create({
      data: {
        ...data,
        authorId: operatorId,
      },
    });
    return composition;
  }
}

const compositionService = new CompositionService();
export { compositionService };
