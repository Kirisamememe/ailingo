ALTER TABLE "word_card" ADD COLUMN "translation_language" "Language";

UPDATE "word_card" SET "translation_language" = 'ja';

ALTER TABLE "word_card" ALTER COLUMN "translation_language" SET NOT NULL;