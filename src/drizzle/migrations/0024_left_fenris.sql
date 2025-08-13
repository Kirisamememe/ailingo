
ALTER TABLE "cloze_test_question" DROP COLUMN "tags" CASCADE;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" DROP COLUMN "tags" CASCADE;--> statement-breakpoint

ALTER TABLE "cloze_test_question" ADD COLUMN "tags" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD COLUMN "tags" text[] NOT NULL;--> statement-breakpoint