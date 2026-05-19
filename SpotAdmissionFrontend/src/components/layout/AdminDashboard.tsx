import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, UserPlus, Compass, MessageSquare,
  LogOut, Bell, CheckCircle, Clock, ClipboardList, X,
  RefreshCw, AlertCircle, ChevronDown, Search, Calendar,
  Phone, Mail, MapPin, School, User, BookOpen, GraduationCap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/Api';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = 'Pending' | 'Under Review' | 'Solved';

interface Application {
  id: string;
  name: string;
  email: string;
  contact: string;
  type: string;
  status: FormStatus;
  createdAt: string;
  raw: Record<string, any>;
}

// ─── API Response Normalisers ─────────────────────────────────────────────────

/**
 * Career Form  →  GET /careerform/   returns  array directly
 */
const normaliseCareer = (f: any): Application => ({
  id: f._id,
  name: f.fullName || '—',
  email: f.email || '—',
  contact: f.contactNumber || f.contact || '—',
  type: 'Career Guidance & Streams',
  status: (f.status as FormStatus) || 'Pending',
  createdAt: f.createdAt,
  raw: f,
});

/**
 * Counseling Appointment  →  GET /counselingform/  returns  { success, data: [] }
 */
const normaliseCounseling = (f: any): Application => ({
  id: f._id,
  name: f.fullName || '—',
  email: f.email || '—',
  contact: f.contact || '—',
  type: 'College Admission Counselling',
  status: (f.status as FormStatus) || 'Pending',
  createdAt: f.createdAt,
  raw: f,
});

/**
 * Personalized Counseling  →  GET /personalizedcounselingform/  returns  array directly
 */
const normalisePersonalized = (f: any): Application => ({
  id: f._id,
  name: f.fullName || '—',
  email: f.email || '—',
  contact: f.contact || '—',
  type: 'Personalized Student Support',
  status: (f.status as FormStatus) || 'Pending',
  createdAt: f.createdAt,
  raw: f,
});

/**
 * Pre-Primary  →  GET /preprimaryform/  returns  { success, data: [] }
 */
