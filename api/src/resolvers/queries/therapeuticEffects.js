export default async (_, __, ctx) => {
  const therapeuticEffects = await ctx.prisma.therapeuticEffects.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  return therapeuticEffects;
}