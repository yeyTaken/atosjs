import { Schema, model } from 'mongoose';

import { Gift } from '../../../classes/GiftManager/types/gifts';

const giftSchema: Schema<Gift> = new Schema<Gift>({
    id: { type: String, required: true, unique: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedCount: { type: Number, default: 0 },
    maxRedeem: { type: Number, required: true },
    expiresAt: { type: Date }, // Alterado para ser opcional
    type: { type: String },
    value: { type: Schema.Types.Mixed } // Alterado para ser um objeto genérico
});

export const GiftModel = model<Gift>('Gift', giftSchema);