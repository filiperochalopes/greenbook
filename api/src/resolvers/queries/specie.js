export default async (_, { id }, ctx) => {
    const specie = await ctx.prisma.specie.findUnique({
        where: {
            id
        },
        include: {
            popularNames: true,
            metabolites: true,
            metabolitesRelevance: {
                include: {
                    metabolite: true,
                    relevance: true
                }
            },
            therapeuticEffects: true,
            prescriptions: {
                include: {
                    part: true
                }
            }
        }
    });

    return specie;
}