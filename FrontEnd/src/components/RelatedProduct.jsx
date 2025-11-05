import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion } from "framer-motion";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filtered);
    }
  }, [products, category, subCategory]);

  return (
    <section className="my-24">
      {/* Title */}
      <div className="text-center mb-10">
        <Title text1="RELATED" text2="PRODUCTS" />
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Discover more items that match your taste and style.
        </p>
      </div>

      {/* Products Grid */}
      {related.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {related.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 text-sm mt-6">
          No related products found.
        </p>
      )}
    </section>
  );
};

export default RelatedProduct;
