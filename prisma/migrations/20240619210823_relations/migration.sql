/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `Carts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `Carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carts" ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "usersId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_OrdersToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrdersToProducts_AB_unique" ON "_OrdersToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_OrdersToProducts_B_index" ON "_OrdersToProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Carts_userID_key" ON "Carts"("userID");

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdersToProducts" ADD CONSTRAINT "_OrdersToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdersToProducts" ADD CONSTRAINT "_OrdersToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
