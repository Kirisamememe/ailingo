UPDATE "daily_learning" SET "review_entries" = '[]'::jsonb WHERE "review_entries" IS NULL;--> statement-breakpoint
ALTER TABLE "daily_learning" ALTER COLUMN "review_entries" SET NOT NULL;