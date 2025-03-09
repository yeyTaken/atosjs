import { dbHandler } from '../types/db';

export async function redeemGift(
    db: dbHandler,
    giftId: string
): Promise<{ success: boolean }> {
    const gift = await db.get(`gifts.${giftId}`);

    if (!gift) return { success: false };

    // Verifica se o gift expirou
    const isExpired = gift.expiresAt && new Date(gift.expiresAt) < new Date();
    if (isExpired) {
        await db.delete(`gifts.${giftId}`);
        return { success: false };
    }

    // Se já foi totalmente resgatado
    if (gift.isRedeemed || (gift.maxRedeem > 0 && gift.redeemedCount >= gift.maxRedeem)) {
        return { success: false };
    }

    // Incrementa o contador de resgates
    gift.redeemedCount += 1;

    // Se atingiu o máximo de resgates, marca como resgatado e deleta se necessário
    if (gift.maxRedeem > 0 && gift.redeemedCount >= gift.maxRedeem) {
        gift.isRedeemed = true;
        await db.delete(`gifts.${giftId}`);
    } else {
        await db.set(`gifts.${giftId}`, gift);
    }

    return { success: true };
}
