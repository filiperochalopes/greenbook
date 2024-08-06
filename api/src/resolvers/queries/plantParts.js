export default async (_, __, ctx) => {
  const plantParts = await ctx.prisma.plantPart.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  return plantParts;
}