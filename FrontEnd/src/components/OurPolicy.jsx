import React from "react";
import { assets } from "../assets/assets.js";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "Enjoy a smooth and hassle-free exchange process with us.",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Return your products within 7 days — completely free.",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We’re here for you 24/7 with dedicated support service.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Our <span className="text-gray-600">Policies</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <img
                src={policy.icon}
                alt={policy.title}
                className="w-16 mx-auto mb-6"
              />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-500 text-sm">{policy.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
