import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, LogOut, LayoutDashboard, Settings, Bell, BookOpen, Clock } from 'lucide-react';

const UserDashboard = () => {
  // LocalStorage se data nikalne ke liye
const [userData, setUserData] = useState({
  name: localStorage.getItem("userName") || "Guest",
  email: localStorage.getItem("userEmail") || "Not Logged In",
  role: localStorage.getItem("userRole") || "Student"
});

// Agar aapne pura object save kiya hai toh aise nikalein:
// const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

    const handleLogout = () => {
    // 1. Token ya User data clear karein
    localStorage.removeItem("token"); // Agar aap token use kar rahe hain
    
    // 2. Alert ya Toast dikhayein (Optional)
    // toast.success("Logged out successfully");

    // 3. User ko login ya home page par bhejein
    navigate("/login"); 
    
    // 4. Page reload karein agar state refresh karni ho
    window.location.reload();
    };

  return (
    // Background mein soft gradient add kiya hai professional look ke liye
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tight">
            Dash<span className="text-indigo-600">Board</span>
          </h1>
          <p className="text-slate-500 font-medium text-large">Welcome back, {userData.name} 👋</p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
            <Bell size={20} />
          </button>
          <button className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Card */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-8 flex flex-col items-center sticky top-12">
            <div className="w-full flex items-center justify-between text-slate-800 font-bold mb-8 px-2">
              <span className="flex items-center gap-2 text-sm"><User size={16} /> Profile</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>

            {/* Avatar Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-28 h-28 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl mb-6 border-4 border-white">
                <GraduationCap size={50} className="text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 leading-tight mt-2">{userData.name}</h2>
            <p className="text-slate-400 text-sm font-medium mb-8">{userData.email}</p>

            <div className="w-full space-y-3 mb-8">
              <div className="w-full bg-indigo-50/50 rounded-2xl py-4 px-4 flex items-center gap-3 text-indigo-600 border border-indigo-100/50">
                <div className="bg-white p-2 rounded-xl shadow-sm"><GraduationCap size={18} /></div>
                <span className="font-bold text-sm tracking-wide">{userData.role}</span>
              </div>
            </div>

            <button 
            onClick={handleLogout} 
            className="w-full group py-4 px-4 flex items-center justify-center gap-3 text-slate-400 font-bold text-sm border-t border-slate-50 hover:text-red-500 transition-all mt-auto outline-none"
            >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Area */}
        <div className="lg:col-span-9 space-y-2">
          
          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<BookOpen size={20}/>} label="Applications" value="00" color="bg-blue-500" />
            <StatCard icon={<Clock size={20}/>} label="Pending" value="00" color="bg-orange-500" />
            <StatCard icon={<LayoutDashboard size={20}/>} label="Admissions" value="00" color="bg-green-500" />
          </div>

          {/* Main Action Area */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 min-h-[400px] flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100">
                <LayoutDashboard size={40} className="text-slate-300" />
             </div>
             <h3 className="text-xl font-bold text-slate-800">No Recent Activity</h3>
             <p className="text-slate-400 max-w-xs mt-2 font-medium">Your admission activities and AI career insights will appear here once you apply.</p>
             <button className="mt-8 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
               Apply Now
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:border-indigo-100 transition-all">
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default UserDashboard;