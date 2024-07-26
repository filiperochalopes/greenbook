export default async (_, __, ctx) => {
    const species = await ctx.prisma.specie.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return species;
}