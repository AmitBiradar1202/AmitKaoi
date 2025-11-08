import axios from 'axios';
import { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [finalAmount, setFinalAmount] = useState(getCartAmount() + delivery_fee);

  const backendUrl =
    "https://amitkaoi.onrender.com";

  const handleApplyCoupon = async () => {
    try {
      const res = await axios.post(`${backendUrl}/apply`, {
        code: couponCode,
        totalAmount: getCartAmount(),
      });

      if (res.data.success) {
        setDiscount(res.data.discountAmount);
        setFinalAmount(res.data.finalAmount + delivery_fee);
        setMessage(res.data.message);
      } else {
        setDiscount(0);
        setFinalAmount(getCartAmount() + delivery_fee);
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("Error applying coupon");
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
      {/* Title */}
      <div className="text-center mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Price Details */}
      <div className="flex flex-col gap-4 text-base text-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-gray-900">
            {currency} {getCartAmount()}.00
          </span>
        </div>

        {discount > 0 && (
          <>
            <div className="flex justify-between items-center text-green-700 font-medium">
              <span>Coupon Discount</span>
              <span>- {currency}{discount}.00</span>
            </div>
            <hr className="border-gray-300" />
          </>
        )}

        <div className="flex justify-between items-center">
          <span className="font-medium">Shipping Fee</span>
          <span className="font-semibold text-gray-900">
            {currency} {delivery_fee}.00
          </span>
        </div>
        <hr className="border-gray-300" />

        <div className="flex justify-between items-center text-lg mt-2">
          <b className="text-gray-900">Total</b>
          <b className="text-xl text-black font-bold">
            {currency}
            {getCartAmount() === 0 ? 0 : finalAmount}.00
          </b>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mt-6">
        <label className="block text-gray-800 font-medium mb-1">
          Apply Coupon Code
        </label>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border border-gray-400 p-2 rounded-md w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleApplyCoupon}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all font-semibold"
        >
          Apply Coupon
        </button>
        {message && (
          <p className={`text-sm text-center mt-2 ${message.includes("Error") ? "text-red-600" : "text-green-700"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
