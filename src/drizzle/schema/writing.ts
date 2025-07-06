import { sql } from "drizzle-orm";
import { foreignKey, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { language } from "./language";
import { users } from "./users";

/**
 * 作文
 */
export const writing = pgTable(
  "writing",
  {
    id: serial().primaryKey().notNull(),
    original: text().notNull(),
    corrected: text().notNull(),
    createdAt: timestamp("created_at", { precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 3 }).notNull(),
    deletedAt: timestamp("deleted_at", { precision: 3 }),
    authorId: text("author_id").notNull(),
    context: text(),
    feedback: text().notNull(),
    feedbackLanguage: language("feedback_language").notNull(),
    language: language().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [users.id],
      name: "writing_author_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
