const prismaClient = require('@prisma/client').PrismaClient

const prisma = new prismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.relevance.createMany({
      data: [
        {
          level: "high",
          description: "Registro de evidência importante, geralmente com achados in vivo, em caso de metabólito está relacionado ao marcador químico ou susbstâncias de alta concentração na espécie.",
          hexColor: "9ad39d",
        },
        {
          level: "medium",
          description: "Resgistro com evidências in vitro ou uso tradicional bem consolidado. Em caso de metabólitos são aqueles presentes em boa concentração",
          hexColor: "f1c40f",
        },
        {
          level: "low",
          description: "Registro de baixa evidência, uso tradicional esparso ou aplicabilidade menor. Compostos químicos presentes em menor quantidade.",
          hexColor: "e74c3c",
        }
      ],
    });
  });
}

main().catch(async (e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => await prisma.$disconnect())