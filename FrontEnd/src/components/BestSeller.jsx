import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="my-16 px-4 md:px-10">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLERS" />
        <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
          Our most-loved products — handpicked favorites that customers can’t get enough of.
        </p>
      </div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {bestSeller.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            <ProductItem
              key={idx}
  id={item._id}
  image={item.image}
  name={item.name}
  price={item.price}
  discount={item.discount}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle bottom accent */}
      <div className="mt-12 flex justify-center">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-gray-900 rounded-full"
        ></motion.div>
      </div>
    </section>
  );
};

export default BestSeller;
