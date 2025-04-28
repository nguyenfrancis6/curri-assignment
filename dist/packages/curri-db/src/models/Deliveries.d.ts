export declare const createDelivery: ({ originAddressId, destinationAddressId, orderNumber, userId, }: {
    originAddressId: number;
    destinationAddressId: number;
    orderNumber?: string | undefined;
    userId: number;
}) => Promise<{
    id: number;
    originAddressId: number;
    destinationAddressId: number;
    orderNumber: string;
    userId: number | null;
}>;
