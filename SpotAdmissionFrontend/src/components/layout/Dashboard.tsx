import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  User, GraduationCap, LogOut, LayoutDashboard, 
  Bell, BookOpen, Clock, Search, Eye, Trash2
} from 'lucide-react';
import axiosInstance from '../../api/Api';

// Note: AdminApplicationTable ab is page par nahi, alag route par dikhega.

const UserDashboard = () => {
  const navigate = useNavigate();

  const [userData] = useState({
    name: localStorage.getItem("userName") || "Guest",
    email: localStorage.getItem("userEmail") || "Not Logged In",
    role: (localStorage.getItem("userRole") || "Student").toLowerCase()
  });

  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableLoading, setTableLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  React.useEffect(() => {
    if (userData.role === "admin") {
      const fetchAllData = async () => {
        try {
          setTableLoading(true);
          const [careerRes, counselingRes, admissionRes, contactRes, userRes, personalizedRes] = await Promise.all([
            axiosInstance.get("/careerform"),
            axiosInstance.get("/counselingform"),
            axiosInstance.get("/admissionform"),
            axiosInstance.get("/contact"),
            axiosInstance.get("/auth/users"),
            axiosInstance.get("/personalizedcounselingform")
          ]);

          const careerData = (careerRes.data.data || careerRes.data).map((item: any) => ({
            ...item,
            formType: "Career",
            displayName: item.fullName || item.sname,
            displayEmail: item.email || item.semail
          }));

          const counselingData = (counselingRes.data.data || counselingRes.data).map((item: any) => ({
            ...item,
            formType: "Counseling",
            displayName: item.fullName || item.sname,
            displayEmail: item.email || item.semail
          }));

          const admissionData = (admissionRes.data.data || admissionRes.data).map((item: any) => ({
            ...item,
            formType: "Admission",
            displayName: item.fullName || item.sname || item.name || item.studentName,
            displayEmail: item.email || item.semail || item.studentEmail
          }));

          const personalizedData = (personalizedRes.data.data || personalizedRes.data).map((item: any) => ({
            ...item,
            formType: "Personal Counseling",
            displayName: item.fullName || item.name,
            displayEmail: item.email
          }));

          const contactData = (contactRes.data.data || contactRes.data).map((item: any) => ({
            ...item,
            formType: "Contact",
            displayName: item.name || item.fullName,
            displayEmail: item.email
          }));

          const userDataList = (userRes.data.data || userRes.data).map((item: any) => ({
            ...item,
            formType: "User/Student",
            displayName: item.name,
            displayEmail: item.email
          }));

          setApplications([...careerData, ...counselingData, ...admissionData, ...contactData, ...userDataList, ...personalizedData]);
        } catch (error) {
          console.error("Error fetching admin data:", error);
        } finally {
          setTableLoading(false);
        }
      };
      fetchAllData();
    }
  }, [userData.role]);

  const filteredApps = applications.filter((app: any) =>
    app.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.displayEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.formType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- SUB-COMPONENT: ADMIN VIEW ---
  const AdminDashboardView = () => (
    <div className="lg:col-span-9 space-y-8 animate-in fade-in duration-500">
      
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<BookOpen size={20}/>} label="Total Entries" value={applications.length.toString()} color="bg-blue-500" />
        <StatCard icon={<Clock size={20}/>} label="Users" value={applications.filter(a => a.formType === "User/Student").length.toString()} color="bg-green-500" />
        <StatCard icon={<LayoutDashboard size={20}/>} label="Applications" value={applications.filter(a => ["Career", "Counseling", "Admission"].includes(a.formType)).length.toString()} color="bg-indigo-500" />
        <StatCard icon={<Bell size={20}/>} label="Contacts" value={applications.filter(a => a.formType === "Contact").length.toString()} color="bg-pink-500" />
      </div>

      {/* Unified Data Table Card */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Master Data Explorer</h3>
            <p className="text-slate-400 text-sm font-medium">Viewing all students, applications, and inquiries</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search everything..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Name / Email</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableLoading ? (
                <tr><td colSpan={4} className="p-12 text-center text-slate-400 animate-pulse">Loading master records...</td></tr>
              ) : filteredApps.length > 0 ? filteredApps.map((app: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm">{app.displayName || "Unknown"}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{app.displayEmail}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      app.formType === 'Career' ? 'bg-purple-50 text-purple-600' :
                      app.formType === 'Admission' ? 'bg-blue-50 text-blue-600' : 
                      app.formType === 'Contact' ? 'bg-pink-50 text-pink-600' :
                      app.formType === 'Personal Counseling' ? 'bg-yellow-50 text-yellow-600' :
                      app.formType === 'User/Student' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {app.formType}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      <span className="text-[11px] font-bold text-slate-500">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-12 text-center text-slate-400">No records found matching your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- SUB-COMPONENT: STUDENT VIEW ---
  const StudentDashboardView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Complete your profile</h2>
          <p className="text-indigo-100 mb-6 max-w-sm">Apply to your dream colleges and track your admission status in real-time.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black hover:bg-indigo-50 transition-all shadow-lg">
            Start Application
          </button>
        </div>
        <GraduationCap size={150} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Clock size={18} className="text-indigo-600" /> My Admission Progress
        </h3>
        <div className="space-y-6">
          <StepItem label="Profile Setup" status="Completed" date="24 Mar 2026" done={true} />
          <StepItem label="Document Verification" status="Pending" date="Waiting" done={false} />
          <StepItem label="Final Admission" status="Locked" date="--" done={false} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tight leading-none">
            Dash<span className="text-indigo-600">Board</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2 capitalize">Welcome back, {userData.name} 👋</p>
        </div>
        <div className="flex gap-4">
          <button className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
            <Bell size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Card */}
        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col items-center sticky top-12 transition-all hover:shadow-2xl">
            <div className="w-full flex items-center justify-between mb-8 px-1">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <User size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Profile</span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-bold text-green-600 uppercase">Live</span>
              </div>
            </div>

            <div className="relative mb-6 group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-20 blur-md transition-all"></div>
              <div className="relative w-28 h-28 bg-white rounded-full p-1">
                <div className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white text-white shadow-xl">
                  <GraduationCap size={44} />
                </div>
              </div>
            </div>

            <div className="text-center w-full mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{userData.name}</h2>
              <p className="text-slate-400 text-xs font-semibold mt-1 break-all px-2">{userData.email}</p>
            </div>

            <div className="w-full bg-slate-50 rounded-2xl py-4 px-4 flex items-center justify-center gap-3 border border-slate-100 mb-8">
              <LayoutDashboard size={18} className="text-indigo-600" />
              <span className="font-black text-xs uppercase tracking-widest text-slate-600">{userData.role}</span>
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full py-4 flex items-center justify-center gap-3 text-slate-400 font-bold text-sm border-t border-slate-50 hover:text-red-500 transition-all"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Logic based on role */}
        <div className="lg:col-span-9">
          {userData.role === "admin" ? <AdminDashboardView /> : <StudentDashboardView />}
        </div>

      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:border-indigo-100 transition-all">
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>{icon}</div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const StepItem = ({ label, status, date, done }: any) => (
  <div className="flex items-center gap-4">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
      <div className={`w-3 h-3 rounded-full ${done ? 'bg-green-600' : 'bg-slate-300'}`}></div>
    </div>
    <div className="flex-1">
      <p className={`font-bold text-sm ${done ? 'text-slate-800' : 'text-slate-400'}`}>{label}</p>
      <p className="text-xs text-slate-400">{status}</p>
    </div>
    <span className="text-xs font-bold text-slate-300 uppercase">{date}</span>
  </div>
);

export default UserDashboard;