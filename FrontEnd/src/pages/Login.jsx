import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle email/password login or signup
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`backendUrl/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`backendUrl/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
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

  // Check for Google token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");
    if (googleToken) {
      localStorage.setItem("token", googleToken);
      setToken(googleToken);
      navigate("/");
    } else if (token) {
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

        {/* Name field for Sign Up */}
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

        {/* Email & Password */}
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
          required={currentState === "Login"}
        />

        {/* Links */}
        <div className="w-full flex justify-between text-sm mt-[-4px] text-gray-600">
          <p className="cursor-pointer hover:text-gray-900 transition">Forgot Password?</p>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-900 text-white font-light px-10 py-2 mt-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out"
        >
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>

        {/* OR Divider */}
        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <a
          href={`backendUrl/api/user/google`}
          className="flex justify-center items-center w-full bg-red-500 text-white font-medium px-4 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-300"
        >
          <img
            src="data:image/png;base64,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"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </a>
      </form>
    </div>
  );
};

export default Login;
