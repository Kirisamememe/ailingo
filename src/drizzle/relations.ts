import { relations } from "drizzle-orm/relations";
import {
  accounts,
  clozeTestQuestion,
  generatedReading,
  multipleChoiceAnswer,
  multipleChoiceQuestion,
  users,
  wordCard,
  writing,
} from "./schema";

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
  multipleChoiceQuestions: many(multipleChoiceQuestion),
  multipleChoiceAnswers: many(multipleChoiceAnswer),
  clozeTestQuestions: many(clozeTestQuestion),
  generatedReadings: many(generatedReading),
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

/**
 * 多肢選択問題のリレーション
 */
export const multipleChoiceQuestionRelations = relations(
  multipleChoiceQuestion,
  ({ one, many }) => ({
    author: one(users, {
      fields: [multipleChoiceQuestion.authorId],
      references: [users.id],
    }),
    answers: many(multipleChoiceAnswer),
  }),
);

/**
 * クローズテスト問題のリレーション
 */
export const clozeTestQuestionRelations = relations(clozeTestQuestion, ({ one }) => ({
  author: one(users, {
    fields: [clozeTestQuestion.authorId],
    references: [users.id],
  }),
}));

/**
 * 生成記事のリレーション
 */
export const generatedReadingRelations = relations(generatedReading, ({ one }) => ({
  author: one(users, {
    fields: [generatedReading.authorId],
    references: [users.id],
  }),
}));

/**
 * 多肢選択問題の回答履歴のリレーション
 */
export const multipleChoiceAnswerRelations = relations(multipleChoiceAnswer, ({ one }) => ({
  user: one(users, {
    fields: [multipleChoiceAnswer.userId],
    references: [users.id],
  }),
  question: one(multipleChoiceQuestion, {
    fields: [multipleChoiceAnswer.questionId],
    references: [multipleChoiceQuestion.id],
  }),
}));
