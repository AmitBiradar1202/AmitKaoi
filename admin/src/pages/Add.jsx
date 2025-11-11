import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "https://amitkaoi.onrender.com";

const Add = ({ token }) => {
  const [images, setImages] = useState(Array(8).fill(false));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // ✅ Append all 8 images
      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
        // Reset all fields
        setName("");
        setDescription("");
        setPrice("");
        setImages(Array(8).fill(false));
        setSizes([]);
        setBestseller(false);
      } else toast.error(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-700"
      >
        {/* Upload Section */}
        <div>
          <p className="mb-2 font-semibold">Product Images (Up to 8)</p>
          <div className="flex gap-4 flex-wrap">
            {images.map((img, idx) => (
              <label
                key={idx}
                className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-pink-400 transition"
              >
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[idx] = e.target.files[0];
                    setImages(newImages);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <label className="font-semibold">Product Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            rows={4}
            required
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full border px-3 py-2 rounded-lg"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Shoes</option>
            </select>
          </div>

          <div className="relative overflow-visible z-50">
            <label className="font-semibold">Sub Category</label>
            <div className="relative">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="mt-2 w-full border px-3 py-2 rounded-lg bg-white z-50 relative focus:ring-2 focus:ring-pink-300 outline-none"
              >
                <optgroup label="Topwear">
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Crop Tops">Crop Tops</option>
                  <option value="Hoodies">Hoodies</option>
                </optgroup>
                <optgroup label="Bottomwear">
                  <option value="Jeans">Jeans</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Track Pants">Track Pants</option>
                </optgroup>
                <optgroup label="Shoes">
                  <option value="Sneakers">Sneakers</option>
                  <option value="Sandals">Sandals</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold">Price (₹)</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-semibold mb-2">Available Sizes</p>
          <div className="flex flex-wrap gap-2">
            {(category === "Shoes"
              ? ["6", "7", "8", "9", "10", "11"]
              : ["S", "M", "L", "XL", "XXL"]
            ).map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-1 rounded-full font-semibold border transition ${
                  sizes.includes(size)
                    ? "bg-pink-100 border-pink-400 text-pink-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            id="bestseller"
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          <label htmlFor="bestseller" className="font-semibold">
            Add to Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-40 py-3 text-white rounded-xl transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
