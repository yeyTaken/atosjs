export type GiftValue = unknown;

export type Gift = {
    id: string;
    isRedeemed: boolean;
    redeemedCount: number; // Número de resgates realizados
    maxRedeem: number; // Limite de resgates permitidos
    expiresAt?: string; // Data de expiração em formato ISO 8601
    type?: string;
    value?: GiftValue;
};

export type GenerateOptions = {
    type?: string;
    value?: GiftValue;
    expiration?: string; // e.g., '60s', '7d', '10m', '1y'
    maxRedeem?: number; // Limite de resgates
    edit?: { code: string; }
};

export type GiftManagerOptions = {
    fileName?: string;
    fileType?: number;
};