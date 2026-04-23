import React, { useState } from "react";
import axiosInstance from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 1. Strict Gmail Filter
  const isValidGmail = (email: string) => {
    return email.toLowerCase().endsWith("@gmail.com");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidGmail(formData.email)) {
      toast.warning("Please use a valid @gmail.com address.");
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 15) {
      toast.warning("Password must be between 8 and 15 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userPhone", data.phone || "");
      localStorage.setItem("userId", data._id);
      localStorage.setItem("user", JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone
      }));

      toast.success(`Welcome back, ${data.name}!`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);

    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMsg = error.response?.data?.message || "Invalid email or password.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] w-full max-w-md border border-gray-100 z-10">

        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800"> LOGIN </h2>
          <p className="text-gray-500 mt-2">Please enter your details to login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">


          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address / UserName</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#6366F1] hover:bg-[#1E40AF] text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm">
            {/* <div className="text-gray-600">
              New User? <Link to="/register" className="text-blue-600 font-bold hover:underline">Signup</Link>
            </div> */}
            <Link to="/forgot-password" title="Forgot Password" className="text-primary-600 hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
