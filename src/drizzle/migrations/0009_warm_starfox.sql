-- Drop and recreate the table with correct id type
DROP TABLE "daily_learning";

CREATE TABLE "daily_learning" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"user_id" text NOT NULL,
	"new_words" text NOT NULL,
	"review_words" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"quiz_completed_at" timestamp (3),
	"reading_completed_at" timestamp (3),
	"writing_completed_at" timestamp (3),
	CONSTRAINT "daily_learning_date_user_id_key" UNIQUE("date","user_id")
);
--> statement-breakpoint
ALTER TABLE "daily_learning" ADD CONSTRAINT "daily_learning_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;