import { QuickDB } from 'quick.db';

export type GiftAmount = unknown;

export type Gift = {
    id: string;
    isRedeemed: boolean;
    redeemedCount: number; // Novo campo para contar os resgates
    maxRedeem: number; // Limite de resgates
    expiresAt?: string; // ISO 8601 Date format
    type?: string;
    amount?: GiftAmount;
};

type GenerateOptions = {
    type?: string;
    amount?: GiftAmount;
    expiration?: string; // e.g., '60s', '7d', '10m', '1y'
    maxRedeem?: number; // Novo campo para definir o número máximo de resgates
};

type GiftManagerOptions = {
    fileName?: string;
};

export class GiftManager {
    private db: QuickDB;

    constructor(options?: GiftManagerOptions) {
        const fileName = options?.fileName || 'gifts';
        this.db = new QuickDB({ filePath: `${fileName}.json` });
    }

    public async generate(options?: GenerateOptions): Promise<string> {
        const { type, amount, expiration, maxRedeem = 1 } = options || {};
        const expiresAt = expiration ? this.calculateExpirationDate(expiration) : undefined;

        const newGift: Gift = {
            id: this.generateUniqueId(),
            isRedeemed: false,
            redeemedCount: 0, // Inicialmente, 0 resgates
            maxRedeem,
            expiresAt,
            type,
            amount,
        };

        const code = newGift.id;
        await this.db.set(`gifts.${code}`, newGift);
        return code;
    }

    public async redeem(giftId: string): Promise<{ success: boolean }> {
        const gift = await this.db.get<Gift>(`gifts.${giftId}`);
    
        if (!gift) return { success: false };
    
        // Verificar se o gift expirou
        if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
            gift.isRedeemed = true;
            await this.db.delete(`gifts.${giftId}`);
            return { success: false }; // Expirado
        }
    
        // Verificar se o número de resgates excedeu o limite
        if (gift.redeemedCount >= gift.maxRedeem) {
            return { success: false }; // Excedeu o limite de resgates
        }
    
        // Se o gift ainda não foi resgatado, marca-o como resgatado
        if (gift.redeemedCount < gift.maxRedeem) {
            gift.redeemedCount += 1; // Incrementa o contador de resgates
            if (gift.redeemedCount === gift.maxRedeem) {
                gift.isRedeemed = true; // Marca como resgatado quando atingir o limite
            }
        }
    
        await this.db.set(`gifts.${giftId}`, gift); // Atualiza o gift com o novo contador
    
        return { success: true };
    }
    

    public async view(giftId: string): Promise<{ valid: boolean; type?: string; amount?: GiftAmount }> {
        const gift = await this.db.get<Gift>(`gifts.${giftId}`);

        if (!gift) return { valid: false };

        // Verificar se o gift expirou
        if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
            gift.isRedeemed = true;
            await this.db.delete(`gifts.${giftId}`);
            return { valid: false }; // Expirado
        }

        return {
            valid: !gift.isRedeemed && gift.redeemedCount < gift.maxRedeem,
            type: gift.type,
            amount: gift.amount,
        };
    }

    private calculateExpirationDate(expiration: string): string {
        const now = new Date();
        const duration = expiration.match(/^(\d+)([smhdy])$/); // Match e.g., '7d', '10m', '1y'

        if (!duration) throw new Error('Invalid expiration format. Use formats like 60s, 7d, 10m, 1y.');

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
                throw new Error('Invalid time unit. Use s, d, h, m, or y.');
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
