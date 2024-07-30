export default async (_, { name }, ctx) => {
  return await ctx.prisma.specie.create({
    data: {
      name
    }
  });
}