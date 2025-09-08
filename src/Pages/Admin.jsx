import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { api } from "../Utils/api";
import gsap from "gsap";
import { 
  Users, 
  UserCheck, 
  Building, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Bell, 
  Settings,
  Plus,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  DollarSign,
  Award,
  Target,
  Zap,
  Globe,
  Link
} from "lucide-react";
import { StatCard, ActivityFeed, DataTable, QuickActionButton, DashboardCard } from "../Components/Dashboard/DashboardComponents";
import { ReferralModal, CourseModal } from "../Components/Dashboard/ActionModals";

// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Generic Modal for Viewing/Editing Data
const DataModal = ({ isOpen, onClose, item, onSave, type }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const renderFields = () => {
    if (!item) return null;
    return Object.keys(item).map(key => {
      if (['_id', 'userId', 'vendorId', 'mentorId', 'studentId', 'courseId', '__v', 'createdAt', 'updatedAt'].includes(key)) return null;
      return (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          <input
            type="text"
            name={key}
            value={formData[key] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit {type}</h2>
        <div className="space-y-4">{renderFields()}</div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // New state for enrollments
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('');

  const [analyticsData, setAnalyticsData] = useState([]); // Initialize as empty array

  const cardRef = useRef(null);

  const loadAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [vendorsRes, mentorsRes, studentsRes, coursesRes, enrollmentsRes, dashboardRes] = await Promise.all([
        api.getAllVendors(token),
        api.getAllMentors(token),
        api.getAllStudents(token),
        api.getAllCourses(token),
        api.getAllEnrollments(token), // New API call
        api.getDashboard(token)
      ]);

      setVendors(vendorsRes.data || []);
      setMentors(mentorsRes.data || []);
      setStudents(studentsRes.data || []);
      setCourses(coursesRes.data || []);
      setEnrollments(enrollmentsRes.data || []); // Set enrollments state
      setDashboardData(dashboardRes.data);
      // Set analyticsData from dashboard response
      setAnalyticsData(dashboardRes.data.analyticsData || []);

    } catch (err) {
      console.error("Failed to load data:", err);
      setError(err.message || "Failed to load data");
    }
  };

  // Check authentication and load dashboard data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (!storedUser || !token) {
          navigate("/login");
          return;
        }
        
        const userData = JSON.parse(storedUser);
        
        if (userData.role !== "admin") {
          setError("Access Denied: Admin role required");
          return;
        }
        
        setUser(userData);
        await loadAllData();
        
      } catch (err) {
        console.error("Auth check failed:", err);
        setError(err.message || "Authentication failed");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);


  // GSAP entrance animation for admin card
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, type) => {
    const deletePromise = (async () => {
      const token = localStorage.getItem('token');
      switch (type) {
        case 'vendor':
          return await api.deleteVendor(id, token);
        case 'mentor':
          return await api.deleteMentor(id, token);
        case 'student':
          return await api.deleteStudent(id, token);
        case 'course':
          return await api.deleteCourse(id, token);
        case 'enrollment':
          return await api.deleteEnrollment(id, token);
        default:
          throw new Error('Invalid type for deletion');
      }
    })();

    toast.promise(
      deletePromise,
      {
        pending: `Deleting ${type}...`,
        success: `${type} deleted successfully!`,
        error: `Failed to delete ${type}.`
      }
    );

    try {
      await deletePromise;
      await loadAllData(); // Refresh data after successful deletion
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
      // The toast.promise will display the error message
    }
  };

  const handleSave = async (updatedItem) => {
    const savePromise = (async () => {
      const token = localStorage.getItem('token');
      const { _id, ...payload } = updatedItem;
      switch (modalType) {
        case 'vendor':
          return await api.updateVendor(_id, payload, token);
        case 'mentor':
          return await api.updateMentor(_id, payload, token);
        case 'student':
          return await api.updateStudent(_id, payload, token);
        case 'course':
          return await api.updateCourse(_id, payload, token);
        case 'enrollment':
          return await api.updateEnrollment(_id, payload, token);
        default:
          throw new Error('Invalid type for saving');
      }
    })();

    toast.promise(
      savePromise,
      {
        pending: `Saving ${modalType}...`,
        success: `${modalType} saved successfully!`, 
        error: `Failed to save ${modalType}.`
      }
    );

    try {
      await savePromise;
      await loadAllData(); // Refresh data after successful save
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      console.error(`Failed to save ${modalType}:`, err);
      // The toast.promise will display the error message
    }
  };

  const realTimeActivities = useMemo(() => {
    if (!dashboardData?.recentActivities) return [];
    
    const activities = [];
    
    dashboardData.recentActivities.vendors.forEach(v => {
      activities.push({
        type: 'user',
        title: 'New Vendor',
        description: `${v.companyName} joined`,
        time: new Date(v.createdAt).toLocaleString()
      });
    });

    dashboardData.recentActivities.mentors.forEach(m => {
      activities.push({
        type: 'user',
        title: 'New Mentor',
        description: `${m.userId?.name} joined`,
        time: new Date(m.createdAt).toLocaleString()
      });
    });

    dashboardData.recentActivities.students.forEach(s => {
      activities.push({
        type: 'user',
        title: 'New Student',
        description: `${s.userId?.name} joined`,
        time: new Date(s.createdAt).toLocaleString()
      });
    });

    return activities.sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [dashboardData]);

  // Pie chart data for role distribution using real dashboard data
  const roleCounts = useMemo(() => {
    if (!dashboardData) return { vendors: 0, mentors: 0, students: 0, courses: 0 };
    return {
      vendors: dashboardData.counts.totalVendors || 0,
      mentors: dashboardData.counts.totalMentors || 0,
      students: dashboardData.counts.totalStudents || 0,
      courses: dashboardData.counts.totalCourses || 0,
    };
  }, [dashboardData]);

  const pieData = useMemo(() => {
    return Object.keys(roleCounts).map((role) => ({
      name: role.charAt(0).toUpperCase() + role.slice(1),
      value: roleCounts[role],
    }));
  }, [roleCounts]);

  const filteredVendors = useMemo(() => {
    if (!search.trim()) return vendors;
    return vendors.filter(
      (v) =>
        v.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        v.userId?.email.toLowerCase().includes(search.toLowerCase()) ||
        v.companyName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, vendors]);

  const filteredMentors = useMemo(() => {
    if (!search.trim()) return mentors;
    return mentors.filter(
      (m) =>
        m.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        m.userId?.email.toLowerCase().includes(search.toLowerCase()) ||
        m.specialization.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, mentors]);

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    return students.filter(
      (s) =>
        s.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        s.userId?.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, courses]);

  const filteredEnrollments = useMemo(() => {
    if (!search.trim()) return enrollments;
    return enrollments.filter(
      (e) =>
        e.studentId?.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        e.courseId?.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, enrollments]);


  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show access denied if no user or wrong role
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Access Denied</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const actionColumn = (type) => ({
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div className="flex items-center space-x-2">
        <button onClick={() => handleEdit(row, type)} className="text-yellow-600 hover:text-yellow-900"><Edit size={16} /></button>
        <button onClick={() => handleDelete(row._id, type)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
      </div>
    )
  });

  // Enhanced vendor columns for data table
  const vendorColumns = [
    {
      key: 'companyName',
      label: 'Company',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value || 'N/A'}</div>
          <div className="text-sm text-gray-500">{row.userId?.email}</div>
        </div>
      )
    },
    {
      key: 'userId.name',
      label: 'Contact Person',
      render: (value, row) => row.userId?.name || 'N/A'
    },
    {
      key: 'mentorCount',
      label: 'Mentors',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {value || 0}
        </span>
      )
    },
    {
      key: 'studentCount',
      label: 'Students',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          {value || 0}
        </span>
      )
    },
    {
      key: 'userId.isActive',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    actionColumn('vendor')
  ];

  const mentorColumns = [
    {
      key: 'userId.name',
      label: 'Mentor',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value || 'N/A'}</div>
          <div className="text-sm text-gray-500">{row.userId?.email}</div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Specialization',
    },
    {
        key: 'vendorId.companyName',
        label: 'Vendor'
    },
    {
      key: 'studentCount',
      label: 'Students',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {value || 0}
        </span>
      )
    },
    {
      key: 'userId.isActive',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    actionColumn('mentor')
  ];

  const studentColumns = [
    {
      key: 'userId.name',
      label: 'Student',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value || 'N/A'}</div>
          <div className="text-sm text-gray-500">{row.userId?.email}</div>
        </div>
      )
    },
    {
      key: 'mentorId.userId.name',
      label: 'Mentor',
    },
    {
        key: 'mentorId.vendorId.companyName',
        label: 'Vendor',
    },
    {
      key: 'isEnrolled',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? 'Enrolled' : 'Registered'}
        </span>
      )
    },
    actionColumn('student')
  ];

  const courseColumns = [
    {
      key: 'title',
      label: 'Course Title',
    },
    {
      key: 'vendorId.companyName',
      label: 'Vendor',
    },
    {
      key: 'price',
      label: 'Price',
      render: (value) => `${value}`
    },
    {
        key: 'duration',
        label: 'Duration'
    },
    actionColumn('course')
  ];

  const enrollmentColumns = [
    {
      key: 'studentId.userId.name',
      label: 'Student',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.studentId?.userId?.name || 'N/A'}</div>
          <div className="text-sm text-gray-500">{row.studentId?.userId?.email}</div>
        </div>
      )
    },
    {
      key: 'courseId.title',
      label: 'Course',
    },
    {
      key: 'mentorId.userId.name',
      label: 'Mentor',
    },
    {
      key: 'vendorId.companyName',
      label: 'Vendor',
    },
    {
      key: 'pricePaid',
      label: 'Price Paid',
      render: (value) => `${value}`
    },
    {
      key: 'enrolledAt',
      label: 'Enrolled At',
      render: (value) => new Date(value).toLocaleDateString()
    },
    actionColumn('enrollment')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System Overview & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <QuickActionButton 
                  icon={Plus} 
                  label="Add Course" 
                  color="blue" 
                  onClick={() => setShowCourseModal(true)}
                />
                <QuickActionButton 
                  icon={Link} 
                  label="Referral Code" 
                  color="purple" 
                  onClick={() => setShowReferralModal(true)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Bell size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Settings size={18} />
                </motion.button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Vendors"
            value={roleCounts.vendors}
            change="+12%"
            color="blue"
            delay={0.1}
          />
          <StatCard
            icon={UserCheck}
            title="Active Mentors"
            value={roleCounts.mentors}
            change="+8%"
            color="green"
            delay={0.2}
          />
          <StatCard
            icon={BookOpen}
            title="Total Students"
            value={roleCounts.students}
            change="+24%"
            color="purple"
            delay={0.3}
          />
          <StatCard
            icon={Award}
            title="Live Courses"
            value={roleCounts.courses}
            change="+18%"
            color="orange"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analytics Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Growth Analytics */}
            <DashboardCard 
              title="Platform Growth" 
              subtitle="Monthly user acquisition and revenue trends"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="courses" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </DashboardCard>

            {/* Revenue Analytics */}
            <DashboardCard 
              title="Revenue Analytics" 
              subtitle="Monthly revenue breakdown"
            >
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </DashboardCard>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Role Distribution */}
            <DashboardCard title="Platform Overview" gradient={true} color="blue">
              <div className="space-y-4">
                <div className="text-center">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={30}
                      paddingAngle={5}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {Object.keys(roleCounts).map((role, idx) => (
                    <div key={idx} className="text-center p-2 bg-white/60 rounded-lg">
                      <p className="font-semibold text-gray-900">{roleCounts[role]}</p>
                      <p className="text-gray-600 capitalize">{role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>

            {/* Activity Feed */}
            <ActivityFeed activities={realTimeActivities} />

          </div>
        </div>

        {/* Enhanced Vendor Management Table */}
        <DashboardCard title="Vendor Management" subtitle="Complete vendor overview and management">
          <DataTable 
            columns={vendorColumns}
            data={filteredVendors}
            actions={false}
          />
        </DashboardCard>

        {/* Enhanced Mentor Management Table */}
        <DashboardCard title="Mentor Management" subtitle="Comprehensive mentor overview and performance tracking">
          <DataTable 
            columns={mentorColumns}
            data={filteredMentors}
            actions={false}
          />
        </DashboardCard>

        {/* Enhanced Student Management Table */}
        <DashboardCard title="Student Management" subtitle="Comprehensive student overview and tracking">
          <DataTable 
            columns={studentColumns}
            data={filteredStudents}
            actions={false}
          />
        </DashboardCard>

        {/* Enhanced Course Management Table */}
        <DashboardCard title="Course Management" subtitle="Complete course overview and management">
          <DataTable 
            columns={courseColumns}
            data={filteredCourses}
            actions={false}
          />
        </DashboardCard>

        {/* Enhanced Enrollment Management Table */}
        <DashboardCard title="Enrollment Management" subtitle="Complete enrollment overview and tracking">
          <DataTable
            columns={enrollmentColumns}
            data={filteredEnrollments}
            actions={false}
          />
        </DashboardCard>
      </div>

      {/* Action Modals */}
      <ReferralModal 
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        userRole={user?.role}
        userInfo={user}
      />
      
      <CourseModal 
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        userInfo={user}
        onCourseAdded={(newCourse) => {
          setCourses(prev => [...prev, newCourse]);
          // Refresh dashboard data
          const token = localStorage.getItem('token');
          api.getDashboard(token).then(response => {
            if (response.success) {
              setDashboardData(response.data);
            }
          });
        }}
      />

      <DataModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSave}
        type={modalType}
      />
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}