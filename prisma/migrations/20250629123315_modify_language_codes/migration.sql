/*
  Warnings:

  - The values [KO,FR,DE,ES,PT,IT,RU,VI] on the enum `language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "language_new" AS ENUM ('EN_GB', 'EN_US', 'JA', 'ZH_CN', 'ZH_TW', 'KO_KR', 'FR_FR', 'DE_DE', 'ES_ES', 'IT_IT');
ALTER TABLE "user" ALTER COLUMN "learning_language" TYPE "language_new" USING ("learning_language"::text::"language_new");
ALTER TABLE "user" ALTER COLUMN "native_language" TYPE "language_new" USING ("native_language"::text::"language_new");
ALTER TABLE "word_card" ALTER COLUMN "language" TYPE "language_new" USING ("language"::text::"language_new");
ALTER TYPE "language" RENAME TO "language_old";
ALTER TYPE "language_new" RENAME TO "language";
DROP TYPE "language_old";
COMMIT;
