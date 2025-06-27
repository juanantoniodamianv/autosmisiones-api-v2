/*
  Warnings:

  - Added the required column `updatedAt` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Add updatedAt column with default value for existing rows
ALTER TABLE "Publication" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to have updatedAt set to createdAt
UPDATE "Publication" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
