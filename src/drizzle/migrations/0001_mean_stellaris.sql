ALTER TABLE "accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "provider_account_id" TO "providerAccountId";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_fkey";
--> statement-breakpoint
DROP INDEX "accounts_provider_provider_account_id_key";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "id";