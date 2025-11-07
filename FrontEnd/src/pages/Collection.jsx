import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from '../components/ProductItem';
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const subCategoryMap = {
  Men: [
    { group: "Topwear", options: ["T-Shirts","Shirts","Crop Tops","Hoodies","Sweatshirts","Blazers","Kurtas & Kurtis"] },
    { group: "Bottomwear", options: ["Jeans","Trousers","Shorts","Track Pants","Skirts","Leggings","Cargo Pants"] },
    { group: "Winterwear", options: ["Jackets","Sweaters","Sweatshirts","Coats","Cardigans","Pullovers"] }
  ],
  Women: [
    { group: "Topwear", options: ["T-Shirts","Shirts","Crop Tops","Hoodies","Sweatshirts","Blazers","Kurtas & Kurtis"] },
    { group: "Bottomwear", options: ["Jeans","Trousers","Shorts","Track Pants","Skirts","Leggings","Cargo Pants"] },
    { group: "Winterwear", options: ["Jackets","Sweaters","Sweatshirts","Coats","Cardigans","Pullovers"] }
  ],
  Shoes: [
    { group: "Sneakers", options: ["Casual Sneakers","High Tops","Low Tops","Slip-Ons"] },
    { group: "Formal Shoes", options: ["Oxfords","Brogues","Loafers","Derby Shoes"] },
    { group: "Sports Shoes", options: ["Running Shoes","Training Shoes","Walking Shoes","Football Shoes"] },
    { group: "Sandals & Slippers", options: ["Flip Flops","Slides","Casual Sandals","Crocs"] }
  ]
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sortType, setSortType] = useState('relevant');
  const [loading, setLoading] = useState(true);

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    if (category) productCopy = productCopy.filter(item => item.category === category);
    if (subCategory) productCopy = productCopy.filter(item => item.subCategory === subCategory);
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let productsCopy = [...filterProduct];
    switch (sortType) {
      case 'low-high': setFilterProduct(productsCopy.sort((a,b) => a.price-b.price)); break;
      case 'high-low': setFilterProduct(productsCopy.sort((a,b) => b.price-a.price)); break;
      default: applyFilter();
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => { setFilterProduct(products); setLoading(false); }, 1000);
    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => applyFilter(), [category, subCategory, search, showSearch, products]);
  useEffect(() => sortProducts(), [sortType]);

  // Get only subcategories relevant to selected category
  const visibleSubCategories = category ? subCategoryMap[category] || [] : [];

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t border-gray-200 px-4 md:px-10">
      {/* Filter Sidebar */}
      <div className="min-w-[200px] md:min-w-[220px]">
       <p
  onClick={() => setShowFilter(!showFilter)}
  className="my-2 text-lg sm:text-xl flex items-center justify-between cursor-pointer font-semibold text-black"
>
  FILTERS
  <img
    className={`h-4 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
    src={assets.dropdown_icon}
    alt="dropdown"
  />
</p>


        <div className={`border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50 shadow-sm ${showFilter ? "block" : "hidden sm:block"}`}>
          {/* Category */}
          <div className="mb-4">
            <label className="font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setSubCategory(''); }}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-pink-300 outline-none"
            >
              <option value="">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          {/* SubCategory */}
          {visibleSubCategories.length > 0 && (
            <div>
              <label className="font-medium text-gray-700">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-pink-300 outline-none"
              >
                <option value="">All</option>
                {visibleSubCategories.map(group => (
                  <optgroup key={group.group} label={group.group}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select 
            className="border border-gray-300 text-sm px-3 py-2 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-pink-400 rounded-full animate-spin"></div>
            </div>
          ) : (
            filterProduct.length > 0 ? (
              filterProduct.map((item, idx) => (
                <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-20">No products found!</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
