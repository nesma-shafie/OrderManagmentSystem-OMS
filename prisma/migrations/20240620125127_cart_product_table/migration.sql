/*
  Warnings:

  - You are about to drop the `_CartsToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartsToProducts" DROP CONSTRAINT "_CartsToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartsToProducts" DROP CONSTRAINT "_CartsToProducts_B_fkey";

-- DropTable
DROP TABLE "_CartsToProducts";

-- CreateTable
CREATE TABLE "CartProduct" (
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("cartId","productId")
);

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
