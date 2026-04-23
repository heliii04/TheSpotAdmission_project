import axiosInstance from "../api/Api";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CounselingTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all data
  const fetchData = () => {
    axiosInstance
      .get("/counselingform")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit button click
  const openEditModal = (item: any) => {
    setEditingItem(item);
    setEditForm(item);
    setIsModalOpen(true);
  };

  // Update state when input changes
  const handleEditChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save updated data
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/counselingform/${editingItem._id}`,
        editForm
      );

      alert("Updated successfully!");
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error updating data.");
    }
  };

  // Delete entry
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      await axiosInstance.delete(`/counselingform/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error deleting entry.");
    }
  };

  return (
    <div className="p-10">
       

      {/* ---------------- TABLE ---------------- */}
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-primary-600 text-white uppercase text-left">
          <tr >
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Preferred Date</th>
            <th className="p-2 border">Mode</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-2 border">{item.fullName}</td>
              <td className="p-2 border">{item.email}</td>
              <td className="p-2 border">{item.contact}</td>
              <td className="p-2 border">{item.category}</td>
              <td className="p-2 border">{item.preferredDate}</td>
              <td className="p-2 border">{item.mode}</td>
              <td className="p-2 border flex items-center gap-4 justify-center">
                
                {/* EDIT BUTTON */}
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => openEditModal(item)}
                >
                  <FaEdit size={18} />
                </button>

                {/* DELETE BUTTON */}
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash size={18} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- EDIT MODAL ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Edit Counseling Form</h2>

            <div className="space-y-3">

              <input
                name="fullName"
                value={editForm.fullName}
                onChange={handleEditChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />

              <input
                name="contact"
                value={editForm.contact}
                onChange={handleEditChange}
                placeholder="Contact Number"
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />

              <input
                name="preferredDate"
                value={editForm.preferredDate}
                onChange={handleEditChange}
                placeholder="Preferred Date"
                className="w-full border p-2 rounded"
              />

              <input
                name="mode"
                value={editForm.mode}
                onChange={handleEditChange}
                placeholder="Mode"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
              >
                Update
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselingTable;
