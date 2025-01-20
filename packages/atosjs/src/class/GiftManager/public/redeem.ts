import { QuickDB } from 'quick.db';
import { Gift } from '../@types/gifts';

export async function redeemGift(
    db: QuickDB,
    giftId: string
): Promise<{ success: boolean }> {
    const gift = await db.get<Gift>(`gifts.${giftId}`);

    if (!gift) return { success: false };

    if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
        gift.isRedeemed = true;
        await db.delete(`gifts.${giftId}`);
        return { success: false };
    }

    if (gift.redeemedCount >= gift.maxRedeem) return { success: false };

    gift.redeemedCount += 1;

    if (gift.redeemedCount === gift.maxRedeem) {
        gift.isRedeemed = true;
    }

    await db.set(`gifts.${giftId}`, gift);
    return { success: true };
}
