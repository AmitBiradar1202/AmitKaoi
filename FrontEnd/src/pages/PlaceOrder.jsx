import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, token, cartItem, setCartItem, delivery_fee, getCartAmount, products } = useContext(ShopContext);

  const backendUrl = "https://amit-kaoi.onrender.com";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "AmitBiradar1202 Fashion Store",
      description: "Secure Payment for your Order",
      image: assets.logo,
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, {
            headers: { token },
          });
          if (data.success) {
            toast.success("Payment Successful ✅");
            navigate("/orders");
            setCartItem({});
          }
        } catch (err) {
          console.log(err);
          toast.error("Payment Verification Failed!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItem = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((p) => p._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.Quantity = cartItem[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }

      const OrderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(`${backendUrl}/api/order/place`, OrderData, {
            headers: { token },
          });
          if (response.data.success) {
            toast.success("Order Placed Successfully!");
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, OrderData, {
            headers: { token },
          });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        }

        case "stripe": {
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, OrderData, {
            headers: { token },
          });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler}
          className="mt-2 border border-gray-300 rounded py-2 px-3.5 w-full" type="email" placeholder="Email Address" />

        <input required name="street" value={formData.street} onChange={onChangeHandler}
          className="mt-2 border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Street / Building" />

        <div className="flex gap-3 mt-2">
          <input required name="city" value={formData.city} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="City" />
          <input required name="state" value={formData.state} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="State" />
        </div>

        <div className="flex gap-3 mt-2">
          <input required name="zipCode" value={formData.zipCode} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required name="country" value={formData.country} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Country" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler}
          className="mt-2 border border-gray-300 rounded py-2 px-3.5 w-full" type="tel" placeholder="Phone Number" />

        <img src={assets.ForPaymentPage} alt="Payment Info"
          className="hidden lg:block w-full rounded-lg shadow-md mt-4" />
      </div>

      {/* Right side - Payment Summary */}
      <div className="mt-10 sm:max-w-[600px] w-full">
        <div className="mt-8">
          <CartTotal />
        </div>

        <div className="mt-12 text-xl">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-4 flex-col lg:flex-row mt-3">
            <div onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:shadow-md transition-all ${method === "stripe" ? "border-green-400" : ""}`}>
              <p className={`w-4 h-4 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img src={assets.stripe_logo} alt="Stripe" className="h-6 mx-3" />
            </div>

            <div onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:shadow-md transition-all ${method === "razorpay" ? "border-green-400" : ""}`}>
              <p className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-6 mx-3" />
            </div>

            <div onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:shadow-md transition-all ${method === "cod" ? "border-green-400" : ""}`}>
              <p className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-600 text-sm font-medium mx-2">Cash on Delivery</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black hover:bg-gray-800 text-white px-16 py-3 text-sm rounded-lg shadow-md">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
