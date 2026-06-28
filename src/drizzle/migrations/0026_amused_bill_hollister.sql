CREATE TABLE "allowed_email" (
	"email" text PRIMARY KEY NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_challenge" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"challenge" text NOT NULL,
	"code_verifier" text,
	"nonce" text,
	"redirect_to" text,
	"email" text,
	"user_id" text,
	"expires_at" timestamp (3) NOT NULL,
	"consumed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_session" (
	"id" text PRIMARY KEY NOT NULL,
	"token_hash" text NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp (3) NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"ip_address" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "passkey" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"webauthn_user_id" text NOT NULL,
	"public_key" text NOT NULL,
	"counter" bigint DEFAULT 0 NOT NULL,
	"device_type" text NOT NULL,
	"backed_up" boolean DEFAULT false NOT NULL,
	"transports" text[],
	"name" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_used_at" timestamp (3)
);
--> statement-breakpoint
ALTER TABLE "auth_challenge" ADD CONSTRAINT "auth_challenge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "auth_session_token_hash_key" ON "auth_session" USING btree ("token_hash" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "passkey_webauthn_user_id_user_id_key" ON "passkey" USING btree ("webauthn_user_id" text_ops,"user_id" text_ops);
