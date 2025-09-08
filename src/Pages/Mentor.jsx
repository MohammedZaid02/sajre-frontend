import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { api } from "../Utils/api";
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Bell, 
  Settings,
  Plus,
  Download,
  Award,
  Target,
  Clock,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  Star,
  MessageSquare,
  Calendar,
  BarChart3,
  GraduationCap,
  ChevronRight,
  Link
} from "lucide-react";
import { StatCard, ActivityFeed, DataTable, QuickActionButton, DashboardCard, ProgressRing } from "../Components/Dashboard/DashboardComponents";
import { ReferralModal, CourseModal } from "../Components/Dashboard/ActionModals";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Mentor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mentorData, setMentorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [mentorEnrollments, setMentorEnrollments] = useState([]); // New state for mentor enrollments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [realTimeActivities, setRealTimeActivities] = useState([]);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const cardRef = useRef(null);

  // Check authentication and load mentor data
  // Function to fetch student data
  const fetchStudentsData = async (token) => {
    try {
      const studentsRes = await api.getMentorStudents(token);
      console.log("Fetched students data:", studentsRes.data);
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error("Failed to fetch students data:", err);
      // Optionally, set an error state or show a message to the user
    }
  };

  // Check authentication and load mentor data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get user and token from localStorage
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (!storedUser || !token) {
          navigate("/login");
          return;
        }
        
        const userData = JSON.parse(storedUser);
        
        // Check if user is mentor
        if (userData.role !== "mentor") {
          setError("Access Denied: Mentor role required");
          return;
        }
        
        setUser(userData);
        
        // Load mentor dashboard data with real-time activities
        try {
          const [dashboardRes, coursesRes, activitiesRes, enrollmentsRes] = await Promise.all([
            api.getMentorDashboard(token),
            api.getMentorCourses(token),
            api.getRecentActivities(token),
            api.getMentorEnrollments(token)
          ]);

          console.log("Dashboard Data:", dashboardRes.data);
          console.log("Courses Data:", coursesRes.data);
          console.log("Activities Data:", activitiesRes.data);
          console.log("Enrollments Data:", enrollmentsRes.data);
          
          // Update mentor data including stats
          setMentorData(dashboardRes.data || {});
          
          // Update courses
          setCourses(coursesRes.data || []);
          
          // Update activities
          setRealTimeActivities(activitiesRes.data || []);
          
          // Update enrollments
          setMentorEnrollments(enrollmentsRes.data || []);
          
          // Update students from dashboard data
          if (dashboardRes.data && dashboardRes.data.recentStudents) {
            setStudents(dashboardRes.data.recentStudents);
          }

          // Fetch students data separately for real-time updates
          await fetchStudentsData(token);
        } catch (dashErr) {
          console.error("Failed to load dashboard data:", dashErr);
          // Set empty data if API calls fail
          setMentorData({
            totalStudents: 0,
            enrolledStudents: 0
          });
          setRealTimeActivities([
            {
              type: "course",
              title: "Course Completed",
              description: "Sarah Johnson completed React Fundamentals",
              time: "30 minutes ago"
            },
            {
              type: "user",
              title: "New Student Enrollment",
              description: "Mike Chen enrolled in Advanced JavaScript",
              time: "2 hours ago"
            }
          ]);
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

    // Set up interval for real-time student data updates
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchStudentsData(token);
      }
    }, 30000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentor dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
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

  // Show access denied if no user or wrong role
  if (!user || user.role !== "mentor") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  // Show access denied if no user or wrong role
  if (!user || user.role !== "mentor") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  // Filter students based on search
  const filteredStudents = students.filter(
    (s) =>
      s.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
      s.userId?.email.toLowerCase().includes(search.toLowerCase())
  );

  // Metrics
  const totalStudents = mentorData?.stats?.totalStudents || 0;
  const enrolledStudents = mentorData?.stats?.enrolledStudents || 0;
  const referralData = [
    { name: "Enrolled", value: enrolledStudents },
    { name: "Registered", value: totalStudents - enrolledStudents },
  ];

  // Sample analytics data for mentor
  const performanceData = [
    { month: 'Jan', students: 20, completed: 15, enrolled: 25 },
    { month: 'Feb', students: 28, completed: 22, enrolled: 30 },
    { month: 'Mar', students: 35, completed: 28, enrolled: 40 },
    { month: 'Apr', students: 42, completed: 38, enrolled: 45 },
    { month: 'May', students: 48, completed: 42, enrolled: 52 },
    { month: 'Jun', students: 55, completed: 50, enrolled: 60 },
  ];

  const courseProgressData = [
    { course: 'React Basics', progress: 85, students: 15 },
    { course: 'Advanced JS', progress: 75, students: 12 },
    { course: 'Node.js', progress: 60, students: 8 },
    { course: 'Database Design', progress: 90, students: 20 },
  ];

  const recentActivities = [
    {
      type: "course",
      title: "Course Completed",
      description: "Sarah Johnson completed React Fundamentals",
      time: "30 minutes ago"
    },
    {
      type: "user",
      title: "New Student Enrollment",
      description: "Mike Chen enrolled in Advanced JavaScript",
      time: "2 hours ago"
    },
    {
      type: "achievement",
      title: "Milestone Achievement",
      description: "Reached 50+ active students",
      time: "1 day ago"
    },
    {
      type: "course",
      title: "Course Material Updated",
      description: "Added new content to Node.js course",
      time: "2 days ago"
    }
  ];

  // Enhanced student columns for data table
  const studentColumns = [
    {
      key: 'userId.name',
      label: 'Student',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {(value || 'N').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{value || 'N/A'}</div>
            <div className="text-sm text-gray-500">{row.userId?.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'isEnrolled',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? 'Enrolled' : 'Registered'}
        </span>
      )
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value = Math.floor(Math.random() * 100)) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{value}%</span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
                <p className="text-sm text-gray-600">Student Management & Course Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <QuickActionButton 
                  icon={Plus} 
                  label="Add Course" 
                  color="purple" 
                  onClick={() => setShowCourseModal(true)}
                />
                <QuickActionButton 
                  icon={Link} 
                  label="Referral Code" 
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

      <div className="max-w-screen-2xl p-6 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Students"
            value={mentorData?.stats?.totalStudents || 0}
            change={`${mentorData?.stats?.registeredStudents || 0} registered`}
            color="blue"
            delay={0.1}
          />
          <StatCard
            icon={UserCheck}
            title="Enrolled Students"
            value={mentorData?.stats?.enrolledStudents || 0}
            change={`${((mentorData?.stats?.enrolledStudents || 0) / (mentorData?.stats?.totalStudents || 1) * 100).toFixed(1)}% enrolled`}
            color="green"
            delay={0.2}
          />
          <StatCard
            icon={BookOpen}
            title="Active Courses"
            value={courses.length}
            change={`${mentorData?.stats?.totalEnrollments || 0} enrollments`}
            color="purple"
            delay={0.3}
          />
          <StatCard
            icon={Award}
            title="Completion Rate"
            value={`${Math.round((enrolledStudents / Math.max(totalStudents, 1)) * 100)}%`}
            change="+5%"
            changeType="positive"
            color="orange"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-screen-lg">

          {/* Student Distribution */}
          <DashboardCard title="Student Overview" gradient={true} color="purple">
            <div className="space-y-4">
              <div className="text-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={referralData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={30}
                    paddingAngle={5}
                  >
                    {referralData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-3 bg-white/60 rounded-lg">
                  <p className="font-semibold text-gray-900">{enrolledStudents}</p>
                  <p className="text-gray-600">Enrolled</p>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-lg">
                  <p className="font-semibold text-gray-900">{totalStudents - enrolledStudents}</p>
                  <p className="text-gray-600">Registered</p>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Activity Feed */}
          <ActivityFeed maxItems={100} activities={realTimeActivities.length > 0 ? realTimeActivities : [
            {
              type: "course",
              title: "Course Completed",
              description: "Sarah Johnson completed React Fundamentals",
              time: "30 minutes ago"
            },
            {
              type: "user",
              title: "New Student Enrollment",
              description: "Mike Chen enrolled in Advanced JavaScript",
              time: "2 hours ago"
            }
          ]} />
        </div>

        {/* Enhanced Student Management */}
        <DashboardCard title="Student Management" subtitle="Comprehensive student overview and tracking">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={student._id || index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.userId?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{student.userId?.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {student.referralCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.isEnrolled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.isEnrolled ? 'Enrolled' : 'Registered'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {students.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No students found
            </div>
          )}
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
        }}
      />
    </div>
  );
}

// Simple Student Card Component
function StudentCard({ student }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      className="border rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-800">
            {student.userId?.name || 'Student Name'}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Email:</strong> {student.userId?.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> 
            <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
              student.isEnrolled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {student.isEnrolled ? 'Enrolled' : 'Registered'}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Referral Code:</strong> 
            <span className="bg-blue-100 px-2 py-1 rounded font-mono text-xs ml-1">
              {student.referralCode || 'N/A'}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Joined:</strong> {new Date(student.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
