import { relations } from "drizzle-orm/relations";
import { accounts, users, wordCard, writing } from "./schema";

/**
 * アカウントのリレーション
 */
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

/**
 * ユーザーのリレーション
 */
export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  writings: many(writing),
  wordCards: many(wordCard),
}));

/**
 * 作文のリレーション
 */
export const writingRelations = relations(writing, ({ one }) => ({
  user: one(users, {
    fields: [writing.authorId],
    references: [users.id],
  }),
}));

/**
 * 単語カードのリレーション
 */
export const wordCardRelations = relations(wordCard, ({ one }) => ({
  user: one(users, {
    fields: [wordCard.authorId],
    references: [users.id],
  }),
}));
