-- CreateTable
CREATE TABLE "Relevance" (
    "level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hexColor" TEXT NOT NULL,

    CONSTRAINT "Relevance_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "_SpecieMetabolitesRelevance" (
    "specieId" INTEGER NOT NULL,
    "metaboliteId" INTEGER NOT NULL,
    "relevanceLevel" TEXT NOT NULL,

    CONSTRAINT "SpecieMetabolitesRelevance_pkey" PRIMARY KEY ("specieId","metaboliteId","relevanceLevel")
);

-- AddForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" ADD CONSTRAINT "SpecieMetabolitesRelevance_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" ADD CONSTRAINT "SpecieMetabolitesRelevance_metaboliteId_fkey" FOREIGN KEY ("metaboliteId") REFERENCES "SecondaryMetabolismDerivatives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" ADD CONSTRAINT "SpecieMetabolitesRelevance_relevanceLevel_fkey" FOREIGN KEY ("relevanceLevel") REFERENCES "Relevance"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
