import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currency } from '../App';

const backendUrl = "http://localhost:8080";

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
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products List</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 rounded-t-lg font-semibold">
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
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-4 px-4 border-b hover:bg-gray-50 rounded-md md:rounded-none transition duration-200 shadow-sm md:shadow-none"
        >
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          </div>

          {/* Name */}
          <p className="text-sm md:text-base font-medium">{item.name}</p>

          {/* Category */}
          <p className="text-sm md:text-base">{item.category}</p>

          {/* Price */}
          <p className="text-sm md:text-base font-semibold">
            {currency} {item.price}
          </p>

          {/* Action */}
          <p
            onClick={() => removeProduct(item._id)}
            className="text-red-500 text-lg font-bold cursor-pointer text-right md:text-center hover:text-red-700 transition"
          >
            X
          </p>
        </div>
      ))}

      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products available</p>
      )}
    </div>
  );
};

export default List;
