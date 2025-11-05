import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    setToken,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 transition-all">
      <div className="flex items-center justify-between py-4 px-4 sm:px-10 font-medium">
        {/* Logo */}
        <Link to="/" className="hover:opacity-80 transition">
          <img src={assets.logo} className="w-36 sm:w-40" alt="LOGO" />
        </Link>

        {/* Nav Links */}
        <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
          {["/", "/collection", "/about", "/contact"].map((path, idx) => {
            const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `relative flex flex-col items-center gap-1 transition-all ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                <p className="tracking-wide">{names[idx]}</p>
                <span className="absolute bottom-[-3px] w-0 group-hover:w-1/2 transition-all duration-300 h-[2px] bg-black"></span>
              </NavLink>
            );
          })}
          <div className="flex flex-col items-center gap-1 border border-gray-300 rounded-md px-2 py-[2px] hover:bg-gray-100 transition">
            <p>
              <a href="https://AmitKaoi-admin.vercel.app/" target="_blank" rel="noreferrer">
                Admin
              </a>
            </p>
          </div>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <Link to="/collection">
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              alt="Search"
              className="w-5 cursor-pointer hover:scale-110 transition"
            />
          </Link>

          {/* Profile */}
          <div className="group relative">
            <img
              onClick={(e) => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer hover:scale-110 transition"
            />
            {/* Dropdown */}
            {token && (
              <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
                <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white shadow-lg border rounded-xl text-gray-600 hover:text-gray-800 transition">
                
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black text-red-500"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 min-w-5 hover:scale-110 transition"
            />
            <p className="absolute right-[-6px] bottom-[-6px] w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer sm:hidden hover:scale-110 transition"
          />
        </div>
      </div>

      {/* Sidebar Menu (Mobile) */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-2/3 bg-white/90 backdrop-blur-md shadow-lg flex flex-col text-gray-700 z-50"
          >
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => setVisible(false)}
            >
              <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
              <p className="font-medium">Back</p>
            </div>
            {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, i) => (
              <NavLink
                key={i}
                to={["/", "/collection", "/about", "/contact"][i]}
                className="py-3 pl-6 border-b hover:bg-gray-50 transition"
                onClick={() => setVisible(false)}
              >
                {item}
              </NavLink>
            ))}
            <div
              className="py-3 pl-6 border-b hover:bg-gray-50 transition"
              onClick={() => setVisible(false)}
            >
              <a
                href="https://AmitKaoi-admin.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Admin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
