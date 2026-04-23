import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/Api";
// import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student", // Default role
    phone: "",
  });

  const [loading, setLoading] = useState(false);

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

    // 3. Email: Must end with @gmail.com
    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Only @gmail.com addresses are allowed";
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
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      
      if (res.data.alreadyExists) {
        toast.info("Account already exists. Sending login reminder...");
      } else {
        toast.success("🎉 Account created! Login credentials sent to your email.");
      }

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      setFormData({ name: "", email: "", role: "student", phone: "" });
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-100 -mt-10">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-3 text-lg">Join us and start your journey today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 text-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register & Get Login Info"}
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