ALTER TABLE "daily_learning" RENAME COLUMN "words" TO "new_words";--> statement-breakpoint
ALTER TABLE "daily_learning" ADD COLUMN "review_words" text;