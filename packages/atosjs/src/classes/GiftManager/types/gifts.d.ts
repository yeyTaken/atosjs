export type GiftValue = unknown;

export type Gift = {
    id: string;
    isRedeemed: boolean;
    redeemedCount: number;
    maxRedeem: number;
    expiresAt?: string;
    type?: string;
    value?: GiftValue;
};

export type GenerateOptions = {
    type?: string;
    value?: GiftValue;
    expiration?: string;
    maxRedeem?: number;
    edit?: { code: string };
};

export type GiftManagerOptions = {

    // database
    quickdb?: { filePath?: string };
    atosdb?: { filePath?: string };
    mongodb?: { connect: string; dbName?: string };

    // logs
    logging?: boolean;
};
