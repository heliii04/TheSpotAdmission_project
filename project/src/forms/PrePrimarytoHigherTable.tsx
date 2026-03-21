import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { Edit, Trash2, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrePrimaryTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/preprimaryform");
      // Debugging ke liye console zaroor check karein
      console.log("Full API Response:", res.data);

      // Aapka data handle karne ka sabse safe tarika
      let responseData = [];
      if (Array.isArray(res.data)) {
        responseData = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        responseData = res.data.data;
      }

      setData(responseData);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load records!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE Function with Toast
  const handleDelete = async (id: string) => {
    if (!window.confirm("Kya aap sach mein ye record delete karna chahte hain?")) return;
    try {
      await axiosInstance.delete(`/preprimaryform/${id}`);
      toast.success("Record deleted successfully!");
      fetchData(); // List refresh karein
    } catch (err) {
      toast.error("Delete karne mein error aaya!");
    }
  };

  // Filter Logic matching your Form keys (sname, semail)
  const filtered = data.filter((item) => {
    const searchLower = search.toLowerCase();
    const studentName = item?.sname ? String(item.sname).toLowerCase() : "";
    const studentEmail = item?.semail ? String(item.semail).toLowerCase() : "";
    return studentName.includes(searchLower) || studentEmail.includes(searchLower);
  });

  const totalPages = Math.ceil(filtered.length / recordsPerPage);
  const paginated = filtered.slice((page - 1) * recordsPerPage, page * recordsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-white overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 md:p-12 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Student <span className="text-indigo-600">Enquiries</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Database: {filtered.length} Entries
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl outline-none font-bold text-sm transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-black tracking-[0.2em]">
                <th className="p-6 text-center">ID</th>
                <th className="p-6 text-left">Student Details</th>
                <th className="p-6 text-left">Contact Info</th>
                <th className="p-6 text-left">Parents</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-32 text-center">
                    <Loader2 className="animate-spin mx-auto text-indigo-500 mb-4" size={40} />
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Fetching Data...</span>
                  </td>
                </tr>
              ) : paginated.length > 0 ? (
                paginated.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-indigo-50/40 transition-all duration-300 group">
                    <td className="p-6 text-center text-xs font-black text-slate-200 group-hover:text-indigo-200">
                      {String((page - 1) * recordsPerPage + index + 1).padStart(2, '0')}
                    </td>
                    
                    <td className="p-6">
                      <div className="font-black text-slate-800 text-lg tracking-tight capitalize">
                        {item.sname || "Unknown"}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] font-bold px-3 py-1 bg-indigo-600 text-white rounded-full">
                          {item.class || "N/A"}
                        </span>
                        <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                          {item.board || "---"}
                        </span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="text-sm font-black text-slate-700">{item.scontact || "No Contact"}</div>
                      <div className="text-xs font-medium text-slate-400 mt-1 lowercase">{item.semail || "No Email"}</div>
                    </td>

                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-slate-500">
                          <span className="text-indigo-300 mr-1">F:</span> {item.fatherName || "---"}
                        </p>
                        <p className="text-[11px] font-bold text-slate-500">
                          <span className="text-pink-300 mr-1">M:</span> {item.motherName || "---"}
                        </p>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button className="p-3 text-indigo-500 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-3 text-red-400 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-40 text-center">
                    <div className="text-slate-200 font-black text-5xl uppercase italic tracking-tighter opacity-50">
                      Empty List
                    </div>
                    <p className="text-slate-400 text-sm font-bold mt-4 uppercase">No matching records found in our system</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination */}
        <div className="p-8 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            Showing Page {page} <span className="mx-2 text-slate-200">|</span> Total {totalPages || 1}
          </div>
          
          <div className="flex gap-4">
            <button 
              disabled={page === 1} 
              onClick={() => { setPage(page - 1); window.scrollTo(0,0); }}
              className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-600 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:pointer-events-none transition-all font-black text-xs shadow-sm"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> PREV
            </button>
            <button 
              disabled={page >= totalPages} 
              onClick={() => { setPage(page + 1); window.scrollTo(0,0); }}
              className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-30 disabled:pointer-events-none transition-all font-black text-xs shadow-lg shadow-indigo-100"
            >
              NEXT <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePrimaryTable;