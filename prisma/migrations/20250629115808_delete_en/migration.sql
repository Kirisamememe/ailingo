/*
  Warnings:

  - The values [EN] on the enum `language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "language_new" AS ENUM ('EN_GB', 'EN_US', 'JA', 'ZH_CN', 'ZH_TW', 'KO', 'FR', 'DE', 'ES', 'PT', 'IT', 'RU', 'VI');
ALTER TABLE "user" ALTER COLUMN "learning_language" TYPE "language_new" USING ((CASE WHEN "learning_language"::text = 'EN' THEN 'EN_US' ELSE "learning_language"::text END)::"language_new");
ALTER TABLE "user" ALTER COLUMN "native_language" TYPE "language_new" USING ((CASE WHEN "native_language"::text = 'EN' THEN 'EN_US' ELSE "native_language"::text END)::"language_new");
ALTER TABLE "word_card" ALTER COLUMN "language" TYPE "language_new" USING ((CASE WHEN "language"::text = 'EN' THEN 'EN_US' ELSE "language"::text END)::"language_new");
ALTER TYPE "language" RENAME TO "language_old";
ALTER TYPE "language_new" RENAME TO "language";
DROP TYPE "language_old";
COMMIT;
