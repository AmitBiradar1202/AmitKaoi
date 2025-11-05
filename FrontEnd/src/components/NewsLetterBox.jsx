import React, { useState } from "react";
import { motion } from "framer-motion";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
    }
  };

  return (
    <div className="text-center py-16 px-6 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-semibold text-gray-800"
      >
        Subscribe & Get <span className="text-black">20% OFF</span> 🎉
      </motion.p>

      <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-md mx-auto">
        Join <span className="font-medium">Amit's Fashion Family</span> for exclusive deals, early drops, and the latest streetwear trends.
      </p>

      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-8 border border-gray-300 rounded-full pl-5 pr-2 py-2 shadow-sm"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent px-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          SUBSCRIBE
        </button>
      </motion.form>

      {submitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 font-medium mt-2"
        >
          ✅ Thank you for subscribing!
        </motion.p>
      )}
    </div>
  );
};

export default NewsLetterBox;
