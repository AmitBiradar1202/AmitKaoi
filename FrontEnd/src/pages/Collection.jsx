import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from '../components/ProductItem';
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let productsCopy = [...filterProduct];
    switch (sortType) {
      case 'low-high':
        setFilterProduct(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProduct(productsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => setFilterProduct(products), [products]);
  useEffect(() => applyFilter(), [category, subCategory, search, showSearch, products]);
  useEffect(() => sortProducts(), [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t border-gray-200 px-4 md:px-10">
      {/* Filter Sidebar */}
      <div className="min-w-[200px] md:min-w-[220px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-lg sm:text-xl flex items-center justify-between cursor-pointer font-semibold"
        >
          FILTERS
          <img
            className={`h-4 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 rounded-lg p-4 mt-4 bg-white shadow-sm ${showFilter ? "block" : "hidden sm:block"}`}>
          <p className="mb-3 font-medium text-gray-700">CATEGORY</p>
          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            {["Men", "Women", "Shoes"].map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition-colors">
                <input className="w-4 h-4 accent-pink-400" type="checkbox" value={cat} onChange={toggleCategory} />
                {cat.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 rounded-lg p-4 mt-4 bg-white shadow-sm ${showFilter ? "block" : "hidden sm:block"}`}>
          <p className="mb-3 font-medium text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            {["Topwear", "Bottomwear", "Winterwear"].map(sub => (
              <label key={sub} className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition-colors">
                <input className="w-4 h-4 accent-pink-400" type="checkbox" value={sub} onChange={toggleSubCategory} />
                {sub.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select 
            className="border border-gray-300 text-sm px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-400"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, idx) => (
              <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No products found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
