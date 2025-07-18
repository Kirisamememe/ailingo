ALTER TABLE "word_card" RENAME COLUMN "word" TO "entry";--> statement-breakpoint
ALTER TABLE "word_card" ADD COLUMN "collocations" text;