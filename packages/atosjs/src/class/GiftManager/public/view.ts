import { QuickDB } from 'quick.db';
import { Gift, GiftValue } from '../@types/gifts';

export async function viewGift(
    db: QuickDB,
    giftId: string
): Promise<{ valid: boolean; type?: string; value?: GiftValue }> {
    const gift = await db.get<Gift>(`gifts.${giftId}`);

    if (!gift) return { valid: false };

    if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
        gift.isRedeemed = true;
        await db.delete(`gifts.${giftId}`);
        return { valid: false };
    }

    return {
        valid: !gift.isRedeemed && gift.redeemedCount < gift.maxRedeem,
        type: gift.type,
        value: gift.value,
    };
}
