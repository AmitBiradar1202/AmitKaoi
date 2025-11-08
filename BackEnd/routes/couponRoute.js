import express from "express";
import couponModel from "../models/couponModel.js";

const router = express.Router();

// ✅ Create new coupon (expiry optional)
router.post("/add", async (req, res) => {
  try {
    const { code, discountAmount, expiryDate, minPurchase } = req.body;
    const coupon = new couponModel({
      code,
      discountAmount,
      expiryDate: expiryDate || null, // optional
      minPurchase
    });
    await coupon.save();
    res.json({ success: true, message: "Coupon created", coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Admin - Get all coupons
router.get("/", async (req, res) => {
  const coupons = await couponModel.find();
  res.json({ success: true, coupons });
});

// ✅ Admin - Update coupon (like removing expiry or changing discount)
router.put("/update/:id", async (req, res) => {
  try {
    const { code, discountAmount, expiryDate, minPurchase, active } = req.body;
    const coupon = await couponModel.findById(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });

    if (code) coupon.code = code.toUpperCase();
    if (discountAmount) coupon.discountAmount = discountAmount;
    if (minPurchase) coupon.minPurchase = minPurchase;

    // ✅ Handle expiry removal
    if (expiryDate === null || expiryDate === "") {
      coupon.expiryDate = null;
    } else if (expiryDate) {
      coupon.expiryDate = expiryDate;
    }

    if (typeof active === "boolean") coupon.active = active;

    await coupon.save();
    res.json({ success: true, message: "Coupon updated", coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ User - Apply coupon
router.post("/apply", async (req, res) => {
  try {
    const { code, totalAmount } = req.body;
    const coupon = await couponModel.findOne({ code: code.toUpperCase(), active: true });

    if (!coupon)
      return res.json({ success: false, message: "Invalid coupon" });

    if (coupon.expiryDate && new Date() > coupon.expiryDate)
      return res.json({ success: false, message: "Coupon expired" });

    if (totalAmount < coupon.minPurchase)
      return res.json({ success: false, message: `Minimum purchase ₹${coupon.minPurchase} required` });

    const discountedTotal = Math.max(totalAmount - coupon.discountAmount, 0);

    res.json({
      success: true,
      message: "Coupon applied successfully",
      discountAmount: coupon.discountAmount,
      finalAmount: discountedTotal
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Admin - Delete coupon
router.delete("/delete/:id", async (req, res) => {
  try {
    await couponModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
