import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/Api";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

const ResetPassword: React.FC = () => {
  const { token } = useParams(); // URL se token lene ke liye
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Backend API call: token aur naya password bhej rahe hain  --- In JavaScript 1 second = 1000ms, so 1 minute = 60sec = 60,000ms
                                                                                  // 10 minutes = 600sec = 600,000ms
      await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      setMessage("✅ Password reset successful! Redirecting...");
      
      // 10 min baad login page par bhej dein
      setTimeout(() => {navigate("/login");}, 600000);
    } catch (error: any) {
      setMessage("❌ Link expired or invalid token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]"></div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.1)] w-full max-w-md border border-slate-100 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4 text-3xl">
            <ShieldCheck className="text-emerald-500 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Set New Password</h2>
          <p className="text-slate-500 mt-2 font-medium">Please enter your new secure password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:bg-[#1E40AF] text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${message.includes('❌') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;