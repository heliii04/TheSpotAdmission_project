import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { FaEdit, FaTrash, FaUserTie, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const CareerTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [editData, setEditData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/careerform");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axiosInstance.delete(`/careerform/${id}`);
      fetchData();
      toast.success("Record deleted successfully!");
    } catch (error) {
      console.log("Error deleting record:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axiosInstance.put(`/careerform/${editData._id}`, editData);
      setEditData(null);
      fetchData();
      toast.success("Information updated!");
    } catch (error) {
      console.log("Error updating record:", error);
    }
  };

  const handleAppoint = async (student: any) => {
    try {
      const counsellorName = prompt("Enter Counsellor Name:");
      const counsellorContact = prompt("Enter Counsellor Contact:");

      if (!counsellorName || !counsellorContact) {
        toast.error("Counsellor details are required!");
        return;
      }

      const response = await axiosInstance.post("/appoint-counsellor", {
        userEmail: student.email || student.semail,
        userName: student.fullName || student.sname,
        counsellorName: counsellorName,
        counsellorContact: counsellorContact
      });

      if (response.status === 200) {
        toast.success(`Mail sent to ${student.fullName || student.sname} successfully!`);
      }
    } catch (error) {
      toast.error("Failed to appoint counsellor.");
    }
  };

  const filtered = data.filter((item) =>
    (item.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * limit, page * limit);

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
                {paginated.length > 0 ? (
                  paginated.map((item) => (
                    <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors group text-center">
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-xs text-indigo-500 font-bold uppercase tracking-tighter">ID: {item._id.slice(-6)}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-lg">{item.fullName || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col items-center">
                          <span className="text-slate-600 font-medium">{item.email || "N/A"}</span>
                          <span className="text-slate-400 text-sm">{item.contact || "No Contact"}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleAppoint(item)}
                            className="p-3 bg-white border border-slate-100 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200 transition-all"
                            title="Appoint Counsellor"
                          >
                            <FaUserTie size={18} />
                          </button>
                          <button
                            onClick={() => setEditData(item)}
                            className="p-3 bg-white border border-slate-100 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white hover:shadow-lg hover:shadow-amber-200 transition-all"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-3 bg-white border border-slate-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200 transition-all"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-20 text-center text-slate-400 font-medium">No records found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER / PAGINATION */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-bold">
              Showing <span className="text-slate-800">{paginated.length}</span> of <span className="text-slate-800">{filtered.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft size={12} /> Prev
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
                disabled={page * limit >= filtered.length}
                onClick={() => setPage(page + 1)}
              >
                Next <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL - MODERNIZED */}
      {editData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex justify-center items-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-white">
            <h2 className="text-3xl font-black mb-2 text-slate-800">Edit Profile</h2>
            <p className="text-slate-400 mb-8 font-medium">Modify the student's primary information below.</p>

            <div className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block group-focus-within:text-indigo-500">Full Name</label>
                <input
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block group-focus-within:text-indigo-500">Email Address</label>
                <input
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block group-focus-within:text-indigo-500">Contact Number</label>
                <input
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700"
                  value={editData.contactNumber}
                  onChange={(e) => setEditData({ ...editData, contactNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                className="flex-1 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all"
                onClick={() => setEditData(null)}
              >
                DISCARD
              </button>
              <button
                className="flex-2 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                onClick={handleSaveEdit}
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTable;