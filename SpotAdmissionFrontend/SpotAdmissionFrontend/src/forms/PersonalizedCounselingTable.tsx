import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { FaEdit, FaTrash, FaUserTie, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const PersonalizedCounselingTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/personalizedcounselingform");
      const finalData = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.data) ? res.data.data : []);
      setData(finalData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleEditSave = async () => {
    try {
      await axiosInstance.put(`/personalizedcounselingform/${editData._id}`, editData);
      setEditData(null);
      fetchData();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axiosInstance.delete(`/personalizedcounselingform/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filtered = data.filter((item) =>
    item.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * recordsPerPage;
  const paginated = filtered.slice(start, start + recordsPerPage);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto"> 
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Admissions</h1>
            <p className="text-slate-500 font-medium">Manage and review all incoming applications</p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
               />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">ID</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Student Details</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Contact Info</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors group text-center">
                    <td className="p-5">
                      <div></div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            ID: {item._id.slice(-6).toUpperCase()}
                        </span>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-slate-700 text-sm">{item.fullName}</p>
                    </td>
                    <td className="p-5">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-600">{item.email}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.contact || "No Contact"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        {/* APPOINT COUNSELLOR / VIEW */}
                        <button 
                          title="Appoint Counsellor"
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
                        >
                          <FaUserTie size={16} />
                        </button>
                        
                        {/* EDIT */}
                        <button 
                          onClick={() => setEditData(item)}
                          className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-all shadow-sm border border-orange-100"
                        >
                          <FaEdit size={16} />
                        </button>

                        {/* DELETE */}
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {paginated.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-400 font-medium text-sm">No student records found.</p>
            </div>
          )}

          {/* PAGINATION FOOTER */}
          <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{paginated.length}</span> results
            </p>
            <div className="flex gap-2">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 shadow-sm"
              >
                <FaChevronLeft size={16} />
              </button>
              <button 
                disabled={start + recordsPerPage >= filtered.length} 
                onClick={() => setPage(page + 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 shadow-sm"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editData && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200 relative">
              <button onClick={() => setEditData(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"> </button>
              
              <h3 className="text-lg font-bold text-slate-800 mb-5">Edit Record</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Full Name</label>
                  <input
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-sm font-semibold text-slate-700"
                    value={editData.fullName}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Email Address</label>
                  <input
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-sm font-semibold text-slate-700"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleEditSave}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
                >
                  Update Student
                </button>
                <button
                  onClick={() => setEditData(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedCounselingTable;