import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currency } from '../App';
import { assets } from '../assets/assets';
const backendUrl = "http://localhost:8080";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        // Hide completed transactions
        const filteredOrders = response.data.orders.filter(order => !order.payment);
        setOrders(filteredOrders);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );

      if (response.data?.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

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

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-bold mb-8 text-center">Orders Dashboard</h3>
      <div className="space-y-6">
        {orders.length === 0 && <p className="text-center text-gray-500">No pending transactions!</p>}

        {orders.map((order, idx) => (
          <div key={idx} className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

              {/* Column 1: Image and Items */}
              <div className="flex flex-col space-y-3">
                <img className="w-16 h-16 mb-3" src={assets.parcel_icon} alt="Parcel" />
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2 border-b border-gray-200">
                      {/* Product Image */}
                      <img
                        src={item.image && item.image[0] ? item.image[0] : assets.upload_area}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {/* Product Info */}
                      <div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p><span className="font-bold">Qty: </span> {Number(item.Quantity)}</p>
                        <p><span className="font-bold">Size: </span> {item.size}</p>
                        {item.color && <p><span className="font-bold">Color: </span> {item.color}</p>}
                        <p className="text-pink-600 font-semibold">{currency}{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Customer Info */}
              <div className="text-sm md:text-base space-y-2">
                <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipCode}</p>
                <p>📞 {order.address.phone}</p>
                <p>📧 {order.address.email}</p>
              </div>

              {/* Column 3: Order Details */}
              <div className="text-sm md:text-base space-y-2">
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
              <div className="text-lg md:text-xl font-bold text-green-600 flex items-center justify-start md:justify-center">
                {currency}{order.amount}
              </div>

              {/* Column 5: Status Select */}
              <div className="flex items-center">
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

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
