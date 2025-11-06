import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName(""); setDescription(""); setPrice("");
        setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setSizes([]); setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">

        {/* Images Upload */}
        <div>
          <p className="mb-2 font-semibold">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[image1, image2, image3, image4].map((img, idx) => {
              const setImg = [setImage1, setImage2, setImage3, setImage4][idx];
              return (
                <label key={idx} className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden hover:border-pink-500 transition">
                  <img
                    src={img ? URL.createObjectURL(img) : assets.upload_area}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <input type="file" hidden onChange={(e) => setImg(e.target.files[0])} />
                </label>
              )
            })}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="mb-2 font-semibold">Product Name</p>
          <input
            type="text"
            placeholder="Type Here!"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="mb-2 font-semibold">Product Description</p>
          <textarea
            placeholder="Write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
            rows={4}
          />
        </div>

        {/* Category, SubCategory, Price */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="mb-2 font-semibold">Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="flex-1">
            <p className="mb-2 font-semibold">Sub Category</p>
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="w-full sm:w-32">
            <p className="mb-2 font-semibold">Price</p>
            <input
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2 font-semibold">Sizes</p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-1 rounded-full font-semibold border ${sizes.includes(size) ? "bg-pink-200 border-pink-400" : "bg-gray-200 border-gray-300"} hover:bg-pink-100 transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(prev => !prev)} />
          <label htmlFor="bestseller" className="cursor-pointer font-semibold">Add to Bestseller</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-36 py-3 bg-black text-white rounded-lg hover:bg-pink-600 transition">
          ADD PRODUCT
        </button>

      </form>
    </div>
  )
}

export default Add;
