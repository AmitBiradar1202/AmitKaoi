import React, { useContext } from 'react';
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
      {/* Title */}
      <div className="text-center mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Price Details */}
      <div className="flex flex-col gap-4 text-base text-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-gray-800">
            {currency} {getCartAmount()}.00
          </span>
        </div>
        <hr className="border-gray-200" />

        <div className="flex justify-between items-center">
          <span className="font-medium">Shipping Fee</span>
          <span className="font-semibold text-gray-800">
            {currency} {delivery_fee}.00
          </span>
        </div>
        <hr className="border-gray-200" />

        <div className="flex justify-between items-center text-lg mt-2">
          <b className="text-gray-900">Total</b>
          <b className="text-xl text-black font-bold">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>

      {/* Checkout Button */}
     
    </div>
  );
};

export default CartTotal;
