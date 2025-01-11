import { QuickDB } from 'quick.db';

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

type GenerateOptions = {
    type?: string;
    value?: GiftValue;
    expiration?: string; // e.g., '60s', '7d', '10m', '1y'
    maxRedeem?: number; // Limite de resgates
};

type GiftManagerOptions = {
    fileName?: string;
    fileType?: number;
};

export class GiftManager {
    private db!: QuickDB;

    constructor(options?: GiftManagerOptions) {
        const fileName = options?.fileName || 'gifts';
        const fileType = options?.fileType || 1;

        if (fileType === 1) {
            this.db = new QuickDB({ filePath: `${fileName}.json` });
        } else if (fileType === 2) {
            this.db = new QuickDB({ filePath: `${fileName}.yaml` });
        } else {
            throw new Error('Invalid fileType. Use 1 for JSON or 2 for YAML.');
        }

    }

    public async generate(options?: GenerateOptions): Promise<string> {
        const { type, value, expiration, maxRedeem = 1 } = options || {};
        const expiresAt = expiration ? this.calculateExpirationDate(expiration) : undefined;

        const newGift: Gift = {
            id: this.generateUniqueId(),
            isRedeemed: false,
            redeemedCount: 0,
            maxRedeem,
            expiresAt,
            type,
            value,
        };

        const code = newGift.id;
        await this.db.set(`gifts.${code}`, newGift);
        return code;
    }

    public async redeem(giftId: string): Promise<{ success: boolean }> {
        const gift = await this.db.get<Gift>(`gifts.${giftId}`);

        if (!gift) return { success: false };

        if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
            gift.isRedeemed = true;
            await this.db.delete(`gifts.${giftId}`);
            return { success: false };
        }

        if (gift.redeemedCount >= gift.maxRedeem) return { success: false };

        gift.redeemedCount += 1;

        if (gift.redeemedCount === gift.maxRedeem) {
            gift.isRedeemed = true;
        }

        await this.db.set(`gifts.${giftId}`, gift);
        return { success: true };
    }

    public async view(giftId: string): Promise<{ valid: boolean; type?: string; value?: GiftValue }> {
        const gift = await this.db.get<Gift>(`gifts.${giftId}`);

        if (!gift) return { valid: false };

        if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
            gift.isRedeemed = true;
            await this.db.delete(`gifts.${giftId}`);
            return { valid: false };
        }

        return {
            valid: !gift.isRedeemed && gift.redeemedCount < gift.maxRedeem,
            type: gift.type,
            value: gift.value,
        };
    }

    private calculateExpirationDate(expiration: string): string {
        const now = new Date();
        const duration = expiration.match(/^(\d+)([smhdy])$/);

        if (!duration) throw new Error('Formato de expiração inválido. Use formatos como 60s, 7d, 10m, 1y.');

        const value = parseInt(duration[1], 10);
        const unit = duration[2];

        switch (unit) {
            case 's':
                now.setSeconds(now.getSeconds() + value);
                break;
            case 'm':
                now.setMinutes(now.getMinutes() + value);
                break;
            case 'h':
                now.setHours(now.getHours() + value);
                break;
            case 'd':
                now.setDate(now.getDate() + value);
                break;
            case 'y':
                now.setFullYear(now.getFullYear() + value);
                break;
            default:
                throw new Error('Unidade de tempo inválida. Use s, d, h, m, ou y.');
        }

        return now.toISOString();
    }

    private generateUniqueId(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uniqueId = '';

        for (let i = 0; i < 13; i++) {
            uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return uniqueId;
    }
}
