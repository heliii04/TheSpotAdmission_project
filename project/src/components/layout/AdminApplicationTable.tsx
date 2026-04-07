import React, { useEffect, useState } from 'react';
import axiosInstance from "../../api/Api";
import { Eye, Trash2, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminApplicationTable = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // 1. Saare API endpoints ko ek saath call kar rahe hain
        const [careerRes, counselingRes, admissionRes] = await Promise.all([
          axiosInstance.get("/careerform"),
          axiosInstance.get("/personalCounselling"),
          axiosInstance.get("/collegeadmission") // Aapke actual endpoints yahan likhein
        ]);

        // 2. Har data ko pehchanne ke liye 'formType' tag add kar rahe hain
        const careerData = (careerRes.data.data || careerRes.data).map((item: any) => ({
          ...item,
          formType: "Career",
          displayId: item._id,
          displayName: item.fullName || item.sname, // Backend fields ke hisab se adjust karein
          displayEmail: item.email || item.semail
        }));

        const counselingData = (counselingRes.data.data || counselingRes.data).map((item: any) => ({
          ...item,
          formType: "Counseling",
          displayId: item._id,
          displayName: item.fullName || item.sname,
          displayEmail: item.email || item.semail
        }));

        const admissionData = (admissionRes.data.data || admissionRes.data).map((item: any) => ({
          ...item,
          formType: "Admission",
          displayId: item._id,
          displayName: item.fullName || item.sname,
          displayEmail: item.email || item.semail
        }));

        // 3. Sabko ek single array mein merge kar diya
        const mergedData = [...careerData, ...counselingData, ...admissionData];
        
        // Date ke basis par sort karein (agar created_at field ho)
        setApplications(mergedData);
      } catch (error) {
        console.error("Error fetching merged applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filteredApps = applications.filter((app: any) =>
    app.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.displayEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-bold">Loading merged database...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/dashboard")}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          <div>
            <h3 className="text-2xl font-black text-slate-800">Recent All Applications</h3>
            <p className="text-slate-400 text-sm font-medium">Unified view of all counseling and admission forms</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or form type..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Student Name</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Email</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Form Type</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApps.length > 0 ? filteredApps.map((app: any) => (
                <tr key={`${app.formType}-${app._id}`} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100">
                        {app.displayName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{app.displayName}</p>
                        <p className="text-xs text-slate-400 font-medium">{app.displayEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      app.formType === 'Career' ? 'bg-purple-100 text-purple-600' :
                      app.formType === 'Admission' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {app.formType}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-xs font-bold text-slate-600">Pending Review</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-[-10px]">
                      <button className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:shadow-md transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-400 font-medium">
                    No data found in global database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationTable;