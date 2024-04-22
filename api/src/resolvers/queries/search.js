export default async (_, { q }, ctx) => {
  let results = []

  // filter specie and other models by query string q
  const species = await ctx.prisma.specie.findMany({
    where: {
      name: {
        contains: q
      }
    }, take: 5
  })

  results = results.concat(species.reduce((acc, cur) => [...acc, {
    name: cur.name,
    group: "Espécies",
    url: `/especie/${cur.id}`
  }], []))

  const popularNames = await ctx.prisma.popularName.findMany({
    where: {
      name: {
        contains: q
      }
    }, take: 5
  })

  console.log(popularNames)

  results = results.concat(popularNames.reduce((acc, cur) => [...acc, {
    name: cur.name,
    group: "Nomes populares",
    url: `/nome-popular/${cur.id}`
  }], []))

  const secondaryMetabolismDerivatives = await ctx.prisma.secondaryMetabolismDerivatives.findMany({
    where: {
      name: {
        contains: q
      }
    }, take: 3
  })

  results = results.concat(secondaryMetabolismDerivatives.reduce((acc, cur) => [...acc, {
    name: cur.name,
    group: "Derivados de metabólismo secundário",
    url: `/derivado-de-metabolismo-secundário/${cur.id}`
  }], []))

  return results
}