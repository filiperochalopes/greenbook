export default async (_, __, ctx) => {
  const therapeuticEffects = await ctx.prisma.therapeuticEffect.findMany({
    orderBy: {
      term: 'asc'
    }
  });
  return therapeuticEffects;
}