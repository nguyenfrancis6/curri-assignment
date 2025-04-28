export declare const findOrCreate: ({ addressLine1, addressLine2, city, state, postalCode, }: {
    addressLine1: string;
    addressLine2?: string | undefined;
    city: string;
    state: string;
    postalCode: string;
}) => Promise<{
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
}>;
