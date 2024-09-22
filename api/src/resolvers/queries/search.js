import "lodash.combinations";
import _ from "lodash";

// Função utilitária para gerar combinações de até 3 elementos
function generateCombinations(arr) {
  let results = [];

  // Gerar combinações de tamanho 2 e 3
  for (let i = 1; i <= 3; i++) {
    results = results.concat(_.combinations(arr, i));
  }

  return results;
}

export default async (_, { q, filter }, ctx) => {
  let results = [];

  // Busca inicial baseada na query string
  let species = await ctx.prisma.specie.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      therapeuticEffects: true,
      therapeuticEffectsRelevance: {
        include: {
          relevance: true,
          therapeuticEffect: true,
        },
      },
    },
  });

  // Função para verificar se a espécie contém os efeitos filtrados (combinados)
  const matchesTherapeuticEffects = (specie, filters) => {
    return filters.every((filterName) => {
      return (
        specie.therapeuticEffects.some(
          (effect) => effect.term === filterName
        ) ||
        specie.therapeuticEffectsRelevance.some(
          (rel) => rel.therapeuticEffect.term === filterName
        )
      );
    });
  };

  // Filtro inicial (caso todos os filtros sejam encontrados)
  let matchedSpecies = species.filter((specie) =>
    matchesTherapeuticEffects(specie, filter)
  );

  if (matchedSpecies.length > 0) {
    results = results.concat(
      matchedSpecies.map((cur) => ({
        name: cur.name,
        group: "Espécies",
        q: `especie:${cur.id}`,
      }))
    );
  }

  // Se não houver espécies que correspondam a todos os filtros, gerar combinações
  if (matchedSpecies.length === 0 && filter?.length) {
    const filterCombinations = generateCombinations(filter);

    filterCombinations.forEach((combination) => {
      const speciesGroup = species.filter((specie) =>
        matchesTherapeuticEffects(specie, combination)
      );

      if (speciesGroup.length > 0) {
        const groupName = `Espécies: ${combination.join(" + ")}`;
        results = results.concat(
          speciesGroup.map((cur) => ({
            name: cur.name,
            group: groupName,
            q: `especie:${cur.id}`,
          }))
        );
      }
    });
  }

  // Filter Specie records to ensure they have all specified metabolites on filter list
  species = species.filter((specie) => {
    if (filter) {
      return filter.every((filterName) => {
        return specie.therapeuticEffects.some((therapeuticEffect) => {
          return filterName === therapeuticEffect.term;
        });
      });
    }
    return true;
  });

  results = results.concat(
    species.reduce(
      (acc, cur) => [
        ...acc,
        {
          name: cur.name,
          group: "Espécies",
          q: `especie:${cur.id}`,
        },
      ],
      []
    )
  );

  let popularNames = await ctx.prisma.popularName.findMany({
    where: {
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
    include: {
      specie: {
        include: {
          therapeuticEffects: true,
        },
      },
    },
  });

  // Filter PopularName records to ensure they have all specified metabolites on filter list
  popularNames = popularNames.filter((popularName) => {
    if (filter) {
      return filter.every((filterName) => {
        return popularName.specie[0]?.therapeuticEffects?.some(
          (therapeuticEffect) => {
            return filterName === therapeuticEffect.term;
          }
        );
      });
    }
    return true;
  });

  results = results.concat(
    popularNames.reduce(
      (acc, cur) => [
        ...acc,
        {
          name: cur.name,
          group: "Nomes populares",
          q: `nome-popular:${cur.id}`,
        },
      ],
      []
    )
  );

  const secondaryMetabolismDerivatives =
    await ctx.prisma.secondaryMetabolismDerivatives.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 7,
    });

  results = results.concat(
    secondaryMetabolismDerivatives.reduce(
      (acc, cur) => [
        ...acc,
        {
          name: cur.name,
          group: "Derivados de metabólismo secundário",
          q: `metabolito:${cur.id}`,
        },
      ],
      []
    )
  );

  // search therapeutic effects and add to results
  const therapeuticEffects = await ctx.prisma.therapeuticEffect.findMany({
    where: {
      term: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 7,
  });

  results = results.concat(
    therapeuticEffects.reduce(
      (acc, cur) => [
        ...acc,
        {
          name: cur.term,
          group: "Efeitos terapêuticos",
          q: `efeito-terapeutico:${cur.id}`,
        },
      ],
      []
    )
  );

  return results;
};
