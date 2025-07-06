/*
  Warnings:

  - The `learning_language` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `native_language` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `feedback_language` to the `composition` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `language` on the `composition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `word_card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

-- First, add the feedback_language column to composition table with default value
ALTER TABLE "composition" ADD COLUMN "feedback_language" TEXT DEFAULT 'zh-CN';

-- Update existing records to set feedback_language to zh-CN
UPDATE "composition" SET "feedback_language" = 'zh-CN' WHERE "feedback_language" IS NULL;

-- Now make feedback_language NOT NULL
ALTER TABLE "composition" ALTER COLUMN "feedback_language" SET NOT NULL;

-- Convert composition.language from ENUM to TEXT with data conversion
ALTER TABLE "composition" ADD COLUMN "language_temp" TEXT;

-- Update the temp column with converted values
UPDATE "composition" SET "language_temp" = 
  CASE 
    WHEN "language"::text = 'EN_US' THEN 'en-US'
    WHEN "language"::text = 'EN_GB' THEN 'en-GB'
    WHEN "language"::text = 'JA' THEN 'ja'
    WHEN "language"::text = 'ZH_CN' THEN 'zh-CN'
    WHEN "language"::text = 'ZH_TW' THEN 'zh-TW'
    WHEN "language"::text = 'KO_KR' THEN 'ko-KR'
    WHEN "language"::text = 'DE_DE' THEN 'de-DE'
    WHEN "language"::text = 'ES_ES' THEN 'es-ES'
    WHEN "language"::text = 'FR_FR' THEN 'fr-FR'
    WHEN "language"::text = 'IT_IT' THEN 'it-IT'
    ELSE "language"::text
  END;

-- Drop the old column and rename the temp column
ALTER TABLE "composition" DROP COLUMN "language";
ALTER TABLE "composition" RENAME COLUMN "language_temp" TO "language";
ALTER TABLE "composition" ALTER COLUMN "language" SET NOT NULL;

-- Convert word_card.language from ENUM to TEXT with data conversion
ALTER TABLE "word_card" ADD COLUMN "language_temp" TEXT;

-- Update the temp column with converted values
UPDATE "word_card" SET "language_temp" = 
  CASE 
    WHEN "language"::text = 'EN_US' THEN 'en-US'
    WHEN "language"::text = 'EN_GB' THEN 'en-GB'
    WHEN "language"::text = 'JA' THEN 'ja'
    WHEN "language"::text = 'ZH_CN' THEN 'zh-CN'
    WHEN "language"::text = 'ZH_TW' THEN 'zh-TW'
    WHEN "language"::text = 'KO_KR' THEN 'ko-KR'
    WHEN "language"::text = 'DE_DE' THEN 'de-DE'
    WHEN "language"::text = 'ES_ES' THEN 'es-ES'
    WHEN "language"::text = 'FR_FR' THEN 'fr-FR'
    WHEN "language"::text = 'IT_IT' THEN 'it-IT'
    ELSE "language"::text
  END;

-- Drop the old column and rename the temp column
ALTER TABLE "word_card" DROP COLUMN "language";
ALTER TABLE "word_card" RENAME COLUMN "language_temp" TO "language";
ALTER TABLE "word_card" ALTER COLUMN "language" SET NOT NULL;

-- Convert user.learning_language from ENUM to TEXT with data conversion
ALTER TABLE "user" ADD COLUMN "learning_language_temp" TEXT;

-- Update the temp column with converted values
UPDATE "user" SET "learning_language_temp" = 
  CASE 
    WHEN "learning_language"::text = 'EN_US' THEN 'en-US'
    WHEN "learning_language"::text = 'EN_GB' THEN 'en-GB'
    WHEN "learning_language"::text = 'JA' THEN 'ja'
    WHEN "learning_language"::text = 'ZH_CN' THEN 'zh-CN'
    WHEN "learning_language"::text = 'ZH_TW' THEN 'zh-TW'
    WHEN "learning_language"::text = 'KO_KR' THEN 'ko-KR'
    WHEN "learning_language"::text = 'DE_DE' THEN 'de-DE'
    WHEN "learning_language"::text = 'ES_ES' THEN 'es-ES'
    WHEN "learning_language"::text = 'FR_FR' THEN 'fr-FR'
    WHEN "learning_language"::text = 'IT_IT' THEN 'it-IT'
    ELSE "learning_language"::text
  END
  WHERE "learning_language" IS NOT NULL;

-- Drop the old column and rename the temp column
ALTER TABLE "user" DROP COLUMN "learning_language";
ALTER TABLE "user" RENAME COLUMN "learning_language_temp" TO "learning_language";

-- Convert user.native_language from ENUM to TEXT with data conversion
ALTER TABLE "user" ADD COLUMN "native_language_temp" TEXT;

-- Update the temp column with converted values
UPDATE "user" SET "native_language_temp" = 
  CASE 
    WHEN "native_language"::text = 'EN_US' THEN 'en-US'
    WHEN "native_language"::text = 'EN_GB' THEN 'en-GB'
    WHEN "native_language"::text = 'JA' THEN 'ja'
    WHEN "native_language"::text = 'ZH_CN' THEN 'zh-CN'
    WHEN "native_language"::text = 'ZH_TW' THEN 'zh-TW'
    WHEN "native_language"::text = 'KO_KR' THEN 'ko-KR'
    WHEN "native_language"::text = 'DE_DE' THEN 'de-DE'
    WHEN "native_language"::text = 'ES_ES' THEN 'es-ES'
    WHEN "native_language"::text = 'FR_FR' THEN 'fr-FR'
    WHEN "native_language"::text = 'IT_IT' THEN 'it-IT'
    ELSE "native_language"::text
  END
  WHERE "native_language" IS NOT NULL;

-- Drop the old column and rename the temp column
ALTER TABLE "user" DROP COLUMN "native_language";
ALTER TABLE "user" RENAME COLUMN "native_language_temp" TO "native_language";

-- Remove the DEFAULT constraint from feedback_language column
ALTER TABLE "composition" ALTER COLUMN "feedback_language" DROP DEFAULT;

-- Drop the language ENUM
DROP TYPE "language";
