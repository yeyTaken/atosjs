import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    id: { type: String, required: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedCount: { type: Number, default: 0 },
    maxRedeem: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    type: { type: String },
    value: { type: Map, of: mongoose.Schema.Types.Mixed }  // or another suitable type depending on your data
  });
  
export const GiftModel = mongoose.model("Gift", giftSchema);
