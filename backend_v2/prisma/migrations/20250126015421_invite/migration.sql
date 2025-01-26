-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "isUsed" BOOLEAN NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);
