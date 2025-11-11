import axios from "axios";
import { useEffect, useState } from "react";

const CouponPage = ({ token }) => {
  const backendUrl =
     "https://amitkaoi.onrender.com";

  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountAmount: "",
    expiryDate: "",
    minPurchase: "",
  });


  // Fetch coupons
 const fetchCoupons = async () => {
  try {
    const res = await axios.get(`${backendUrl}/api/coupon`); // must match router mount path

    console.log("Coupons API response:", res.data);

    // ✅ Fix: extract the actual array
    if (Array.isArray(res.data.coupons)) {
      setCoupons(res.data.coupons);
    } else if (Array.isArray(res.data)) {
      setCoupons(res.data);
    } else {
      console.warn("Unexpected response format:", res.data);
      setCoupons([]);
    }
  } catch (err) {
    console.error("Error fetching coupons:", err);
    setCoupons([]); // prevent crash
  }
};


  useEffect(() => {
    fetchCoupons();
  }, []);

  // Add new coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!form.code || !form.discountAmount) return alert("Fill required fields");
    await axios.post(`${backendUrl}/api/coupon/add`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ code: "", discountAmount: "", expiryDate: "", minPurchase: "" });
    fetchCoupons();
  };

  // Remove expiry
  const handleRemoveExpiry = async (id) => {
    await axios.put(`${backendUrl}/api/coupon/update/${id}`, { expiryDate: null });
    fetchCoupons();
  };

  // Delete coupon
  const handleDelete = async (id) => {
    await axios.delete(`${backendUrl}/api/coupon/delete/${id}`);
    fetchCoupons();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Manage Coupons</h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleAddCoupon}
        className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Discount ₹"
          value={form.discountAmount}
          onChange={(e) => setForm({ ...form, discountAmount: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          placeholder="Expiry"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Purchase ₹"
          value={form.minPurchase}
          onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Coupon
        </button>
      </form>

      {/* Coupon List */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Available Coupons</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Discount</th>
              <th className="p-2 text-left">Min Purchase</th>
              <th className="p-2 text-left">Expiry</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-2 font-semibold">{c.code}</td>
                <td className="p-2">₹{c.discountAmount}</td>
                <td className="p-2">₹{c.minPurchase || 0}</td>
                <td className="p-2">
                  {c.expiryDate
                    ? new Date(c.expiryDate).toLocaleDateString()
                    : "No Expiry"}
                </td>
                <td className="p-2 flex gap-2">
                  {c.expiryDate && (
                    <button
                      onClick={() => handleRemoveExpiry(c._id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Remove Expiry
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponPage;
