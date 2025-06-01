-- CreateEnum
CREATE TYPE "POS" AS ENUM ('NOUN', 'VERB', 'TRANSITIVE_VERB', 'INTRANSITIVE_VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'PRONOUN', 'INTERJECTION', 'PHRASE', 'DETERMINER', 'SENTENCE', 'IDIOM', 'ORDINAL', 'OTHER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "mastered_words" TEXT NOT NULL DEFAULT 'I, you, he, she, it, we, they';

-- CreateTable
CREATE TABLE "word_card" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "phonetics" TEXT NOT NULL,
    "pos" "POS" NOT NULL,
    "definition" TEXT NOT NULL,
    "example_1" TEXT NOT NULL,
    "example_2" TEXT,
    "example_3" TEXT,
    "note" TEXT,
    "retention_rate" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mastered_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "language" "language",
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "word_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "word_card" ADD CONSTRAINT "word_card_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
