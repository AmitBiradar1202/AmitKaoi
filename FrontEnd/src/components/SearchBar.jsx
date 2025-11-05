import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-t border-b bg-white/60 backdrop-blur-md text-center shadow-sm"
        >
          <div className="inline-flex items-center justify-center border border-gray-300 bg-white/60 rounded-full w-3/4 sm:w-1/2 px-5 py-3 my-5 mx-3 shadow-sm hover:shadow-md transition-all duration-200">
            <input
              className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:placeholder-gray-500 focus:ring-0"
              value={search}
              type="text"
              placeholder="Search for products..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              className="w-5 opacity-70 hover:opacity-100 transition"
              src={assets.search_icon}
              alt="search"
            />
          </div>

          <img
            className="inline w-4 cursor-pointer opacity-70 hover:opacity-100 transition ml-2"
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowSearch(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
