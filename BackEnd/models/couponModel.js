import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountAmount: { type: Number, required: true },
  expiryDate: { type: Date, default: null },   // ✅ Optional
  minPurchase: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
