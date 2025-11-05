import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully!");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:max-w-md bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-5 transition-all duration-300 hover:shadow-gray-300"
      >
        {/* Title */}
        <div className="inline-flex items-center gap-2 mb-4">
          <p className="font-serif text-3xl text-gray-800 tracking-wide">
            {currentState}
          </p>
          <hr className="border-none h-[2px] w-8 bg-gray-700 rounded" />
        </div>

        {/* Input fields */}
        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition"
            placeholder="Full Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition"
          placeholder="Email Address"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition"
          placeholder="Password"
          required
        />

        {/* Links */}
        <div className="w-full flex justify-between text-sm mt-[-4px] text-gray-600">
          <p className="cursor-pointer hover:text-gray-900 transition">
            Forgot Password?
          </p>
          <p
            className="cursor-pointer hover:text-gray-900 transition font-medium"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currentState === "Login"
              ? "Create an account"
              : "Already have an account?"}
          </p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-gray-900 text-white font-light px-10 py-2 mt-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out"
        >
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
