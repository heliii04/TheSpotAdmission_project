import React, { useState } from 'react';
import { 
  LayoutDashboard, UserPlus, Compass, MessageSquare, 
  LogOut, Bell, Search, CheckCircle, Clock, ClipboardList, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedStudent, setSelectedStudent] = useState<any>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // data list
  const allApplications = [
    { id: 1, name: "Swara pankhaniya", type: "College Admission Counselling", status: "Solved", email: "swara@example.com" },
    { id: 2, name: "Vyas Heli", type: "Career Guidance & Streams", status: "Pending", email: "heli@example.com" },
    { id: 3, name: "Pal Chitra", type: "Personalized Student Support", status: "Under Review", email: "chitra@example.com" },
    { id: 4, name: "Jay Shah", type: "Pre-Primary to Higher Secondary", status: "Solved", email: "jay@example.com" },
    { id: 5, name: "Meet Patel", type: "College Admission Counselling", status: "Pending", email: "meet@example.com" },
    { id: 6, name: "Rahul Sharma", type: "College Admission Counselling", status: "Solved", email: "rahul@example.com" },
    { id: 7, name: "Ananya Patel", type: "Career Guidance & Streams", status: "Pending", email: "ananya@example.com" },
    { id: 8, name: "Sandeep Kumar", type: "Personalized Student Support", status: "Under Review", email: "sandeep@example.com" },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  // filter logic
  const filteredApplications = activeTab === 'Dashboard' 
    ? allApplications 
    : allApplications.filter(app => app.type === activeTab);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Pre-Primary to Higher Secondary', icon: <UserPlus size={20} /> },
    { name: 'College Admission Counselling', icon: <ClipboardList size={20} /> },
    { name: 'Career Guidance & Streams', icon: <Compass size={20} /> },
    { name: 'Personalized Student Support', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-72 bg-[#1e3a8a] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-blue-800">Spot Admission</div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                activeTab === item.name ? 'bg-blue-600 border-l-4 border-white' : 'hover:bg-blue-700'
              }`}
            >
              {item.icon} <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-800 bg-[#172554]">
          <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 p-2 rounded-lg hover:bg-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{activeTab}</h2>
          <div className="flex items-center gap-4">
             <Bell className="text-gray-400" size={20} />
             <div className="w-8 h-8 rounded-full bg-blue-500 border border-white overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="admin" />
             </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard title="Total" count={filteredApplications.length} icon={<ClipboardList />} />
            <StatCard title="Solved" count={filteredApplications.filter(a => a.status === 'Solved').length} icon={<CheckCircle className="text-green-500" />} />
            <StatCard title="Pending" count={filteredApplications.filter(a => a.status === 'Pending').length} icon={<Clock className="text-orange-500" />} />
            <StatCard title="Review" count={filteredApplications.filter(a => a.status === 'Under Review').length} icon={<Bell className="text-purple-500" />} />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Form Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{app.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'Solved' ? 'bg-green-100 text-green-700' : 
                        app.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-blue-600">
                      <button 
                        onClick={() => { setSelectedStudent(app); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition shadow-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* VIEW MODAL (Popup) */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Student Profile</h3>
                <p className="text-blue-100 text-xs">ID: #00{selectedStudent.id}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <DetailItem label="Full Name" value={selectedStudent.name} />
                <DetailItem label="Email" value={selectedStudent.email || "student@example.com"} />
                <DetailItem label="Contact" value="+91 98765 43210" />
                <DetailItem label="Current Status" value={selectedStudent.status} isStatus />
                <div className="col-span-2">
                  <DetailItem label="Application For" value={selectedStudent.type} />
                </div>
                <div className="col-span-2">
                  <DetailItem label="Address" value="123, Education Hub, Near University Gate, Ahmedabad, Gujarat." />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Assign Counselor</label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Choose a Counselor...</option>
                  <option value="1">Dr. Amit Mehta (Admissions)</option>
                  <option value="2">Ms. Sneha Rao (Career Guidance)</option>
                  <option value="3">Mr. Rajesh Patel (Support)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => { alert(`Counselor assigned to ${selectedStudent.name}`); setIsModalOpen(false); }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Appoint & Save
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Details
const DetailItem = ({ label, value, isStatus }: any) => (
  <div>
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-sm font-semibold ${isStatus ? 'text-blue-600' : 'text-gray-800'}`}>{value}</p>
  </div>
);

const StatCard = ({ title, count, icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{count}</h3>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg text-blue-600">{icon}</div>
  </div>
);

export default AdminDashboard;
