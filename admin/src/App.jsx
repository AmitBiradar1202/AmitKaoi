import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import { assets } from "./assets/assets.js";
// top of App.jsx — add this (adjust path if needed)
import CouponPage from "./pages/CouponPage";


export const backendUrl = "https://amitkaoi.onrender.com";
export const currency='₹'
const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  
  
  useEffect(()=>{
   localStorage.setItem('token',token)
  },[token])

  return (
    <div className="min-h-screen bg-gray-50 bg-cover bg-center"
  style={{ backgroundImage: `url(${assets.bg})` }}>

      
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  
  theme="dark" // dark theme for black/white aesthetic
/>
      {token === "" ? <Login setToken={setToken}/> : <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-5 md:ml-[5vw] my-8 text-gray-600 text-base">
            <Routes>
              <Route path='/add' element={<Add token={token}/>} />
              <Route path='/list' element={<List token={token}/>} />
              <Route path='/order' element={<Order token={token}/>} />
               <Route path="/coupons" element={<CouponPage token={token} />} /> {/* ✅ new route */}
            </Routes>
          </div>

        {/* <img src={assets.Admin} alt=""  className='w-90'/> */}
        </div>
        
      </>      
      }
    </div>
  );
};

export default App;
