CREATE TYPE "public"."multiple_choice_question_difficulty" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE');--> statement-breakpoint
CREATE TYPE "public"."multiple_choice_question_type" AS ENUM('FILL_IN_BLANK', 'SELECT_FOR_UNDERLINED', 'COMPREHENSION', 'ARRANGEMENT');--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ALTER COLUMN "choices_translation" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD COLUMN "type" "multiple_choice_question_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD COLUMN "difficulty" "multiple_choice_question_difficulty" NOT NULL;