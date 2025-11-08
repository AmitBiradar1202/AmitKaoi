import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="border-t pt-14 min-h-[80vh] bg-gradient-to-b from-gray-50 to-white">
      {/* Title */}
      <div className="text-3xl font-semibold text-center mb-10">
        <Title text1="YOUR" text2="CART" />
        <div className="w-20 h-1 bg-black mx-auto rounded-full mt-2"></div>
      </div>

      {/* CART ITEMS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {cartData.length > 0 ? (
          cartData.map((item, idx) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={idx}
                className="bg-white mb-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between"
              >
                {/* Product Info */}
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-20 sm:w-24 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{productData.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <p className="font-medium">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md border border-gray-300">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                 <input
  onChange={(e) =>
    e.target.value === "" || e.target.value === "0"
      ? null
      : updateQuantity(item._id, item.size, Number(e.target.value))
  }
  type="number"
  min={1}
  defaultValue={item.quantity}
  className="border border-gray-300 w-14 px-2 py-1 text-center rounded-md text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none"
/>


                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-all"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-5 h-5 opacity-70 hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            Your cart is empty 🛒
          </div>
        )}
      </div>

      {/* TOTAL + CHECKOUT */}
      {cartData.length > 0 && (
        <div className="flex justify-end max-w-5xl mx-auto px-4 sm:px-8 mt-12 mb-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                type="button"
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                  } else {
                    navigate("/place-order");
                  }
                }}
                className="bg-black text-white text-sm font-semibold my-6 px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-800 transition-all"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
