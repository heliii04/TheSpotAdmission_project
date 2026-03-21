import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { FaEdit, FaTrash, FaUserTie } from "react-icons/fa"; // FaUserTie icon add karyu che
import { ToastContainer, toast } from "react-toastify";

const CollegeAdmissionTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [editData, setEditData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/admissionform");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axiosInstance.delete(`/admissionform/${id}`);
      fetchData();
      toast.success("Record deleted!");
    } catch (error) {
      console.log("Error deleting record:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axiosInstance.put(`/admissionform/${editData._id}`, editData);
      setEditData(null);
      fetchData();
      toast.success("Updated successfully!");
    } catch (error) {
      console.log("Error updating record:", error);
    }
  };

  // --- Appoint Counsellor Function ---
  const handleAppoint = async (student: any) => {
    try {
      const counsellorName = prompt("Enter Counsellor Name:");
      const counsellorContact = prompt("Enter Counsellor Contact:");

      if (!counsellorName || !counsellorContact) {
        toast.error("Counsellor details are required!");
        return;
      }

      const response = await axiosInstance.post("/appoint-counsellor", {
        userEmail: student.email || student.semail, // Backend field mujab email check karo
        userName: student.fullName || student.sname,
        counsellorName: counsellorName,
        counsellorContact: counsellorContact
      });

      if (response.status === 200) {
        toast.success(`Mail sent to ${student.fullName || student.sname} successfully!`);
      }
    } catch (error) {
      console.error("Error sending mail:", error);
      toast.error("Failed to appoint counsellor.");
    }
  };

  const filtered = data.filter((item) =>
    (item.fullName || "").toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-4 sm:p-6">
      <ToastContainer position="top-right" />

      {/* SEARCH INPUT */}
      <input
        className="border p-2 mb-4 rounded w-full sm:w-1/2 md:w-1/3 outline-none focus:border-indigo-500"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-indigo-600 text-white text-center uppercase">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Contact</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item) => (
              <tr key={item._id} className="text-center hover:bg-gray-50 transition-colors">
                <td className="border p-3 font-medium">{item.fullName || "N/A"}</td>
                <td className="border p-3 break-words">{item.email || "N/A"}</td>
                <td className="border p-3">{item.contactNumber || "N/A"}</td>

                <td className="border p-3">
                  <div className="flex justify-center items-center gap-3">
                    {/* Appoint & Mail Button - Table ma sachi jagya */}
                    <button
                      onClick={() => handleAppoint(item)}
                      title="Appoint Counsellor"
                      className="text-indigo-600 hover:text-indigo-800 text-xl transition-all p-1"
                    >
                      <FaUserTie />
                    </button>

                    <button
                      onClick={() => setEditData(item)}
                      title="Edit"
                      className="text-yellow-500 hover:text-yellow-600 text-xl p-1"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700 text-xl p-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg disabled:opacity-50 border border-indigo-100 hover:bg-indigo-100 transition-all"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="flex items-center font-bold text-gray-600">Page {page}</span>

        <button
          className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg disabled:opacity-50 border border-indigo-100 hover:bg-indigo-100 transition-all"
          disabled={page * limit >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            <h2 className="text-2xl font-black mb-6 text-center text-indigo-700">Update Record</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Full Name</label>
                <input
                  className="border w-full p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Email</label>
                <input
                  className="border w-full p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Contact</label>
                <input
                  className="border w-full p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={editData.contactNumber}
                  onChange={(e) => setEditData({ ...editData, contactNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeAdmissionTable;