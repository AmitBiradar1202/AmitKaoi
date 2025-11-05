import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer"
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden rounded-xl">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={image[0]}
            alt={name}
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="pt-4 text-center">
          <h3 className="text-gray-800 font-semibold text-lg truncate hover:text-gray-600 transition">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {currency}
            {price.toFixed(2)}
          </p>
          <button className="mt-3 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-all duration-300">
            View Product
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
