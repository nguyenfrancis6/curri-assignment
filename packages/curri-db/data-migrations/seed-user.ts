import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findFirst({
      where: {
        id: 1,
      }
    })

    if (!existingUser?.id) {
      await tx.user.create({
          data: {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              emailAddress: 'john.doe@curri.com',
          }
      })
    }
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())