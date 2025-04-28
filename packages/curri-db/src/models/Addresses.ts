import { prisma } from "../lib/curri-db"

export const findOrCreate = async ({
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
}: {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    state: string,
    postalCode: string,
}) => {
    const existingAddress = await prisma.address.findFirst({
        where: {
            addressLine1,
            addressLine2: addressLine2 || '',
            postalCode,
            city,
            state,
        }
    })

    if (existingAddress) return existingAddress

    const createdAddress = await prisma.address.create({
        data: {
            addressLine1,
            addressLine2: addressLine2 || '',
            postalCode,
            city,
            state,
        }
    })

    return createdAddress
} 