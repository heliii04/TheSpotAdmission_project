import React, { useEffect, useState } from 'react';
import axiosInstance from "../../api/Api";
import { Eye, Trash2, Search, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminApplicationTable = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. Saare API endpoints ko ek saath call kar rahe hain
        const [careerRes, counselingRes, admissionRes, contactRes, userRes, personalizedRes] = await Promise.all([
          axiosInstance.get("/careerform"),
          axiosInstance.get("/counselingform"),
          axiosInstance.get("/admissionform"),
          axiosInstance.get("/contact"),
          axiosInstance.get("/auth/users"),
          axiosInstance.get("/personalizedcounselingform")
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
          displayName: item.fullName || item.sname || item.name || item.studentName,
          displayEmail: item.email || item.semail || item.studentEmail
        }));

        const personalizedData = (personalizedRes.data.data || personalizedRes.data).map((item: any) => ({
          ...item,
          formType: "Personal Counseling",
          displayId: item._id,
          displayName: item.fullName || item.name,
          displayEmail: item.email
        }));

        const contactData = (contactRes.data.data || contactRes.data).map((item: any) => ({
          ...item,
          formType: "Contact",
          displayId: item._id,
          displayName: item.name || item.fullName,
          displayEmail: item.email
        }));

        const userData = (userRes.data.data || userRes.data).map((item: any) => ({
          ...item,
          formType: "User/Student",
          displayId: item._id,
          displayName: item.name,
          displayEmail: item.email,
          isUser: true
        }));

        // 3. Sabko ek single array mein merge kar diya
        const mergedData = [...careerData, ...counselingData, ...admissionData, ...contactData, ...userData, ...personalizedData];

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
    app.displayEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.formType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApps.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
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
              {currentItems.length > 0 ? currentItems.map((app: any) => (
                <tr key={`${app.formType}-${app._id}`} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100">
                        {app.displayName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{app.displayName}</p>
                        <p className="text-[10px] text-slate-400 font-medium">ID: {app._id?.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="text-sm font-semibold text-slate-600">{app.displayEmail}</p>
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${app.formType === 'Career' ? 'bg-purple-100 text-purple-600' :
                        app.formType === 'Admission' ? 'bg-blue-100 text-blue-600' :
                          app.formType === 'Contact' ? 'bg-pink-100 text-pink-600' :
                            app.formType === 'Personal Counseling' ? 'bg-yellow-100 text-yellow-600' :
                              app.formType === 'User/Student' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
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
                  <td colSpan={5} className="p-20 text-center text-slate-400 font-medium">
                    No data found in global database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredApps.length)}</span> of <span className="text-slate-900 font-bold">{filteredApps.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                    currentPage === i + 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplicationTable;