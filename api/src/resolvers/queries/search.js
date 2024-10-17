import "lodash.combinations";
import _ from "lodash";

// Função utilitária para gerar combinações de até 3 elementos
function generateCombinations(arr) {
  let results = [];

  // Gerar combinações de tamanho 1, 2 e 3
  for (let i = 1; i <= 3; i++) {
    results = results.concat(_.combinations(arr, i)); // Usa a função 'combinations' do lodash para criar combinações
  }

  return results;
}

export default async (__, { q, filter }, ctx) => {
  let results = [];

  // Realiza uma busca inicial de espécies baseada na query string 'q'
  let species = await ctx.prisma.specie.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q, // Busca por espécies cujo nome contém a query 'q'
            mode: "insensitive", // Modo de busca sem diferenciar maiúsculas e minúsculas
          },
        },
        {
          description: {
            contains: q, // Busca por espécies cuja descrição contém a query 'q'
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      therapeuticEffects: true, // Inclui os efeitos terapêuticos da espécie no resultado
      therapeuticEffectsRelevance: {
        include: {
          relevance: true,
          therapeuticEffect: true, // Inclui informações de relevância e efeitos terapêuticos relevantes
        },
      },
    },
  });

  // Função que verifica se uma espécie contém todos os efeitos terapêuticos filtrados
  const matchesTherapeuticEffects = (specie, filters) => {
    return filters.every((filterName) => {
      return (
        specie.therapeuticEffects.some(
          (effect) => effect.term === filterName // Verifica se o efeito terapêutico existe na espécie
        ) ||
        specie.therapeuticEffectsRelevance.some(
          (rel) => rel.therapeuticEffect.term === filterName // Verifica se o efeito terapêutico relevante existe na espécie
        )
      );
    });
  };

  // Filtra as espécies que correspondem a todos os efeitos terapêuticos filtrados
  let matchedSpecies = species.filter((specie) =>
    matchesTherapeuticEffects(specie, filter)
  );

  if (matchedSpecies.length > 0) {
    // Se houver espécies que correspondem a todos os filtros, adiciona os resultados
    results = results.concat(
      matchedSpecies.map((cur) => ({
        name: cur.name,
        group: "Espécies",
        q: `especie:${cur.id}`, // Adiciona informações sobre a espécie encontrada
      }))
    );
  }

  // Se nenhuma espécie corresponder a todos os filtros, gera combinações de filtros
  if (matchedSpecies.length === 0 && filter?.length) {
    const filterCombinations = generateCombinations(filter); // Gera combinações dos filtros

    filterCombinations.forEach((combination) => {
      const speciesGroup = species.filter((specie) =>
        matchesTherapeuticEffects(specie, combination) // Verifica se a espécie corresponde à combinação de filtros
      );

      if (speciesGroup.length > 0) {
        const groupName = `Espécies: ${combination.join(" + ")}`; // Nomeia o grupo de acordo com a combinação de filtros
        results = results.concat(
          speciesGroup.map((cur) => ({
            name: cur.name,
            group: groupName, // Adiciona o grupo correspondente à combinação de filtros
            q: `especie:${cur.id}`,
          }))
        );
      }
    });
  }

  // Filtra as espécies para garantir que todas contenham os metabólitos especificados no filtro
  species = species.filter((specie) => {
    if (filter) {
      return filter.every((filterName) => {
        return specie.therapeuticEffects.some((therapeuticEffect) => {
          return filterName === therapeuticEffect.term; // Verifica se o efeito terapêutico existe na espécie
        });
      });
    }
    return true; // Se não houver filtro, retorna todas as espécies
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

  // Busca nomes populares de espécies que contenham a query 'q'
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
          therapeuticEffects: true, // Inclui efeitos terapêuticos no resultado
        },
      },
    },
  });

  // Filtra nomes populares para garantir que todos tenham os metabólitos especificados no filtro
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

  // Busca derivados de metabolismo secundário que contenham a query 'q'
  const secondaryMetabolismDerivatives =
    await ctx.prisma.secondaryMetabolismDerivatives.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 7, // Limita a busca a 7 resultados
    });

  results = results.concat(
    secondaryMetabolismDerivatives.reduce(
      (acc, cur) => [
        ...acc,
        {
          name: cur.name,
          group: "Derivados de metabolismo secundário",
          q: `metabolito:${cur.id}`,
        },
      ],
      []
    )
  );

  // Busca efeitos terapêuticos que contenham a query 'q'
  const therapeuticEffects = await ctx.prisma.therapeuticEffect.findMany({
    where: {
      term: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 7, // Limita a busca a 7 resultados
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

  // Remover duplicatas nos resultados com base na chave 'q'
  results = _.uniqBy(results, "q");

  return results; // Retorna todos os resultados encontrados
};