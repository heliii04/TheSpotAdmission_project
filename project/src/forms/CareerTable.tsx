import React, { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

interface FormData {
  _id?: string;
  fullName: string;
  classGrade: string;
  section: string;
  dob: string;
  gender: string;
  contactNumber: string;
  email: string;
  schoolName: string;
  address: string;
  performance: string;
  favoriteSubjects: string;
  difficultSubjects: string;
  examScores: string;
  coCurricular: string;
  activities: string;
  interests: string[];
  hobbies: string;
  skills: string;
  hasCareerInMind: string;
  preferredCareer: string;
  streamOptions: string;
  reasons: string;
  guidanceReceived: string;
  preferredColleges: string;
  counselingType: string;
  counselingMode: string;
  counselingDate: string;
  counselorName: string;
  remarks: string;
  counselorFindings: string;
  recommendedPath: string;
  interventions: string[];
  followUpDate: string;
  counselorSignature: string;
  counselorDate: string;
  declarationStudentSign: string;
  declarationParentSign: string;
}

const CareerTable: React.FC = () => {
  const [data, setData] = useState<FormData[]>([]);
  const [editData, setEditData] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/careerform");
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch {
      toast.error("Failed to fetch data!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axiosInstance.delete(`/careerform/${id}`);
      toast.success("Deleted successfully!");
      fetchData();
    } catch {
      toast.error("Failed to delete record!");
    }
  };

  const handleEdit = (item: FormData) => {
    setEditData(item);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editData?._id) return;

    try {
      await axiosInstance.put(
        `/careerform/${editData._id}`,
        editData
      );
      toast.success("Updated successfully!");
      setShowModal(false);
      fetchData();
    } catch {
      toast.error("Failed to update record!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const filteredData = data.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.schoolName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">
      <ToastContainer autoClose={2000} />

      {/* Search + Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or school..."
            className="pl-10 pr-3 py-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <p className="text-gray-700 text-sm">
          Showing {indexOfFirstRecord + 1}–
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length}
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-primary-600 text-white">
            <tr>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">School</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-primary-50 transition"
                >
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.classGrade}</td>
                  <td className="p-3 break-words">{item.email}</td>
                  <td className="p-3 break-words">{item.schoolName}</td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            <FaAngleLeft /> Prev
          </button>

          <span className="font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Next <FaAngleRight />
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              Edit Record
            </h2>

            <div className="space-y-3">
              <input
                name="fullName"
                value={editData.fullName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Full Name"
              />
              <input
                name="classGrade"
                value={editData.classGrade}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Class Grade"
              />
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              <input
                name="schoolName"
                value={editData.schoolName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="School Name"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 px-4 py-2 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTable;