const normalisePrePrimary = (f: any): Application => ({
  id: f._id,
  name: f.fullName || '—',
  email: f.email || '—',
  contact: f.contact || '—',
  type: 'Pre-Primary to Higher Secondary',
  status: (f.status as FormStatus) || 'Pending',
  createdAt: f.createdAt,
  raw: f,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<FormStatus, string> = {
  Solved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  'Under Review': 'bg-blue-100 text-blue-700',
};

const formatDate = (iso: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({
  title, count, icon, color,
}: { title: string; count: number; icon: React.ReactNode; color: string }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-800">{count}</h3>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
  </div>
);

const DetailRow = ({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="mt-0.5 text-blue-400 shrink-0">{icon}</div>}
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">{value || '—'}</p>
    </div>
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

const StudentModal = ({
  student,
  onClose,
  onStatusChange,
}: {
  student: Application;
  onClose: () => void;
  onStatusChange: (id: string, status: FormStatus) => void;
}) => {
  const [saving, setSaving] = useState(false);
  const [localStatus, setLocalStatus] = useState<FormStatus>(student.status);
  const r = student.raw;

  const handleSave = async () => {
    setSaving(true);
    await onStatusChange(student.id, localStatus);
    setSaving(false);
    onClose();
  };

  // Build detail sections based on form type
  const sections: { heading: string; items: { label: string; value?: string; icon?: React.ReactNode }[] }[] = [];

  // Basic info – always present
  sections.push({
    heading: 'Student Information',
    items: [
      { label: 'Full Name', value: student.name, icon: <User size={14} /> },
      { label: 'Email', value: student.email, icon: <Mail size={14} /> },
      { label: 'Contact', value: student.contact, icon: <Phone size={14} /> },
      { label: 'Date of Birth', value: r.dob, icon: <Calendar size={14} /> },
      { label: 'Gender', value: r.gender },
      { label: 'Address', value: r.address || r.city, icon: <MapPin size={14} /> },
    ],
  });

  // Academic info
  sections.push({
    heading: 'Academic Details',
    items: [
      { label: 'School / Institution', value: r.schoolName, icon: <School size={14} /> },
      { label: 'Class / Grade', value: r.classGrade || r.classYear || r.classYearDept || r.grade },
      { label: 'Roll Number', value: r.rollNumber || r.rollNo },
      { label: 'Performance', value: r.academicPerformance || r.performance },
      { label: 'Favorite Subjects', value: r.favoriteSubjects },
      { label: 'Difficult Subjects', value: r.difficultSubjects },
    ],
  });

  // Form-specific info
  if (student.type === 'Career Guidance & Streams') {
    sections.push({
      heading: 'Career Preferences',
      items: [
        { label: 'Career in Mind', value: r.hasCareerInMind, icon: <Compass size={14} /> },
        { label: 'Preferred Career', value: r.preferredCareer },
        { label: 'Stream Options', value: r.streamOptions },
        { label: 'Counseling Type', value: r.counselingType },
        { label: 'Counseling Mode', value: r.counselingMode },
        { label: 'Preferred Date', value: r.counselingDate },
        { label: 'Counselor Name', value: r.counselorName },
        { label: 'Recommended Path', value: r.recommendedPath },
        { label: 'Remarks', value: r.remarks },
      ],
    });
  }

  if (student.type === 'College Admission Counselling') {
    sections.push({
      heading: 'Appointment Details',
      items: [
        { label: 'Category', value: r.category, icon: <BookOpen size={14} /> },
        { label: 'Concern', value: r.concern },
        { label: 'Mode', value: r.mode },
        { label: 'Preferred Date', value: r.preferredDate },
        { label: 'Alternative Date', value: r.alternativeDate },
        { label: 'Preferred Counselor', value: r.preferredCounselor },
        { label: 'Assigned Counselor', value: r.assignedCounselor },
        { label: 'Scheduled Date', value: r.scheduledDate },
        { label: 'Remarks', value: r.remarks },
      ],
    });
  }

  if (student.type === 'Personalized Student Support') {
    sections.push({
      heading: 'Family & Background',
      items: [
        { label: "Father's Name", value: r.fatherName },
        { label: "Father's Contact", value: r.fatherContact },
        { label: "Father's Occupation", value: r.fatherOccupation },
        { label: "Mother's Name", value: r.motherName },
        { label: "Mother's Contact", value: r.motherContact },
        { label: "Family Income", value: r.income },
      ],
    });
    sections.push({
      heading: 'Counseling Notes',
      items: [
        { label: 'Reason for Counseling', value: r.reason },
        { label: 'Referral Source', value: r.referral },
        { label: 'Previous Counseling', value: r.previousCounseling },
        { label: 'Strengths', value: r.strengths },
        { label: 'Expectations', value: r.expectations },
        { label: 'Counselor Observation', value: r.observation },
        { label: 'Counselor Name', value: r.counselorName },
        { label: 'Session Date', value: r.sessionDate },
      ],
    });
  }

  if (student.type === 'Pre-Primary to Higher Secondary') {
    sections.push({
      heading: 'Parent Details',
      items: [
        { label: "Father's Name", value: r.fatherName },
        { label: "Father's Contact", value: r.fatherContact },
        { label: "Father's Occupation", value: r.fatherOcc },
        { label: "Mother's Name", value: r.motherName },
        { label: "Mother's Contact", value: r.motherContact },
        { label: "Parent Email", value: r.parentEmail },
      ],
    });
    sections.push({
      heading: 'Counseling Info',
      items: [
        { label: 'Counseling Types', value: Array.isArray(r.counselingTypes) ? r.counselingTypes.join(', ') : r.counselingTypes },
        { label: 'Counselor Name', value: r.counselorName },
        { label: 'Counseling Date', value: r.counselingDate },
        { label: 'City / State', value: [r.city, r.state].filter(Boolean).join(', ') },
      ],
    });
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e3a8a] px-8 py-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-white text-lg font-bold">{student.name}</h3>
            <p className="text-blue-200 text-xs mt-0.5">{student.type} &nbsp;·&nbsp; Submitted {formatDate(student.createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-700 transition">
            <X size={22} />
          </button>
        </div>

        {/* Body – scrollable */}
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-7">
          {sections.map((sec) => (
            <div key={sec.heading}>
              <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 border-b border-blue-50 pb-2">{sec.heading}</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {sec.items.filter(i => i.value).map((item) => (
                  <DetailRow key={item.label} label={item.label} value={item.value} icon={item.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer – status + save */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center gap-4 bg-gray-50 shrink-0">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Assign Counselor</label>
            <div className="relative">
              <select
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value as FormStatus)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Choose a Counselor...</option>
                <option>Dr. Amit Mehta (Admission)</option>
                <option>Ms. Sneha Rao (Career Guidance)</option>
                <option>Mr. Rajesh Patel (Support)</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#1e3a8a] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-2"
            >
              {saving && <RefreshCw size={14} className="animate-spin" />}
              Save & Close
            </button>
            <button onClick={onClose} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Pre-Primary to Higher Secondary', icon: <UserPlus size={18} /> },
  { name: 'College Admission Counselling', icon: <ClipboardList size={18} /> },
  { name: 'Career Guidance & Streams', icon: <Compass size={18} /> },
  { name: 'Personalized Student Support', icon: <MessageSquare size={18} /> },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Fetch all forms from MongoDB ──────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [careerRes, counselingRes, personalizedRes, prePrimaryRes] = await Promise.allSettled([
        axiosInstance.get('/careerform/'),
        axiosInstance.get('/counselingform/'),
        axiosInstance.get('/personalizedcounselingform/'),
        axiosInstance.get('/preprimaryform/'),
      ]);

      const combined: Application[] = [];

      // Career  →  array directly
      if (careerRes.status === 'fulfilled') {
        const data = careerRes.value.data;
        (Array.isArray(data) ? data : []).forEach((f: any) => combined.push(normaliseCareer(f)));
      }

      // Counseling Appointment  →  { success, data: [] }
      if (counselingRes.status === 'fulfilled') {
        const data = counselingRes.value.data?.data || counselingRes.value.data;
        (Array.isArray(data) ? data : []).forEach((f: any) => combined.push(normaliseCounseling(f)));
      }

      // Personalized  →  array directly
      if (personalizedRes.status === 'fulfilled') {
        const data = personalizedRes.value.data;
        (Array.isArray(data) ? data : []).forEach((f: any) => combined.push(normalisePersonalized(f)));
      }

      // Pre-Primary  →  { success, data: [] }
      if (prePrimaryRes.status === 'fulfilled') {
        const data = prePrimaryRes.value.data?.data || prePrimaryRes.value.data;
        (Array.isArray(data) ? data : []).forEach((f: any) => combined.push(normalisePrePrimary(f)));
      }

      // Sort newest first
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setApplications(combined);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Status Update ─────────────────────────────────────────────────────────
  const handleStatusChange = async (id: string, newStatus: FormStatus) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    // Determine correct endpoint by form type
    const endpointMap: Record<string, string> = {
      'Career Guidance & Streams': `/careerform/${id}`,
      'College Admission Counselling': `/counselingform/${id}`,
      'Personalized Student Support': `/personalizedcounselingform/${id}`,
      'Pre-Primary to Higher Secondary': `/preprimaryform/${id}`,
    };

    try {
      await axiosInstance.put(endpointMap[app.type], { status: newStatus });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Status update failed. Please try again.');
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = applications.filter((app) => {
    const matchesTab = activeTab === 'Dashboard' || app.type === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.type.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const pending = filtered.filter((a) => a.status === 'Pending').length;
  const review = filtered.filter((a) => a.status === 'Under Review').length;
  const solved = filtered.filter((a) => a.status === 'Solved').length;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-blue-50 font-sans">
      {/* ── Sidebar ── */}
      <div className="w-72 bg-[#1e3a8a] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-blue-800">
          <p className="text-xl font-extrabold tracking-tight">Spot Admission</p>
          <p className="text-blue-300 text-xs mt-0.5">Admin Dashboard</p>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveTab(item.name); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm transition-all text-left ${
                activeTab === item.name
                  ? 'bg-blue-600 border-l-4 border-white font-semibold'
                  : 'hover:bg-blue-700 text-blue-100 border-l-4 border-transparent'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 bg-[#172554]">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-gray-800">{activeTab}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAll}
              title="Refresh data"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
            >
              <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            </button>
            <Bell className="text-gray-400" size={20} />
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="p-8 overflow-y-auto flex-1">
          {/* Error Banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
              <button onClick={fetchAll} className="ml-auto font-semibold underline hover:no-underline">
                Retry
              </button>
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            <StatCard title="Total" count={filtered.length} color="bg-blue-50 text-blue-600" icon={<ClipboardList size={22} />} />
            <StatCard title="Pending" count={pending} color="bg-amber-50 text-amber-600" icon={<Clock size={22} />} />
            <StatCard title="Under Review" count={review} color="bg-purple-50 text-purple-600" icon={<Bell size={22} />} />
            <StatCard title="Solved" count={solved} color="bg-emerald-50 text-emerald-600" icon={<CheckCircle size={22} />} />
          </div>

          {/* Search */}
          <div className="relative mb-5 w-full max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, type…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
                <RefreshCw size={28} className="animate-spin text-blue-500" />
                <p className="text-sm font-medium">Loading data from MongoDB…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
                <GraduationCap size={36} className="text-gray-300" />
                <p className="text-sm font-medium">
                  {searchQuery ? 'No results match your search.' : 'No submissions yet.'}
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Form Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/40 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{app.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{app.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(app.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[app.status]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedStudent(app)}
                          className="bg-[#1e3a8a] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && filtered.length > 0 && (
            <p className="text-xs text-gray-400 mt-3 text-right">
              Showing {filtered.length} of {applications.length} total submissions
            </p>
          )}
        </main>
      </div>

      {/* ── Modal ── */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
