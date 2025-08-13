ALTER TABLE "multiple_choice_question" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."multiple_choice_question_type";--> statement-breakpoint
CREATE TYPE "public"."multiple_choice_question_type" AS ENUM('FILL_IN_BLANK', 'SELECT_FOR_UNDERLINED', 'ARRANGEMENT');--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ALTER COLUMN "type" SET DATA TYPE "public"."multiple_choice_question_type" USING "type"::"public"."multiple_choice_question_type";