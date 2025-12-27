/*
  Warnings:

  - Added the required column `updatedAt` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WORK', 'FAMILY', 'STUDY', 'ENTERTAINMENT');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'WORK',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
