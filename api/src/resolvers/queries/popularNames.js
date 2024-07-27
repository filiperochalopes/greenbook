export default (_, __, ctx) => {
  const popularNames = ctx.prisma.popularName.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  return popularNames;
}