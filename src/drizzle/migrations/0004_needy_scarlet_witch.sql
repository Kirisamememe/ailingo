ALTER TABLE "composition" RENAME TO "writing";--> statement-breakpoint
ALTER TABLE "writing" DROP CONSTRAINT "composition_author_id_fkey";
--> statement-breakpoint
ALTER TABLE "writing" ADD CONSTRAINT "writing_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
