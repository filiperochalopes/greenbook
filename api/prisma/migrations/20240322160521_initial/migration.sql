-- CreateTable
CREATE TABLE "Specie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopularName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "observation" TEXT NOT NULL,

    CONSTRAINT "PopularName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantPart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PlantPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapeuticEffect" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,

    CONSTRAINT "TherapeuticEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondaryMetabolismDerivatives" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SecondaryMetabolismDerivatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HerbalPreparation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prescriptionBase" TEXT NOT NULL,

    CONSTRAINT "HerbalPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionSuggestion" (
    "id" SERIAL NOT NULL,
    "dosage" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specieId" INTEGER NOT NULL,
    "plantPartId" INTEGER NOT NULL,

    CONSTRAINT "PrescriptionSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PopularNameToSpecie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PopularNameToSpecie_AB_unique" ON "_PopularNameToSpecie"("A", "B");

-- CreateIndex
CREATE INDEX "_PopularNameToSpecie_B_index" ON "_PopularNameToSpecie"("B");

-- AddForeignKey
ALTER TABLE "PrescriptionSuggestion" ADD CONSTRAINT "PrescriptionSuggestion_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionSuggestion" ADD CONSTRAINT "PrescriptionSuggestion_plantPartId_fkey" FOREIGN KEY ("plantPartId") REFERENCES "PlantPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PopularNameToSpecie" ADD CONSTRAINT "_PopularNameToSpecie_A_fkey" FOREIGN KEY ("A") REFERENCES "PopularName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PopularNameToSpecie" ADD CONSTRAINT "_PopularNameToSpecie_B_fkey" FOREIGN KEY ("B") REFERENCES "Specie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
