import "server-only";
import type { DatabaseError } from "pg";

/**
 * データベースのエラーを処理する
 * @param error - エラー
 * @returns エラー
 */
export const dbExceptionHandler = (e: unknown) => {
  if (isDatabaseError(e)) {
    // eslint-disable-next-line no-console
    console.error("Database Error:", {
      code: e.code,
      message: e.message,
      detail: e.detail,
      table: e.table,
      column: e.column,
      constraint: e.constraint,
    });
  } else {
    // eslint-disable-next-line no-console
    console.error("Unknown Error:", e);
  }
  throw e;
};

/**
 * PostgreSQLのエラーかどうかを判定する
 */
const isDatabaseError = (error: unknown): error is DatabaseError => {
  return error !== null && typeof error === "object" && "code" in error && "message" in error;
};
