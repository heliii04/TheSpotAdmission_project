import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  User, GraduationCap, LogOut, LayoutDashboard, 
  Bell, BookOpen, Clock, Search, Eye, Trash2, ShieldCheck, Users, UserPlus
} from 'lucide-react';
import axiosInstance from '../../api/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Note: AdminApplicationTable ab is page par nahi, alag route par dikhega.

const UserDashboard = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "Guest",
    email: localStorage.getItem("userEmail") || "Not Logged In",
    role: (localStorage.getItem("userRole") || "Student").toLowerCase(),
    phone: localStorage.getItem("userPhone") || "",
    _id: localStorage.getItem("userId") || ""
  });

  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [admissionProgress, setAdmissionProgress] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [activeTab, setActiveTab] = useState("explorer"); // NEW: "explorer" | "team"
  const [teamFormData, setTeamFormData] = useState({ name: "", email: "", role: "counsellor", phone: "" });
  const [isSubmittingTeam, setIsSubmittingTeam] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const handleDelete = async (id: string, type: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type} record?`)) return;
    try {
      let endpoint = "";
      if (type === "Career") endpoint = `/careerform/${id}`;
      else if (type === "Counseling") endpoint = `/counselingform/${id}`;
      else if (type === "Admission") endpoint = `/admissionform/${id}`;
      else if (type === "Contact") endpoint = `/contact/${id}`;
      else if (type === "User/Student") endpoint = `/auth/users/${id}`;
      else if (type === "Personal Counseling") endpoint = `/personalizedcounselingform/${id}`;

      if (endpoint) {
        await axiosInstance.delete(endpoint);
        setApplications(prev => prev.filter(app => app._id !== id));
        toast.success(`${type} record deleted successfully`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete record.");
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await axiosInstance.put(`/auth/users/${userId}/role`, { role: newRole });
      setApplications(prev => prev.map(app => 
        (app._id === userId && app.formType === "User/Student") ? { ...app, role: newRole } : app
      ));
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Update role failed:", error);
      toast.error("Failed to update user role.");
    }
  };

  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamFormData.name || !teamFormData.email) return toast.warning("Please fill required fields.");
    
    try {
      setIsSubmittingTeam(true);
      const res = await axiosInstance.post("/auth/add-team", teamFormData);
      toast.success(res.data.message);
      setTeamFormData({ name: "", email: "", role: "counsellor", phone: "" });
      // Refresh list to show new team member
      window.location.reload(); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add team member.");
    } finally {
      setIsSubmittingTeam(false);
    }
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: userData.name,
    phone: userData.phone || "",
    password: ""
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/auth/profile", editFormData);
      const data = res.data;
      // Update local storage and state
      if (data.token) localStorage.setItem("token", data.token);
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
      
      const updatedUser = { 
        ...userData, 
        name: data.name, 
        phone: data.phone 
      };

      setUserData(updatedUser);
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  React.useEffect(() => {
    if (userData.role === "admin" || userData.role === "counsellor") {
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
    } else if (userData.role === "student") {
      const fetchProgress = async () => {
        try {
          setLoadingProgress(true);
          const res = await axiosInstance.get(`/admissionform/my-status/${userData.email}`);
          setAdmissionProgress(res.data.progress);
        } catch (error) {
          console.error("Error fetching progress:", error);
        } finally {
          setLoadingProgress(false);
        }
      };
      fetchProgress();
    }
  }, [userData.role, userData.email]);

  const filteredApps = applications.filter((app: any) =>
    app.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.displayEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.formType?.toLowerCase().includes(searchTerm.toLowerCase())
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

            {isEditingProfile ? (
              <form onSubmit={handleUpdateProfile} className="w-full space-y-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Display Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Phone Number</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1">New Password (Optional)</label>
                  <input 
                    type="password" 
                    placeholder="Leave blank to keep current"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={editFormData.password}
                    onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">Save</button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="text-center w-full mb-8">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{userData.name}</h2>
                  <p className="text-slate-400 text-xs font-semibold mt-1 break-all px-2">{userData.email}</p>
                </div>

                <div className="w-full bg-slate-50 rounded-2xl py-4 px-4 flex items-center justify-center gap-3 border border-slate-100 mb-4">
                  <LayoutDashboard size={18} className="text-indigo-600" />
                  <span className="font-black text-xs uppercase tracking-widest text-slate-600">{userData.role}</span>
                </div>

                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full py-2 mb-8 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
                >
                  Edit Profile
                </button>
              </>
            )}

            {userData.role === "admin" && (
              <div className="w-full space-y-2 mb-8 border-b border-slate-50 pb-8">
                <button 
                  onClick={() => setActiveTab("explorer")}
                  className={`w-full py-3 px-4 flex items-center gap-3 rounded-xl font-bold text-sm transition-all ${activeTab === "explorer" ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 border border-transparent hover:bg-slate-50'}`}
                >
                  <BookOpen size={18} />
                  <span>Data Explorer</span>
                </button>
                <button 
                  onClick={() => setActiveTab("team")}
                  className={`w-full py-3 px-4 flex items-center gap-3 rounded-xl font-bold text-sm transition-all ${activeTab === "team" ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 border border-transparent hover:bg-slate-50'}`}
                >
                  <Users size={18} />
                  <span>Manage Team</span>
                </button>
              </div>
            )}

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
          {userData.role === "student" ? (
             <StudentDashboardView 
                loadingProgress={loadingProgress}
                admissionProgress={admissionProgress}
             />
          ) : (
            activeTab === "team" ? (
              <TeamManagementView 
                teamFormData={teamFormData}
                setTeamFormData={setTeamFormData}
                handleAddTeamMember={handleAddTeamMember}
                isSubmittingTeam={isSubmittingTeam}
                applications={applications}
              />
            ) : (
              <AdminDashboardView 
                applications={applications}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                tableLoading={tableLoading}
                filteredApps={filteredApps}
                userData={userData}
                handleUpdateRole={handleUpdateRole}
                handleDelete={handleDelete}
              />
            )
          )}
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENT: ADMIN EXPLORER ---
const AdminDashboardView = ({ 
  applications, searchTerm, setSearchTerm, tableLoading, filteredApps, userData, handleUpdateRole, handleDelete 
}: any) => (
  <div className="lg:col-span-9 space-y-8 animate-in fade-in duration-500">
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard icon={<BookOpen size={20}/>} label="Total Entries" value={applications.length.toString()} color="bg-blue-500" />
      <StatCard icon={<Clock size={20}/>} label="Users" value={applications.filter((a:any) => a.formType === "User/Student").length.toString()} color="bg-green-500" />
      <StatCard icon={<LayoutDashboard size={20}/>} label="Applications" value={applications.filter((a:any) => ["Career", "Counseling", "Admission"].includes(a.formType)).length.toString()} color="bg-indigo-500" />
      <StatCard icon={<Bell size={20}/>} label="Contacts" value={applications.filter((a:any) => a.formType === "Contact").length.toString()} color="bg-pink-500" />
    </div>

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
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Role</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tableLoading ? (
              <tr><td colSpan={5} className="p-12 text-center text-slate-400 animate-pulse">Loading master records...</td></tr>
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
                     {app.formType === "User/Student" && userData.role === "admin" ? (
                       <select 
                         value={app.role || "student"} 
                         onChange={(e) => handleUpdateRole(app._id, e.target.value)}
                         className="bg-slate-50 border-none text-[10px] font-bold text-slate-500 rounded p-1 focus:ring-1 focus:ring-indigo-500"
                       >
                         <option value="student">STUDENT</option>
                         <option value="parent">PARENT</option>
                         <option value="counsellor">COUNSELLOR</option>
                         <option value="admin">ADMIN</option>
                       </select>
                     ) : (
                       <span className="text-[11px] font-bold text-slate-500 uppercase">{app.role || 'User'}</span>
                     )}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Active</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      title="View Details"
                      className="p-2 text-slate-300 hover:text-indigo-600 transition-all"
                    >
                      <Eye size={16} />
                    </button>
                    {(userData.role === "admin") && (
                      <button 
                        title="Delete Record"
                        onClick={() => handleDelete(app._id, app.formType)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
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

// --- SUB-COMPONENT: TEAM MANAGEMENT ---
const TeamManagementView = ({ teamFormData, setTeamFormData, handleAddTeamMember, isSubmittingTeam, applications }: any) => (
  <div className="lg:col-span-9 space-y-8 animate-in slide-in-from-right duration-500">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 font-black">
            <UserPlus size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Add Team Member</h3>
        </div>
        <form onSubmit={handleAddTeamMember} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Full Name</label>
            <input 
              type="text" placeholder="e.g. John Doe" required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={teamFormData.name} onChange={e => setTeamFormData({...teamFormData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Email Address</label>
            <input 
              type="email" placeholder="staff@example.com" required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={teamFormData.email} onChange={e => setTeamFormData({...teamFormData, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Role</label>
               <select 
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm"
                 value={teamFormData.role} onChange={e => setTeamFormData({...teamFormData, role: e.target.value})}
               >
                 <option value="counsellor">Counsellor</option>
                 <option value="admin">Admin</option>
               </select>
             </div>
             <div>
               <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Phone</label>
                <input 
                  type="text" placeholder="Optional"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  value={teamFormData.phone} onChange={e => setTeamFormData({...teamFormData, phone: e.target.value})}
                />
             </div>
          </div>
          <button 
            type="submit" disabled={isSubmittingTeam}
            className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-xl font-black shadow-lg hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            <span>{isSubmittingTeam ? "Adding..." : "Confirm & Send Credentials"}</span>
          </button>
        </form>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
        <ShieldCheck size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4 leading-tight">Secure Staff<br />Induction</h3>
          <p className="text-slate-400 font-medium mb-8 leading-relaxed">Inducted team members will receive a secure temporary password (8-15 characters with symbols) via email. They will gain immediate access to administrative controls based on the assigned role.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Team</p>
                <p className="text-xl font-black">{applications.filter((a:any) => ["admin", "counsellor"].includes(a.role)).length} Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- SUB-COMPONENT: STUDENT VIEW ---
const StudentDashboardView = ({ loadingProgress, admissionProgress }: any) => (
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
        {loadingProgress ? (
          <p className="text-slate-400 animate-pulse text-sm font-medium">Updating admission status...</p>
        ) : admissionProgress.length > 0 ? (
          admissionProgress.map((step: any, idx: number) => (
            <StepItem 
              key={idx}
              label={step.label} 
              status={step.status} 
              date={step.date && step.date !== "--" && step.date !== "Waiting" ? new Date(step.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : step.date} 
              done={step.done} 
            />
          ))
        ) : (
          <>
            <StepItem label="Profile Setup" status="Completed" date="Pending" done={true} />
            <StepItem label="Document Verification" status="Pending" date="Waiting" done={false} />
            <StepItem label="Final Admission" status="Locked" date="--" done={false} />
          </>
        )}
      </div>
    </div>
  </div>
);

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