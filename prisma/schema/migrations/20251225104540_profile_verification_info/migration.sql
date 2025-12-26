-- CreateTable
CREATE TABLE "ProfileVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApproveStatus" NOT NULL DEFAULT 'PENDING',
    "fbPageLink" TEXT,
    "facebookProfileLink" TEXT,
    "selfieImage" TEXT NOT NULL,
    "nidFront" TEXT NOT NULL,
    "nidBack" TEXT NOT NULL,
    "utilityBill" TEXT NOT NULL,
    "moderatorId" TEXT,

    CONSTRAINT "ProfileVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileVerification" ADD CONSTRAINT "ProfileVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileVerification" ADD CONSTRAINT "ProfileVerification_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
