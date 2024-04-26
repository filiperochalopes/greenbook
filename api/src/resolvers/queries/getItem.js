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

  if (modelType === "especie") {
    const specie = await ctx.prisma.specie.findUnique({
      where: {
        id,
      },
      include: {
        metabolites: true,
        popularNames: true,
        prescriptions: {
          include: {
            part: true,
            specie: true,
          },
        }
      }
    });

    result.title = specie.name;
    result.description = specie.description;
    result.prescriptionSuggestions = specie.prescriptions
    result.popularNames = specie.popularNames.map((popularName) => ({
      ...popularName,
      q: `nome-popular:${popularName.id}`,
    }))
    result.metabolites = specie.metabolites

  }else if (modelType === "nome-popular") {
    const popularName = await ctx.prisma.popularName.findUnique({
      where: {
        id,
      },
      include: {
        specie:true
    }
    });

    result.title = popularName.name;
    result.description = popularName.observation;
    result.species = popularName.specie.map((specie) => ({
      ...specie,
      q: `especie:${specie.id}`,
    }));
  }else if (modelType === "metabolito") {
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
  return result;
};
