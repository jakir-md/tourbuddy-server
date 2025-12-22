-- AlterTable
ALTER TABLE "TripApproval" ADD COLUMN     "moderatorId" TEXT;

-- AddForeignKey
ALTER TABLE "TripApproval" ADD CONSTRAINT "TripApproval_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
