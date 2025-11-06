import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `https://amitkaoi.vercel.app/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
  let allOrdersItem = [];
  response.data.orders.forEach((order) => {
    const displayOrderId = order.orderId || order._id.slice(-6).toUpperCase(); // fallback
    order.items.forEach((item) => {
      item.status = order.status;
      item.payment = order.payment;
      item.paymentMethod = order.paymentMethod;
      item.date = order.date;
      item.displayOrderId = displayOrderId; // new field
      allOrdersItem.push(item);
    });
  });
  setOrderData(allOrdersItem.reverse());
}

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Badge color based on order status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "out for delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="border-t pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="text-center text-3xl mb-10">
        <Title text1="MY " text2="ORDERS" />
      </div>

      {/* Orders List */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-6">
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-light">
            You have no orders yet.
          </p>
        ) : (
          orderData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Product Info */}
              <p>
    Order ID:{" "}
    <span className="text-gray-700 font-semibold">{item.displayOrderId}</span>
  </p>
              <div className="flex items-start gap-5 text-gray-700 w-full md:w-3/4">
             
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">Price:</span>{" "}
                      {currency}
                      {item.price}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Quantity:
                      </span>{" "}
                      {item.Quantity}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Size:</span>{" "}
                      {item.size}
                    </p>
                  </div>

                  <div className="mt-3 text-sm text-gray-500 space-y-1">
                    <p>
                      Date:{" "}
                      <span className="text-gray-700">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p>
                      Payment Method:{" "}
                      <span className="text-gray-700">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-center justify-center md:w-1/4 gap-3">
                <span
                  className={`px-4 py-2 text-sm font-medium border rounded-full ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status || "Pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
