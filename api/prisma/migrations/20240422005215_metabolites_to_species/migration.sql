-- CreateTable
CREATE TABLE "_SecondaryMetabolismDerivativesToSpecie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SecondaryMetabolismDerivativesToSpecie_AB_unique" ON "_SecondaryMetabolismDerivativesToSpecie"("A", "B");

-- CreateIndex
CREATE INDEX "_SecondaryMetabolismDerivativesToSpecie_B_index" ON "_SecondaryMetabolismDerivativesToSpecie"("B");

-- AddForeignKey
ALTER TABLE "_SecondaryMetabolismDerivativesToSpecie" ADD CONSTRAINT "_SecondaryMetabolismDerivativesToSpecie_A_fkey" FOREIGN KEY ("A") REFERENCES "SecondaryMetabolismDerivatives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SecondaryMetabolismDerivativesToSpecie" ADD CONSTRAINT "_SecondaryMetabolismDerivativesToSpecie_B_fkey" FOREIGN KEY ("B") REFERENCES "Specie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
