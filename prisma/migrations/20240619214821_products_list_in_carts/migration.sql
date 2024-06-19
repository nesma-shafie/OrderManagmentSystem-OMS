-- CreateTable
CREATE TABLE "_CartsToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartsToProducts_AB_unique" ON "_CartsToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_CartsToProducts_B_index" ON "_CartsToProducts"("B");

-- AddForeignKey
ALTER TABLE "_CartsToProducts" ADD CONSTRAINT "_CartsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsToProducts" ADD CONSTRAINT "_CartsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
