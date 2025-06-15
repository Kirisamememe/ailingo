/*
  Warnings:

  - Made the column `language` on table `word_card` required. This step will fail if there are existing NULL values in that column.

*/
-- First, set all existing NULL language values to 'EN'
UPDATE "word_card" SET "language" = 'EN' WHERE "language" IS NULL;

-- Then make the column NOT NULL
ALTER TABLE "word_card" ALTER COLUMN "language" SET NOT NULL;
