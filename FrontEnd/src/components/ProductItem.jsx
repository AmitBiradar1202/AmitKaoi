import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/product/${id}`} className="block">
        {/* Image */}
        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={image[0]}
            alt={name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-gray-900 font-semibold px-4 py-2 rounded-full text-sm shadow-md flex items-center gap-2">
              <ShoppingBag size={16} /> View Product
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 text-center">
          <h3 className="text-gray-900 font-semibold text-lg truncate mb-1">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">
            {currency}
            {price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
