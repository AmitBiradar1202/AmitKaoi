import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
const backendUrl = "https://amit-kaoi.vercel.app/";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // For image modal

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) setOrders(response.data.orders);
      else toast.error("Something went wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: e.target.value }, { headers: { token } });
      if (response.data?.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else toast.error(response.data?.message || "Something went wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`backendUrl/api/order/${orderId}`, { headers: { token } });
      if (response.data?.success) {
        toast.success("Order deleted successfully");
        await fetchAllOrders();
      } else toast.error(response.data?.message || "Something went wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => { fetchAllOrders(); }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-200 text-green-800";
      case "Out for delivery": return "bg-yellow-200 text-yellow-800";
      case "Shipped": return "bg-blue-200 text-blue-800";
      case "Packing": return "bg-orange-200 text-orange-800";
      case "OrderPlaced": return "bg-gray-200 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

 const filteredOrders = orders.filter(order => {
  const query = searchQuery.toLowerCase();
  const fullName = `${order.address.firstName} ${order.address.lastName}`.toLowerCase();
  return (
    order._id.toLowerCase().includes(query) ||
    order.address.firstName.toLowerCase().includes(query) ||
    order.address.lastName.toLowerCase().includes(query) ||
    fullName.includes(query) ||
    order.items.some(item => item.name.toLowerCase().includes(query))
  );
});


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-tight drop-shadow-md">
  Orders Dashboard
</h2>

     {/* Search Bar */}
<div className="mb-6 flex justify-center">
  <input
    type="text"
    placeholder="Search by Product Name, Order ID, or User Name..."
    className="w-full max-w-md p-3 rounded-lg bg-white border border-gray-300 
               text-gray-800 shadow-sm focus:outline-none focus:ring-2 
               focus:ring-pink-500 focus:border-pink-500 transition duration-200"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>


      <div className="space-y-6">
        {filteredOrders.length === 0 && <p className="text-center text-gray-500">No orders found!</p>}

        {filteredOrders.map((order, idx) => (
          <div key={idx} className="border rounded-lg shadow-lg bg-white p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">

              {/* Column 1: Items */}
              <div className="flex flex-col space-y-4 md:col-span-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="border rounded-lg shadow-sm bg-gray-50 p-4 flex flex-col items-center">
                    <img 
                      src={item.image?.[0] || assets.upload_area} 
                      alt={item.name} 
                      className="w-full h-48 object-contain rounded-lg mb-3 cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedImage(item.image?.[0] || assets.upload_area)} // Only image
                    />
                    <div className="text-center space-y-1">

                      
                      <p className="font-semibold text-lg">{item.name}</p>

                      <p className="text-sm md:text-base"><span className="font-semibold">Qty:</span> {Number(item.Quantity)}</p>
                      <p className="text-sm md:text-base"><span className="font-semibold">Size:</span> {item.size}</p>
                      {item.color && <p className="text-sm md:text-base"><span className="font-semibold">Color:</span> {item.color}</p>}
                      <p className="text-pink-600 font-semibold text-lg">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Customer Info */}
              <div className="text-sm md:text-base space-y-2 md:col-span-1">
                <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipCode}</p>
                <p>📞 {order.address.phone}</p>
                <p>📧 {order.address.email}</p>
              </div>

              {/* Column 3: Order Details */}
<div className="text-sm md:text-base space-y-2 md:col-span-1">
  <p><span className="font-semibold">Order ID:</span> {order.orderId || order._id.slice(-6).toUpperCase()}</p>
  <p><span className="font-semibold">Items:</span> {order.items.length}</p>
  <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
  <p><span className="font-semibold">Payment:</span> {order.payment ? 'Done' : 'Pending'}</p>
  <p><span className="font-semibold">Order Date:</span> {new Date(order.date).toLocaleDateString()}</p>
  <p>
    <span className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
      {order.status}
    </span>
  </p>
</div>


              {/* Column 4: Amount */}
              <div className="text-lg md:text-xl font-bold text-green-600 flex items-center justify-start md:justify-center md:col-span-1">
                {formatCurrency(order.amount)}
              </div>

              {/* Column 5: Status Select */}
              <div className="flex items-center md:col-span-1">
                <select
                  onChange={(e)=>statusHandler(e, order._id)}
                  value={order.status}
                  className="p-2 border border-gray-300 rounded w-full text-sm font-semibold"
                >
                  <option value="OrderPlaced">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Column 6: Delete */}
             {/* Column 6: Delete */}
<div className="flex items-center justify-center md:col-span-1">
  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(order._id);
      }
    }}
    className={`px-4 py-2 rounded text-white transition ${
      order.status === "Delivered"
        ? "bg-red-500 hover:bg-red-600"
        : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={order.status !== "Delivered"} // Only allow for Delivered
  >
    Delete
  </button>
</div>


            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold z-50"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}

    </div>
  );
}

export default Order;
