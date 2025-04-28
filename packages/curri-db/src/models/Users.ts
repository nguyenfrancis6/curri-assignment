import { prisma } from "../lib/curri-db"

export const findByUserId = async ({id}: {id: number}) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        },
    })

    return user
} 