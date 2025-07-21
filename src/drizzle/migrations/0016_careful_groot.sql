CREATE TYPE "public"."question_tag" AS ENUM('grammar_present_tense', 'grammar_past_tense', 'grammar_future_tense', 'grammar_present_perfect', 'grammar_past_perfect', 'grammar_future_perfect', 'grammar_present_continuous', 'grammar_past_continuous', 'grammar_present_perfect_continuous', 'grammar_tense_sequence', 'grammar_question_form', 'grammar_negative_form', 'grammar_passive_voice', 'grammar_passive_causative', 'grammar_emphasis_cleft', 'grammar_inversion', 'grammar_ellipsis', 'grammar_parallel_structure', 'grammar_modal_basic', 'grammar_modal_inference', 'grammar_modal_subjunctive', 'grammar_conditionals_simple', 'grammar_conditionals_mixed', 'grammar_conditionals_wish', 'grammar_subjunctive_present', 'grammar_infinitive_basic', 'grammar_infinitive_split', 'grammar_gerund_basic', 'grammar_gerund_complex', 'grammar_participle_basic', 'grammar_participle_construction', 'grammar_relative_basic', 'grammar_relative_complex', 'grammar_article', 'grammar_countable_uncountable', 'grammar_apposition', 'grammar_adjective', 'grammar_adverb', 'grammar_comparison_basic', 'grammar_comparison_complex', 'grammar_preposition', 'grammar_conjunction', 'grammar_phrasal_verb', 'grammar_idiomatic_usage', 'vocabulary_basic', 'vocabulary_collocation', 'vocabulary_idiom');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TABLE "cloze_test_question" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answers" text[] NOT NULL,
	"explanation" text,
	"question_translation" text NOT NULL,
	"answers_translation" text[] NOT NULL,
	"explanation_translation" text,
	"author_id" text NOT NULL,
	"language" "Language" NOT NULL,
	"translation_language" "Language" NOT NULL,
	"tags" "question_tag"[] NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"incorrect_count" integer DEFAULT 0 NOT NULL,
	"generated_by" text NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generated_reading" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"translation" text NOT NULL,
	"key_words_or_phrases" text[] NOT NULL,
	"key_difficulty_explanation" text NOT NULL,
	"language" "Language" NOT NULL,
	"translation_language" "Language" NOT NULL,
	"author_id" text NOT NULL,
	"tags" text[] NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"generated_by" text NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "multiple_choice_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"choices" text[] NOT NULL,
	"explanation" text NOT NULL,
	"question_translation" text NOT NULL,
	"choices_translation" text[] NOT NULL,
	"explanation_translation" text NOT NULL,
	"correct_answers" integer[] NOT NULL,
	"author_id" text NOT NULL,
	"language" "Language" NOT NULL,
	"translation_language" "Language" NOT NULL,
	"tags" "question_tag"[] NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"incorrect_count" integer DEFAULT 0 NOT NULL,
	"generated_by" text NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "multiple_choice_answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"question_id" integer NOT NULL,
	"is_correct" boolean NOT NULL,
	"selected_answers" integer[] NOT NULL,
	"time_spent" integer NOT NULL,
	"daily_learning_id" integer,
	"answered_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "word_card" ADD COLUMN "priority" "priority" DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE "cloze_test_question" ADD CONSTRAINT "cloze_test_question_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "generated_reading" ADD CONSTRAINT "generated_reading_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD CONSTRAINT "multiple_choice_question_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "multiple_choice_answer" ADD CONSTRAINT "multiple_choice_answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "multiple_choice_answer" ADD CONSTRAINT "multiple_choice_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."multiple_choice_question"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "multiple_choice_answer" ADD CONSTRAINT "multiple_choice_answer_daily_learning_id_fkey" FOREIGN KEY ("daily_learning_id") REFERENCES "public"."daily_learning"("id") ON DELETE cascade ON UPDATE cascade;