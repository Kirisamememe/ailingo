import { sql } from "drizzle-orm";
import { date, foreignKey, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * ユーザー
 */
export const dailyLearning = pgTable(
  "daily_learning",
  {
    id: serial().primaryKey().notNull(),
    date: date("date", { mode: "string" }).notNull(),
    userId: text("user_id").notNull(),
    newWords: text("new_words").notNull(), // [id]word|[id]word|[id]word|...
    reviewWords: text("review_words"), // [id]word|[id]word|[id]word|...
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    quizCompletedAt: timestamp("quiz_completed_at", { precision: 3 }),
    readingCompletedAt: timestamp("reading_completed_at", { precision: 3 }),
    writingCompletedAt: timestamp("writing_completed_at", { precision: 3 }),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "daily_learning_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("daily_learning_date_user_id_key").on(table.date, table.userId),
  ],
);
