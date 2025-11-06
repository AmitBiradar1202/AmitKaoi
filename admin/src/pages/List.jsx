import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currency } from '../App';

const backendUrl = "https://amitkaoi.onrender.com";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-wide">
        All Products List
      </h2>

      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-100 rounded-t-xl font-semibold text-gray-700 text-sm uppercase tracking-wide">
        <span className="text-center">Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {/* Product List */}
      {list.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 items-center py-4 px-4 border-b border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl border border-gray-300 hover:border-gray-500 transition-all duration-300"
            />
          </div>

          {/* Name */}
          <p className="text-base font-semibold text-gray-800 hover:text-gray-900 transition-colors">
            {item.name}
          </p>

          {/* Category */}
          <p className="text-gray-500 text-sm md:text-base">{item.category}</p>

          {/* Price */}
          <p className="text-lg font-bold text-gray-800">{currency} {item.price}</p>

          {/* Action */}
          <p
            onClick={() => removeProduct(item._id)}
            className="text-red-500 text-xl font-bold cursor-pointer hover:text-red-700 text-center transition-colors"
          >
            ✖
          </p>
        </div>
      ))}

      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-lg italic">No products available</p>
      )}
    </div>
  );
};

export default List;
