import { dbHandler } from '../types/db';
import { GiftValue } from '../types/gifts';

export async function viewGift(
    db: dbHandler,
    giftId: string
): Promise<{ valid: boolean; type?: string; value?: GiftValue }> {
    const gift = await db.get(`gifts.${giftId}`);

    if (!gift) return { valid: false };

    const isExpired = gift.expiresAt && new Date(gift.expiresAt) < new Date();
    if (isExpired) {
        await db.delete(`gifts.${giftId}`);
        return { valid: false };
    }

    const isFullyRedeemed = gift.isRedeemed || (gift.maxRedeem > 0 && gift.redeemedCount >= gift.maxRedeem);

    return {
        valid: !isFullyRedeemed,
        type: gift.type,
        value: gift.value,
    };
}
