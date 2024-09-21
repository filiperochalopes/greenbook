export default async (_, { q }, ctx) => {
  console.log(q);
  let [modelType, id] = q.split(":");
  id = parseInt(id);

  let result = {
    title: "",
    description: "",
    metabolites: [],
    species: [],
    popularNames: [],
    prescriptionSuggestions: [],
  };

  if (modelType === "especie")  {
    const specie = await ctx.prisma.specie.findUnique({
      where: { id },
      include: {
        metabolites: true,
        therapeuticEffects: true,
        popularNames: true,
        prescriptions: {
          include: {
            part: true,
            specie: true,
          },
        },
        metabolitesRelevance: {
          include: {
            metabolite: true,
            relevance: true, // Inclui a relevância dos metabolitos
          },
        },
        therapeuticEffectsRelevance: {
          include: {
            therapeuticEffect: true,
            relevance: true, // Inclui a relevância dos efeitos terapêuticos
          },
        },
      },
    });
  
    // Adicionando título, descrição e sugestões de prescrição
    result.title = specie.name;
    result.description = specie.description;
    result.prescriptionSuggestions = specie.prescriptions;
  
    // Popular nomes e mapeamento de q
    result.popularNames = specie.popularNames.map((popularName) => ({
      ...popularName,
      q: `nome-popular:${popularName.id}`,
    }));
  
    // Mesclando metabolitos com os relevâncias, incluindo metabolitos de metabolitesRelevance
    const metabolitesFromRelevance = specie.metabolitesRelevance.map((rel) => ({
      ...rel.metabolite,
      relevance: rel.relevance, // Inclui a relevância do metabolito
      q: `metabolito:${rel.metabolite.id}`, // Adiciona o mapeamento de 'q' para metabolitos
    }));
    
    result.metabolites = [
      ...specie.metabolites.map((metabolite) => {
        const relevance = specie.metabolitesRelevance?.find(
          (rel) => rel.metaboliteId === metabolite.id
        );
        return {
          ...metabolite,
          q: `metabolito:${metabolite.id}`, // Adiciona o mapeamento de 'q' para metabolitos
          relevance: relevance ? relevance.relevance : null,
        };
      }),
      ...metabolitesFromRelevance.filter(
        (relMetabolite) =>
          !specie.metabolites.some((metabolite) => metabolite.id === relMetabolite.id)
      ), // Adiciona os metabolitos que só existem em metabolitesRelevance
    ];
  
    // Ordenar metabolitos por relevância (high > medium > low > null)
    result.metabolites.sort((a, b) => {
      const levels = { high: 3, medium: 2, low: 1, null: 0 };
      return (levels[b.relevance?.level] || 0) - (levels[a.relevance?.level] || 0);
    });
  
    // Mesclando efeitos terapêuticos com as relevâncias, incluindo efeitos de therapeuticEffectsRelevance
    const therapeuticEffectsFromRelevance = specie.therapeuticEffectsRelevance.map(
      (rel) => ({
        ...rel.therapeuticEffect,
        relevance: rel.relevance, // Inclui a relevância do efeito terapêutico
        q: `efeito-terapeutico:${rel.therapeuticEffect.id}`, // Adiciona o mapeamento de 'q' para efeitos terapêuticos
      })
    );
    
    result.therapeuticEffects = [
      ...specie.therapeuticEffects.map((effect) => {
        const relevance = specie.therapeuticEffectsRelevance?.find(
          (rel) => rel.therapeuticEffectId === effect.id
        );
        return {
          ...effect,
          q: `efeito-terapeutico:${effect.id}`, // Adiciona o mapeamento de 'q' para efeitos terapêuticos
          relevance: relevance ? relevance.relevance : null,
        };
      }),
      ...therapeuticEffectsFromRelevance.filter(
        (relEffect) =>
          !specie.therapeuticEffects.some(
            (effect) => effect.id === relEffect.id
          )
      ), // Adiciona os efeitos terapêuticos que só existem em therapeuticEffectsRelevance
    ];
  
    // Ordenar efeitos terapêuticos por relevância (high > medium > low > null)
    result.therapeuticEffects.sort((a, b) => {
      const levels = { high: 3, medium: 2, low: 1, null: 0 };
      return (levels[b.relevance?.level] || 0) - (levels[a.relevance?.level] || 0);
    });
  } else if (modelType === "nome-popular") {
    const popularName = await ctx.prisma.popularName.findUnique({
      where: {
        id,
      },
      include: {
        specie: true
      }
    });

    result.title = popularName.name;
    result.description = popularName.observation;
    result.species = popularName.specie.map((specie) => ({
      ...specie,
      q: `especie:${specie.id}`,
    }));
  } else if (modelType === "metabolito") {
    const secondaryMetabolismDerivatives = await ctx.prisma.secondaryMetabolismDerivatives.findUnique({
      where: {
        id,
      },
      include: {
        species: true
      }
    });

    result.title = secondaryMetabolismDerivatives.name;
    result.description = secondaryMetabolismDerivatives.description;
    result.species = secondaryMetabolismDerivatives.species.map((specie) => ({
      ...specie,
      q: `especie:${specie.id}`,
    }))
  }
  console.log(result)
  return result;
};
