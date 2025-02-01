import { GenerateOptions, Gift } from '../@types/gifts';
import { AtosJSError, ErrorCodes, ErrorMessages } from '../../../errors';
import { dbHandler } from '../@types/db';

export async function generateGift(
    db: dbHandler,
    options?: GenerateOptions
): Promise<string> {
    const { type, value, expiration, maxRedeem = 1 } = options || {};
    const expiresAt = expiration ? calculateExpirationDate(expiration) : undefined;

    const giftId = options?.edit?.code || generateUniqueId();

    const newGift: Gift = {
        id: giftId,
        isRedeemed: false,
        redeemedCount: 0,
        maxRedeem,
        expiresAt,
        type,
        value,
    };

    const code = newGift.id;
    await db.set(`gifts.${code}`, newGift);
    return code;
}

function calculateExpirationDate(expiration: string): string {
    const now = new Date();
    // Ajuste na expressão regular para garantir que apenas números seguidos de uma unidade válida (s, m, h, d, y) sejam aceitos
    const duration = expiration.match(/^(\d+)([smhdy])$/);

    if (!duration) {
        throw new AtosJSError(
            ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
            ErrorCodes.INVALID_TIME_UNIT
        );
    }
    
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
            throw new AtosJSError(
                ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
                ErrorCodes.INVALID_TIME_UNIT
            );
    }

    return now.toISOString();
}


export function generateUniqueId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';

    for (let i = 0; i < 13; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return uniqueId;
}
