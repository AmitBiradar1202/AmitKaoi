import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(found.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData)
    return (
      <div className="text-center text-gray-500 py-20 text-lg animate-pulse">
        Product not found
      </div>
    );

  // 🔹 Generate random "old price" (10–40% higher)
  const randomIncrease = Math.floor(Math.random() * 30) + 10;
  const oldPrice = productData.price + (productData.price * randomIncrease) / 100;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {/* --- Product Display --- */}
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">
        {/* Left: Product Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Thumbnail column */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18%] w-full gap-3 sm:gap-2 justify-center sm:justify-normal">
            {productData.image.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={idx}
                alt="thumbnail"
                className={`cursor-pointer rounded-xl border-2 transition-all duration-200 
                  ${image === item ? "border-black scale-105" : "border-transparent hover:opacity-80"} 
                  w-[25%] sm:w-full flex-shrink-0`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl text-gray-800 mb-2 tracking-tight">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
          </div>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-900">
              {currency}
              {productData.price}
            </p>
            <p className="text-gray-500 line-through text-sm mt-1">
              {currency}
              {productData.price + 50}
            </p>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-gray-800">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={`border rounded-full py-2 px-5 text-sm font-medium transition-all 
                    ${
                      item === size
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 rounded-full text-sm tracking-wide 
                       active:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-md"
          >
            ADD TO CART
          </button>

          {/* Delivery Info */}
          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery available</p>
            <p>🔁 Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* --- Description & Review Tabs --- */}
      <div className="mt-20 bg-gray-50 rounded-xl shadow-sm border p-6">
        <div className="flex border-b mb-4">
          <b className="border-b-2 border-black px-5 py-3 text-sm">Description</b>
        </div>
        <div className="text-gray-600 leading-relaxed text-sm">
          An e-commerce website is an online platform that facilitates the buying and selling of products
          or services over the internet. It serves as a virtual marketplace where businesses and individuals
          can showcase their products, interact with customers, and conduct transactions globally.
        </div>
      </div>

      {/* --- Related Products --- */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
