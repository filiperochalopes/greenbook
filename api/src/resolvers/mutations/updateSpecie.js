export default async (_, { id, name, description, therapeuticEffects, popularNames, metabolites }, ctx) => {
  // Verifica os ids que ficaram dos efeitos terapeuticos para conectar
    let therapeuticEffectsIds = []
    therapeuticEffects.forEach(therapeuticEffect => {
      console.log(therapeuticEffect)
      if (therapeuticEffect.id) {
        therapeuticEffectsIds.push({ id: therapeuticEffect.id })
      }
    })
    console.log(therapeuticEffectsIds)
  // const specie = await ctx.prisma.specie.update({
  //   where: {
  //     id
  //   },
  //   data: {
  //     name,
  //     description,
  //     therapeuticEffects: {
  //       connect: therapeuticEffects
  //     },
  //     popularNames: { 
  //       connectOrCreate: [
  //         {
  //           where: {
  //             name
  //           },
  //           create: {
  //             name,
  //             observation
  //           }
  //         }
  //       ]
  //     },
  //     metabolites: {
  //       connect: metabolites
  //     }
  //   },
  //   include: {
  //     metabolites: true,
  //     popularNames: true,
  //     therapeuticEffects: true
  //   }
  // })
  // return specie
  return null
}