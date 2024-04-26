export default async (_, { q, filter }, ctx) => {
  let results = [];

  // filter specie and other models by query string q
  let species = await ctx.prisma.specie.findMany({
    where: {
      name: {
        contains: q
      }
    },
    include: {
      therapeuticEffect: true
    }
  })

  // Filter Specie records to ensure they have all specified metabolites on filter list
  species = species.filter((specie) => {
    if (filter) {
      return filter.every((filterName) => {
        return specie.therapeuticEffect.some((therapeuticEffect) => {
          return filterName === therapeuticEffect.term
        })
      })
    }
    return true
  })

  results = results.concat(species.reduce((acc, cur) => [...acc, {
    name: cur.name,
    group: "Espécies",
    q: `especie:${cur.id}`
  }], []))

  let popularNames = await ctx.prisma.popularName.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    include: {
      specie: {
        include: {
          therapeuticEffect: true
        },
      },
    },
  });

  // Filter PopularName records to ensure they have all specified metabolites on filter list
  popularNames = popularNames.filter((popularName) => {
    if (filter) {
      return filter.every((filterName) => {
        return popularName.specie[0]?.therapeuticEffect?.some((therapeuticEffect) => {
          return filterName === therapeuticEffect.term
        })
      })
    }
    return true
  })

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

  const secondaryMetabolismDerivatives = await ctx.prisma.secondaryMetabolismDerivatives.findMany({
    where: {
      name: {
        contains: q
      }
    }, take: 7
  })

  results = results.concat(secondaryMetabolismDerivatives.reduce((acc, cur) => [...acc, {
    name: cur.name,
    group: "Derivados de metabólismo secundário",
    q: `metabolito:${cur.id}`
  }], []))

  return results;
};
