CREATE TYPE "public"."Language" AS ENUM('en-US', 'en-GB', 'ja', 'zh-CN', 'zh-TW', 'ko-KR', 'de-DE', 'es-ES', 'fr-FR', 'it-IT');--> statement-breakpoint
ALTER TABLE "composition" ALTER COLUMN "feedback_language" SET DATA TYPE "public"."Language" USING "feedback_language"::"public"."Language";--> statement-breakpoint
ALTER TABLE "composition" ALTER COLUMN "language" SET DATA TYPE "public"."Language" USING "language"::"public"."Language";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "learning_language" SET DATA TYPE "public"."Language" USING "learning_language"::"public"."Language";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "native_language" SET DATA TYPE "public"."Language" USING "native_language"::"public"."Language";--> statement-breakpoint
ALTER TABLE "word_card" ALTER COLUMN "language" SET DATA TYPE "public"."Language" USING "language"::"public"."Language";