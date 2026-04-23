import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/Api";
import { Eye, EyeOff } from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- Strict Validation Logic ---
  const validate = () => {
    let newErrors: any = {};

    // 1. Name: Max 2 words
    const words = formData.name.trim().split(/\s+/);
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (words.length > 2) {
      newErrors.name = "Please enter only First and Last name (Max 2 words)";
    }

    // 2. Email: Must end with @gmail.com
    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Only @gmail.com addresses are allowed";
    }

    // 3. Password: Must be exactly 8 characters
    if (formData.password.length !== 8) {
      newErrors.password = "Password must be exactly 8 characters long";
    }

    // 4. Role
    if (!formData.role || formData.role === " ") {
      newErrors.role = "Please select a valid role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Type karte waqt error hatane ke liye
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validate()) return;

    try {
      await axiosInstance.post("/auth/register", formData);
      setSuccessMsg("🎉 Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setFormData({ name: "", email: "", password: "", role: "", phone: "" });
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      alert(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-100 -mt-10">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-3 text-lg">Join us and start your journey today!</p>
        </div>

        {/* Success Message Pop-up Style */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 border border-green-200 rounded-2xl text-center font-bold animate-bounce">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter First & Last Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border rounded-2xl outline-none transition-all ${
                errors.name ? "border-red-500 bg-red-50 focus:ring-red-100" : "border-gray-200 bg-gray-50/50 focus:ring-blue-100 focus:border-blue-500 focus:ring-4"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-2 font-semibold">{errors.name}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Select Your Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border rounded-2xl outline-none transition-all ${
                errors.role ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/50 focus:ring-blue-100 focus:border-blue-500 focus:ring-4"
              }`}
            >
              <option value="">Select</option>
              <option value="parent">Parent</option>
              {/* <option value="school">school</option> */}
              <option value="student">Student</option>
              <option value="counsellor">Counsellor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1 ml-2 font-semibold">{errors.role}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email (@gmail.com)</label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border rounded-2xl outline-none transition-all ${
                errors.email ? "border-red-500 bg-red-50 focus:ring-red-100" : "border-gray-200 bg-gray-50/50 focus:ring-blue-100 focus:border-blue-500 focus:ring-4"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-semibold">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password (8 characters)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 border rounded-2xl outline-none transition-all pr-12 ${
                  errors.password ? "border-red-500 bg-red-50 focus:ring-red-100" : "border-gray-200 bg-gray-50/50 focus:ring-blue-100 focus:border-blue-500 focus:ring-4"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                style={{ top: '50%' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2 font-semibold">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 text-lg mt-4"
          >
            Create My Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-blue-600 font-black hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;