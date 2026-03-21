import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";

const PersonalizedCounselingTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        "/personalizedcounselingform"
      );

      // FIX: Always use array
      const finalData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setData(finalData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleEditSave = async () => {
    try {
      await axiosInstance.put(
        `/personalizedcounselingform/${editData._id}`,
        editData
      );
      setEditData(null);
      fetchData();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/personalizedcounselingform/${id}`);
      fetchData(); // Refresh table
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
    <div className="p-6 max-w-5xl mx-auto">
      

      <input
        placeholder="Search by name"
        className="border p-2 rounded mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-primary-600 text-white uppercase text-left">
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.fullName}</td>
              <td className="border p-2">{item.contact}</td>
              <td className="border p-2">{item.email}</td>

              <td className="border p-2 space-x-2">
                {/* EDIT BUTTON */}
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => setEditData(item)}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paginated.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-3">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button
          disabled={start + recordsPerPage >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Edit Record</h3>

            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              className="border p-2 w-full mb-4 rounded"
              name="fullName"
              value={editData.fullName}
              onChange={(e) =>
                setEditData({ ...editData, fullName: e.target.value })
              }
            />

            <button
              onClick={handleEditSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditData(null)}
              className="ml-3 bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedCounselingTable;
