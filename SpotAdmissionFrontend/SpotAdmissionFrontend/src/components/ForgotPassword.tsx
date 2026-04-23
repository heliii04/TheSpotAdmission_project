import React, { useState } from "react";
import axiosInstance from "../api/Api";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Backend API call to send reset email
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      setMessage("✅ Reset link has been sent to your email!");
    } catch (error: any) {
      setMessage("❌ Email not found or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden p-4">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
      
      <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.1)] w-full max-w-md border border-slate-100 z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4 text-3xl">
            🔑
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Forgot Password?</h2>
          <p className="text-slate-500 mt-2 font-medium">No worries, we'll send you reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:bg-[#1E40AF] text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200/50 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? "Sending..." : (
              <> Send Reset Link <Send className="h-5 w-5" /> </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${message.includes('❌') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;