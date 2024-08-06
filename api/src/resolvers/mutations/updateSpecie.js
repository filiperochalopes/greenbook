export default async (_, { id, name, description, therapeuticEffects, popularNames, metabolites, prescriptionSuggestions}, ctx) => {
  // Atualizando nomes populares
  let popularNameIds = []
  for (const popularName of popularNames) {
    if (popularName.id) {
      // Se foi passado id é porque há no banco
      console.log(`Atualizando nome popular: ${popularName.id} - ${popularName.name}`)
      popularNameIds.push({ id: popularName.id })
      await ctx.prisma.popularName.update({
        where: {
          id: popularName.id
        },
        data: {
          name: popularName.name,
          observation: popularName.observation
        }
      })
    } else {
      // Caso não exista, cria um novo registro
      console.log(`Criando novo nome popular: ${popularName.name}`)
      let newPopularName = await ctx.prisma.popularName.create({
        data: {
          name: popularName.name,
          observation: popularName.observation
        }
      })
      popularNameIds.push({ id: newPopularName.id })
    }
  }

  // Atualizando efeitos terapêuticos
  let newTherapeuticEffectIds = []
  for (const therapeuticEffect of therapeuticEffects) {
    if (therapeuticEffect.id) {
      // Se foi passado id é porque já existe no banco de dados
      console.log(`Atualizando efeito terapêutico: ${therapeuticEffect.id} - ${therapeuticEffect.term}`)
      await ctx.prisma.therapeuticEffect.update({
        where: {
          id: therapeuticEffect.id
        },
        data: {
          term: therapeuticEffect.term,
          meaning: therapeuticEffect.meaning
        }
      })
    } else {
      // Caso não exista, cria um novo registro
      console.log(`Criando novo efeito terapêutico: ${therapeuticEffect.term}`)
      let newTherapeuticEffect = await ctx.prisma.therapeuticEffect.create({
        data: {
          term: therapeuticEffect.term,
          meaning: therapeuticEffect.meaning,
        }
      })
      newTherapeuticEffectIds.push({ id: newTherapeuticEffect.id })
      therapeuticEffect.id = newTherapeuticEffect.id
    }
  }

  // Atualizando relevâncias dos efeitos terapêuticos
  console.log(`Atualizando relevâncias dos efeitos terapêuticos`)
  for (const therapeuticEffect of therapeuticEffects) {
    if (therapeuticEffect.relevance) {
      const specieTherapeuticEffectsRelevance = await ctx.prisma.specieTherapeuticEffectsRelevance.findFirst({
        where: {
          specieId: id,
          therapeuticEffectId: therapeuticEffect.id
        }
      })
      if (!specieTherapeuticEffectsRelevance) {
        console.log(`Criando relevância do efeito terapêutico`)
        await ctx.prisma.specieTherapeuticEffectsRelevance.create({
          data: {
            specie: { connect: { id } },
            therapeuticEffect: { connect: { id: therapeuticEffect.id } },
            relevance: { connect: { level: therapeuticEffect.relevance } }
          }
        })
      } else {
        console.log(`Atualizando relevância do efeito terapêutico ${therapeuticEffect.term} - ${therapeuticEffect.relevance}`)
        await ctx.prisma.specieTherapeuticEffectsRelevance.update({
          where: {
            specieId_therapeuticEffectId_relevanceLevel: {
              specieId: id,
              therapeuticEffectId: therapeuticEffect.id,
              relevanceLevel: specieTherapeuticEffectsRelevance.relevanceLevel
            }
          },
          data: {
            relevanceLevel: therapeuticEffect.relevance
          }
        })
      }
    }
  }

  // Atualizando metabólitos
  let newMetaboliteIds = []
  for (const metabolite of metabolites) {
    if (metabolite.id) {
      console.log(`Atualizando metabolito: ${metabolite.id} - ${metabolite.name}`)
      await ctx.prisma.secondaryMetabolismDerivatives.update({
        where: {
          id: metabolite.id
        },
        data: {
          name: metabolite.name,
          description: metabolite.description
        }
      })
    } else {
      console.log(`Criando novo metabolito: ${metabolite.name}`)
      let newMetabolite = await ctx.prisma.secondaryMetabolismDerivatives.create({
        data: {
          name: metabolite.name,
          description: metabolite.description
        }
      })
      console.log(`Criado metabólito: ${newMetabolite.id} - ${newMetabolite.name}`)
      newMetaboliteIds.push({ id: newMetabolite.id })
      metabolite.id = newMetabolite.id
    }
  }
  console.log(`Novo campo de metabólitos`, metabolites, newMetaboliteIds)

  // Atualizando relevância dos metabólitos
  console.log("Avaliando relevância dos metabólitos")
  for (const metabolite of metabolites) {
    if (metabolite.relevance) {
      const specieMetaboliteRelevance = await ctx.prisma.specieMetabolitesRelevance.findFirst({
        where: {
          specieId: id,
          metaboliteId: metabolite.id
        }
      })
      if (!specieMetaboliteRelevance) {
        console.log("Criando relevância de metabólito")
        await ctx.prisma.specieMetabolitesRelevance.create({
          data: {
            specie: { connect: { id } },
            metabolite: { connect: { id: metabolite.id } },
            relevance: { connect: { level: metabolite.relevance } }
          },
        })
      } else {
        console.log("Atualizando relevância do metabolito")
        await ctx.prisma.specieMetabolitesRelevance.update({
          where: {
            specieId_metaboliteId_relevanceLevel: {
              specieId: id,
              metaboliteId: metabolite.id,
              relevanceLevel: specieMetaboliteRelevance.relevanceLevel
            }
          },
          data: {
            relevanceLevel: metabolite.relevance
          }
        })
      }
    }
  }

  // Atualizando sugestões de prescrições
  let newPrescriptionSuggestions = []
  console.log("Atualizando sugestões de prescrições")
  for (const prescription of prescriptionSuggestions) {
    if (prescription.id) {
      console.log(`Atualizando sugestão de prescrição: ${prescription.id} - ${prescription.name}`)
      await ctx.prisma.prescriptionSuggestions.update({
        where: {
          id: prescription.id
        },
        data: {
          name: prescription.name,
          description: prescription.description,
          plantPartId: prescription.plantPartId
        }
      })
    } else {
      console.log(`Criando nova sugestão de prescrição: ${prescription.name}`)
      let newPrescription = await ctx.prisma.prescriptionSuggestions.create({
        data: {
          name: prescription.name,
          description: prescription.description,
          plantPartId: prescription.plantPartId
        }
      })
      console.log(`Criada sugestão de prescrição: ${newPrescription.id} - ${newPrescription.name}`)
      newPrescriptionSuggestions.push({ id: newPrescription.id })
    }
  }

  console.log({
    name,
    description,
    popularNames: {
      connect: popularNameIds
    },
    therapeuticEffects: {
      connect: newTherapeuticEffectIds
    },
    metabolites: {
      connect: newMetaboliteIds
    }
  })

  const specie = await ctx.prisma.specie.update({
    where: {
      id
    },
    data: {
      name,
      description,
      popularNames: {
        connect: popularNameIds
      },
      therapeuticEffects: {
        connect: newTherapeuticEffectIds
      },
      metabolites: {
        connect: newMetaboliteIds
      },
      prescriptionSuggestions: {
        connect: newPrescriptionSuggestions
      }
    },
    include: {
      metabolitesRelevance: {
        include: {
          metabolite: true,
          relevance: true
        }
      },
      therapeuticEffectsRelevance: {
        include: {
          therapeuticEffect: true,
          relevance: true
        }
      },
      popularNames: true,
    }
  })

  return specie
}
