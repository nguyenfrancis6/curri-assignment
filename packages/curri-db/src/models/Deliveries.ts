import { prisma } from "../lib/curri-db"

export const createDelivery = async ({
    originAddressId,
    destinationAddressId,
    orderNumber,
    userId,
}: {
    originAddressId: number,
    destinationAddressId: number,
    orderNumber?: string,
    userId: number,
}) => {
    const delivery = await prisma.delivery.create({
        data: {
            originAddressId,
            destinationAddressId,
            orderNumber: orderNumber || '',
            userId,
        }
    })

    return delivery
} 