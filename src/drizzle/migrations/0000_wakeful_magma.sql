CREATE TYPE "public"."Role" AS ENUM('ADMIN', 'USER', 'VIEWER', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "composition" (
	"id" serial PRIMARY KEY NOT NULL,
	"original" text NOT NULL,
	"corrected" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"deleted_at" timestamp(3),
	"author_id" text NOT NULL,
	"context" text,
	"feedback" text NOT NULL,
	"feedback_language" text NOT NULL,
	"language" text NOT NULL
);--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Anonymous' NOT NULL,
	"role" "Role" DEFAULT 'VIEWER' NOT NULL,
	"image" text,
	"email" text NOT NULL,
	"emailVerified" timestamp(3),
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"mastered_words" text DEFAULT 'I, you, he, she, it, we, they' NOT NULL,
	"learning_language" text,
	"native_language" text
);--> statement-breakpoint
CREATE TABLE "word_card" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"phonetics" text NOT NULL,
	"example_1" text NOT NULL,
	"example_2" text,
	"example_3" text,
	"note" text,
	"retention_rate" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"mastered_at" timestamp(3),
	"deleted_at" timestamp(3),
	"author_id" text NOT NULL,
	"antonyms" text,
	"definitions" text NOT NULL,
	"derivatives" text,
	"last_reviewed_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"next_review_at" timestamp(3),
	"synonyms" text,
	"language" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL,
	CONSTRAINT "verification_token_pkey" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "composition" ADD CONSTRAINT "composition_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "word_card" ADD CONSTRAINT "word_card_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts" USING btree ("provider" text_ops,"provider_account_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_key" ON "user" USING btree ("email" text_ops);


