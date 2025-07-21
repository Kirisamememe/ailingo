-- 既存のカラムを削除
ALTER TABLE "daily_learning" DROP COLUMN "new_words";--> statement-breakpoint
ALTER TABLE "daily_learning" DROP COLUMN "review_words";--> statement-breakpoint

-- 新しくjsonbカラムとして追加
ALTER TABLE "daily_learning" ADD COLUMN "new_words" jsonb NOT NULL DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "daily_learning" ADD COLUMN "review_words" jsonb;--> statement-breakpoint