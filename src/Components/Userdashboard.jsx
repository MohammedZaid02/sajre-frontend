import React, { useState } from "react";
import { useAppStore } from "../Store/UseAppStore";
import { motion } from "framer-motion";
import { 
  Camera, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Activity,
  Settings,
  Bell,
  Heart,
  Star,
  Edit3,
  Save,
  Download,
  Share2
} from "lucide-react";
import { StatCard, ActivityFeed, ProgressRing, DashboardCard } from "./Dashboard/DashboardComponents";
import { ReferralModal } from "./Dashboard/ActionModals";
import { api } from "../Utils/api"; // Import api

export default function UserDashboard({ isOpen, onClose }) {
  const currentUserId = useAppStore((s) => s.currentUserId);
  
  // Fallback to user from backend login if store is empty
  const localUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  })();

  const userFromStore = useAppStore((s) => s.getById(currentUserId));
  const user = userFromStore || localUser;

  const updateUser = useAppStore((s) => s.updateUser);

  const [editing, setEditing] = useState(false);
  const [realTimeActivities, setRealTimeActivities] = useState([]);
  const [userStats, setUserStats] = useState({
    coursesCompleted: 0,
    totalHours: 0,
    certificates: 0,
    currentStreak: 0
  });
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [studentEnrollments, setStudentEnrollments] = useState([]); // New state for student enrollments
  const [form, setForm] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  // Profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (user?.id && updateUser) { updateUser(user.id, { photo: reader.result }); }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (user?.id && updateUser) { updateUser(user.id, { ...form }); }
    setEditing(false);
  };

  // Load real-time user data
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && user) {
          const [activitiesRes] = await Promise.all([
            api.getRecentActivities(token).catch(() => ({ data: [] }))
          ]);
          
          setRealTimeActivities(activitiesRes.data || []);
          
          // Update user stats if available
          if (user.stats) {
            setUserStats({
              coursesCompleted: user.stats.coursesCompleted || 0,
              totalHours: user.stats.totalHours || 0,
              certificates: user.stats.certificates || 0,
              currentStreak: user.stats.currentStreak || 0
            });
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    
    if (user) {
      loadUserData();
    }
  }, [user]);

  if (!user) return null;

  // Fallback activities if real-time data is not available
  const fallbackActivities = [
    {
      type: "login",
      title: "Logged in",
      description: "Last login from Chrome browser",
      time: "2 hours ago"
    },
    {
      type: "course",
      title: "Course Progress",
      description: "Completed Module 3: Advanced React",
      time: "1 day ago"
    },
    {
      type: "achievement",
      title: "Achievement Unlocked",
      description: "Earned 'Quick Learner' badge",
      time: "3 days ago"
    }
  ];

  // Use real-time data or fallback values
  const completionProgress = userStats.coursesCompleted > 0 ? 
    Math.min(100, (userStats.coursesCompleted / 20) * 100) : 75;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 right-0 h-full w-[40%] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user.username}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Enhanced Profile Section */}
        <DashboardCard title="Profile" gradient={true} color="blue">
          <div className="flex items-start space-x-4">
            <div className="relative group">
              <img
                src={user.photo || "https://via.placeholder.com/80"}
                alt="profile"
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover group-hover:shadow-xl transition-shadow"
              />
              <label className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors group-hover:scale-110">
                <Camera size={14} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            <div className="flex-1 space-y-2">
              {!editing ? (
                <>
                  <h3 className="text-xl font-bold text-gray-900">{user.username}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone size={14} />
                      <span>{user.phone || "Phone not added"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Award size={14} />
                      <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  {user.bio && (
                    <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
                      {user.bio}
                    </p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditing(true)}
                    className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </motion.button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                      rows="3"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEditing(false)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DashboardCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={BookOpen}
            title="Courses Completed"
            value={userStats.coursesCompleted}
            change="+2 this month"
            color="blue"
            delay={0.1}
          />
          <StatCard
            icon={Award}
            title="Certificates"
            value={userStats.certificates}
            change="+1 this week"
            color="green"
            delay={0.2}
          />
          <StatCard
            icon={Activity}
            title="Learning Hours"
            value={userStats.totalHours}
            change="+8 this week"
            color="purple"
            delay={0.3}
          />
          <StatCard
            icon={TrendingUp}
            title="Current Streak"
            value={`${userStats.currentStreak} days`}
            change="Keep it up!"
            changeType="positive"
            color="orange"
            delay={0.4}
          />
        </div>

        {/* Learning Progress */}
        <DashboardCard title="Learning Progress" subtitle="Your overall completion rate">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-gray-900">{completionProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">12</p>
                    <p className="text-gray-500">Completed</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4</p>
                    <p className="text-gray-500">In Progress</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2</p>
                    <p className="text-gray-500">Upcoming</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ProgressRing progress={completionProgress} size={100} color="blue" />
            </div>
          </div>
        </DashboardCard>

        {/* Activity Feed */}
        <ActivityFeed activities={realTimeActivities.length > 0 ? realTimeActivities : fallbackActivities} />

        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" gradient={true} color="purple">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors text-left"
            >
              <BookOpen size={18} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Browse Courses</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors text-left"
            >
              <Download size={18} className="text-green-500" />
              <span className="text-sm font-medium text-gray-700">Download Certificates</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors text-left"
            >
              <Star size={18} className="text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Rate Courses</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowReferralModal(true)}
              className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors text-left"
            >
              <Share2 size={18} className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Referral Code</span>
            </motion.button>
          </div>
        </DashboardCard>
      </div>
    </motion.div>
  );
}
