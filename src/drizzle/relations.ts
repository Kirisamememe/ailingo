import { relations } from "drizzle-orm/relations";
import { accounts, composition, users, wordCard } from "./schema";

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
  compositions: many(composition),
  wordCards: many(wordCard),
}));

/**
 * 作文のリレーション
 */
export const compositionRelations = relations(composition, ({ one }) => ({
  user: one(users, {
    fields: [composition.authorId],
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
