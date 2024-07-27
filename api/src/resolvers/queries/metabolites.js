export default async (_, __, ctx) => {
    const secondaryMetabolismDerivatives = await ctx.prisma.secondaryMetabolismDerivatives.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return secondaryMetabolismDerivatives;
}