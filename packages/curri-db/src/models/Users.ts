import { prisma } from "../lib/curri-db"

export const findByUserId = async ({id}: {id: number}) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        },
    })

    return user
} 

export const updateOrderNumberFormat = async ({
    userId,
    format,
  }: {
    userId: number
    format: string
  }) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        orderNumberFormat: format,
      },
    })
    return user
  }