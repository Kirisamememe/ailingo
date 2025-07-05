/*
  Warnings:

  - Added the required column `feedback` to the `composition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "composition" ADD COLUMN     "context" TEXT,
ADD COLUMN     "feedback" TEXT NOT NULL;
