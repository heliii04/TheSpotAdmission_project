import React, { useState } from "react";
import axiosInstance from "../api/Api";
import { Link, useNavigate } from "react-router-dom"; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Dummy Email Filter Logic
  const isDummyEmail = (email: string) => {
    const dummyDomains = [
      "test.com", "example.com", "dummy.com", 
      "temp.com", "mailinator.com", "123.com"
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return dummyDomains.includes(domain);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

  // Validation Check
    if (isDummyEmail(formData.email)) {
      setMessage("❌ Please use a valid professional or personal email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      // ✅ Save token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/dashboard"; // Redirect to dashboard
      // Login success hone par ye save karein
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);

      setMessage("🎉 Login successful!");
      console.log("User logged in:", response);

      // Redirect or update UI as needed
      window.location.href = "/";
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Invalid email or password.");
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
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          required
        />
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
        <div className="text-gray-600">
          New User? <Link to="/register" className="text-blue-600 font-bold hover:underline">Signup</Link>
        </div>
        <Link to="/forgot-password" title="Forgot Password" className="text-primary-600 hover:underline font-medium">
          Forgot Password?
        </Link>
      </div>
    </div>

    {message && <p className="mt-4 text-center text-sm text-red-500 font-medium">{message}</p>}
  </div>
</div>  );
};

export default Login;
