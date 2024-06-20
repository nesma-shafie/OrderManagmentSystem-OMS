-- CreateTable
CREATE TABLE "Coupons" (
    "cupon" TEXT NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("cupon")
);
