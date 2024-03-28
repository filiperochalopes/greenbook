/*
  Warnings:

  - Added the required column `description` to the `Specie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Specie" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_SpecieToTherapeuticEffect" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecieToTherapeuticEffect_AB_unique" ON "_SpecieToTherapeuticEffect"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecieToTherapeuticEffect_B_index" ON "_SpecieToTherapeuticEffect"("B");

-- AddForeignKey
ALTER TABLE "_SpecieToTherapeuticEffect" ADD CONSTRAINT "_SpecieToTherapeuticEffect_A_fkey" FOREIGN KEY ("A") REFERENCES "Specie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecieToTherapeuticEffect" ADD CONSTRAINT "_SpecieToTherapeuticEffect_B_fkey" FOREIGN KEY ("B") REFERENCES "TherapeuticEffect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
