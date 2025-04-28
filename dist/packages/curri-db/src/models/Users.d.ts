export declare const findByUserId: ({ id }: {
    id: number;
}) => Promise<{
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    orderNumberRestrictions: string | null;
    orderNuberRequired: boolean;
} | null>;
