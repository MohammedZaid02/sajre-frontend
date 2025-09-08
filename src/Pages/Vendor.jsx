import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { api } from "../Utils/api";
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Bell, 
  Settings,
  Plus,
  Download,
  Award,
  Target,
  BarChart3,
  UserCheck,
  Briefcase,
  Star,
  ChevronRight,
  Calendar
} from "lucide-react";
import { StatCard, ActivityFeed, DataTable, QuickActionButton, DashboardCard, ProgressRing } from "../Components/Dashboard/DashboardComponents";
import { ReferralModal, CourseModal } from "../Components/Dashboard/ActionModals";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Vendor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const cardRef = useRef(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const storedUser = localStorage.getItem("user");
        if(!storedUser) {
          navigate("/login");
          return;
        }

        const userData = JSON.parse(storedUser);
        if (userData.role !== "vendor") {
          setError("Access Denied: Vendor role required");
          setLoading(false);
          return;
        }
        
        setUser(userData);

        const dashboardRes = await api.getVendorDashboard(token);

        if (dashboardRes.success) {
          setVendorData(dashboardRes.data);
          setMentors(dashboardRes.data.mentors || []);
          setStudents(dashboardRes.data.students || []);
        } else {
          throw new Error(dashboardRes.message || 'Failed to load dashboard data');
        }

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

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendor dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  if (!user || !vendorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-yellow-600 text-xl mb-4">No vendor data available.</p>
        </div>
      </div>
    );
  }

  const filteredMentors = mentors.filter(
    (m) =>
      m.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
      m.userId?.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = students.filter(
    (s) =>
      s.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
      s.userId?.email.toLowerCase().includes(search.toLowerCase())
  );

  const { counts, revenueData, performanceMetrics, recentActivities } = vendorData;

  const totalMentors = counts?.totalMentors || 0;
  const totalStudents = counts?.totalStudents || 0;
  const totalRevenue = revenueData?.reduce((acc, item) => acc + item.revenue, 0) || 0;

  const chartData = [
    { name: "Mentors", value: totalMentors },
    { name: "Students", value: totalStudents },
  ];

  const performanceMetricsData = [
    { name: 'Course Completion', value: performanceMetrics?.courseCompletion || 0, target: 90 },
    { name: 'Student Satisfaction', value: performanceMetrics?.studentSatisfaction || 0, target: 95 },
    { name: 'Mentor Retention', value: performanceMetrics?.mentorRetention || 0, target: 85 },
    { name: 'Revenue Growth', value: performanceMetrics?.revenueGrowth || 0, target: 20 },
  ];

  const mentorColumns = [
    {
      key: 'userId.name',
      label: 'Mentor',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {(row.userId?.name || 'M').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.userId?.name || 'N/A'}</div>
            <div className="text-sm text-gray-500">{row.userId?.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
          {value || 'General'}
        </span>
      )
    },
    {
      key: 'studentCount',
      label: 'Students',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Users size={16} className="text-blue-500" />
          <span className="font-semibold">{value || 0}</span>
        </div>
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
    }
  ];

  const studentColumns = [
    {
      key: 'userId.name',
      label: 'Student',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
            {(row.userId?.name || 'S').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.userId?.name || 'N/A'}</div>
            <div className="text-sm text-gray-500">{row.userId?.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'mentorId.userId.name',
      label: 'Mentor',
      render: (value) => value || 'N/A'
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-100">
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
                <p className="text-sm text-gray-600">{vendorData.vendor.companyName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <QuickActionButton 
                  icon={Plus} 
                  label="Add Course" 
                  color="green" 
                  onClick={() => setShowCourseModal(true)}
                />
                <QuickActionButton 
                  icon={Plus} 
                  label="Create Mentor" 
                  color="blue" 
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Mentors"
            value={totalMentors}
            change={`+${(performanceMetrics?.mentorRetention || 0)}% retention`}
            color="blue"
            delay={0.1}
          />
          <StatCard
            icon={UserCheck}
            title="Active Students"
            value={totalStudents}
            change={`${counts?.enrolledStudents || 0} enrolled`}
            color="green"
            delay={0.2}
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={`+${(performanceMetrics?.revenueGrowth || 0)}%`}
            color="purple"
            delay={0.3}
          />
          <StatCard
            icon={TrendingUp}
            title="Growth Rate"
            value={`${performanceMetrics?.revenueGrowth || 0}%`}
            change="vs last month"
            changeType="positive"
            color="orange"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardCard 
              title="Revenue & Growth Analytics" 
              subtitle="Track business performance and growth trends"
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </DashboardCard>

            <DashboardCard 
              title="Performance Metrics" 
              subtitle="Key business performance indicators"
            >
              <div className="grid grid-cols-2 gap-6">
                {performanceMetricsData.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-3">
                      <ProgressRing 
                        progress={metric.value > 100 ? 100 : metric.value} 
                        size={80} 
                        color={metric.value >= metric.target ? 'green' : 'orange'}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{metric.name}</h4>
                    <div className="flex items-center justify-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-gray-700">{metric.value}%</span>
                      <span className="text-xs text-gray-500">/ {metric.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className="space-y-8">
            <DashboardCard title="Business Overview" gradient={true} color="green">
              <div className="space-y-4">
                <div className="text-center">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={30}
                      paddingAngle={5}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center p-3 bg-white/60 rounded-lg">
                    <p className="font-semibold text-gray-900">{totalMentors}</p>
                    <p className="text-gray-600">Mentors</p>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-lg">
                    <p className="font-semibold text-gray-900">{totalStudents}</p>
                    <p className="text-gray-600">Students</p>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <ActivityFeed activities={recentActivities || []} />

            <DashboardCard title="Quick Stats" gradient={true} color="blue">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Student/Mentor</span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {Math.round(totalStudents / Math.max(totalMentors, 1))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Course Completion</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {performanceMetrics?.courseCompletion || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{performanceMetrics?.studentSatisfaction || 0}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month Revenue</span>
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    +${(revenueData[revenueData.length - 1]?.revenue || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        <DashboardCard title="Mentor Management" subtitle="Comprehensive mentor overview and performance tracking">
          <DataTable 
            columns={mentorColumns}
            data={filteredMentors}
          />
        </DashboardCard>

        <DashboardCard title="Student Management" subtitle="Comprehensive student overview and performance tracking">
          <DataTable 
            columns={studentColumns}
            data={filteredStudents}
          />
        </DashboardCard>
      </div>

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
          const token = localStorage.getItem('token');
          api.getVendorDashboard(token).then(response => {
            if (response.success) {
              setVendorData(response.data);
            }
          });
        }}
      />
    </div>
  );
}

function MentorCard({ mentor }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      className="border rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-800">
            {mentor.userId?.name || 'Mentor Name'}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Email:</strong> {mentor.userId?.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> 
            <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
              mentor.userId?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {mentor.userId?.isActive ? 'Active' : 'Inactive'}
            </span>
          </p>
          {mentor.specialization && (
            <p className="text-sm text-gray-600">
              <strong>Specialization:</strong> {mentor.specialization}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <strong>Created:</strong> {new Date(mentor.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="text-gray-500 ml-4">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 pt-4 border-t"
        >
          <div className="text-sm text-gray-500">
            <p><strong>Student Count:</strong> {mentor.studentCount || 0}</p>
            <p><strong>Enrolled Students:</strong> {mentor.enrolledCount || 0}</p>
            <p><strong>Registered Students:</strong> {mentor.registeredCount || 0}</p>
          </div>
          {mentor.bio && (
            <div className="mt-2">
              <p className="text-sm text-gray-600"><strong>Bio:</strong></p>
              <p className="text-sm text-gray-500 mt-1">{mentor.bio}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
