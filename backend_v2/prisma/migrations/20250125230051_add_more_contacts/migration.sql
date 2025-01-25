/*
  Warnings:

  - A unique constraint covering the columns `[yaMapsLink]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twogisLink]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gMapsLink]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegram]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "contactTelegram" TEXT,
ADD COLUMN     "gMapsLink" TEXT,
ADD COLUMN     "twogisLink" TEXT,
ADD COLUMN     "yaMapsLink" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegram" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_yaMapsLink_key" ON "Branch"("yaMapsLink");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_twogisLink_key" ON "Branch"("twogisLink");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_gMapsLink_key" ON "Branch"("gMapsLink");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_key" ON "User"("telegram");
