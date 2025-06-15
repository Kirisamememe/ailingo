/*
  Warnings:

  - You are about to drop the column `definition` on the `word_card` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `word_card` table. All the data in the column will be lost.
  - Added the required column `definitions` to the `word_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "word_card" DROP COLUMN "definition",
DROP COLUMN "pos",
ADD COLUMN     "antonyms" TEXT,
ADD COLUMN     "definitions" TEXT NOT NULL,
ADD COLUMN     "derivatives" TEXT,
ADD COLUMN     "last_reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "next_review_at" TIMESTAMP(3),
ADD COLUMN     "synonyms" TEXT;

-- DropEnum
DROP TYPE "POS";
