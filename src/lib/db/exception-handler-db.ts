import { Prisma } from "@/generated/prisma";

/**
 * データベースのエラーを処理する
 * @param error - エラー
 * @returns エラー
 */
export const dbExceptionHandler = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // eslint-disable-next-line no-console
    console.error(e.stack);
  }
  throw e;
};
