-- CreateTable
CREATE TABLE "BranchesUsers" (
    "userId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "BranchesUsers_pkey" PRIMARY KEY ("userId","branchId")
);

-- AddForeignKey
ALTER TABLE "BranchesUsers" ADD CONSTRAINT "BranchesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchesUsers" ADD CONSTRAINT "BranchesUsers_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
