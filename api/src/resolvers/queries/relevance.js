export default async (_, __, ctx) => {
  return await ctx.prisma.Relevance.findMany()
}