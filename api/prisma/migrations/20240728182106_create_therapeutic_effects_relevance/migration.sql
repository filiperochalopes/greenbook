-- AlterTable
ALTER TABLE "_SpecieMetabolitesRelevance" RENAME CONSTRAINT "SpecieMetabolitesRelevance_pkey" TO "_SpecieMetabolitesRelevance_pkey";

-- CreateTable
CREATE TABLE "_SpecieTherapeuticEffectsRelevance" (
    "specieId" INTEGER NOT NULL,
    "therapeuticEffectId" INTEGER NOT NULL,
    "relevanceLevel" TEXT NOT NULL,

    CONSTRAINT "_SpecieTherapeuticEffectsRelevance_pkey" PRIMARY KEY ("specieId","therapeuticEffectId","relevanceLevel")
);

-- RenameForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" RENAME CONSTRAINT "SpecieMetabolitesRelevance_metaboliteId_fkey" TO "_SpecieMetabolitesRelevance_metaboliteId_fkey";

-- RenameForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" RENAME CONSTRAINT "SpecieMetabolitesRelevance_relevanceLevel_fkey" TO "_SpecieMetabolitesRelevance_relevanceLevel_fkey";

-- RenameForeignKey
ALTER TABLE "_SpecieMetabolitesRelevance" RENAME CONSTRAINT "SpecieMetabolitesRelevance_specieId_fkey" TO "_SpecieMetabolitesRelevance_specieId_fkey";

-- AddForeignKey
ALTER TABLE "_SpecieTherapeuticEffectsRelevance" ADD CONSTRAINT "_SpecieTherapeuticEffectsRelevance_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecieTherapeuticEffectsRelevance" ADD CONSTRAINT "_SpecieTherapeuticEffectsRelevance_therapeuticEffectId_fkey" FOREIGN KEY ("therapeuticEffectId") REFERENCES "TherapeuticEffect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecieTherapeuticEffectsRelevance" ADD CONSTRAINT "_SpecieTherapeuticEffectsRelevance_relevanceLevel_fkey" FOREIGN KEY ("relevanceLevel") REFERENCES "Relevance"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
