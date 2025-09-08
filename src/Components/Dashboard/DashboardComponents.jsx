import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Activity,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Clock,
  Star
} from "lucide-react";

// Enhanced Stat Card Component
export const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeType = "positive", 
  color = "blue",
  delay = 0,
  onClick 
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-50",
    green: "from-green-500 to-green-600 text-green-600 bg-green-50",
    purple: "from-purple-500 to-purple-600 text-purple-600 bg-purple-50",
    orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-50",
    red: "from-red-500 to-red-600 text-red-600 bg-red-50",
    indigo: "from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
        onClick ? 'hover:bg-gray-50' : ''
      }`}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)`
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[color].split(' ')[2]} mb-4`}>
            <Icon size={24} className={colorClasses[color].split(' ')[1]} />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'positive' ? '+' : ''}{change}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div 
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform`}
      />
    </motion.div>
  );
};

// Enhanced Activity Feed Component
export const ActivityFeed = ({ activities = [], maxItems = 5 }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return <Activity size={16} className="text-green-500" />;
      case 'course': return <BookOpen size={16} className="text-blue-500" />;
      case 'achievement': return <Award size={16} className="text-yellow-500" />;
      case 'user': return <Users size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Bell size={20} className="text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.slice(0, maxItems).map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity size={48} className="mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Data Table Component
// Enhanced Data Table Component
export const DataTable = ({ 
  columns, 
  data, 
  actions = true,
  searchable = true,
  filterable = true,
  pagination = true
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const getNestedValue = (obj, path) => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const filteredData = data.filter(item =>
    columns.some(col => 
      getNestedValue(item, col.key)?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = pagination 
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Data Overview</h3>
          <div className="flex items-center space-x-4">
            {searchable && (
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            {filterable && (
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
              </button>
            )}
            <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="hover:bg-gray-50"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${col.className || 'text-gray-900'}`}>
                      {col.render ? col.render(getNestedValue(row, col.key), row) : getNestedValue(row, col.key)}
                    </div>
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Quick Action Button Component
export const QuickActionButton = ({ icon: Icon, label, color = "blue", onClick }) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    purple: "bg-purple-500 hover:bg-purple-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${colorClasses[color]}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </motion.button>
  );
};

// Progress Ring Component
export const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = "blue" }) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    purple: "stroke-purple-500",
    orange: "stroke-orange-500"
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          className="text-gray-200"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="currentColor"
          className={colorClasses[color]}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

// Enhanced Card Component
export const DashboardCard = ({ 
  title, 
  subtitle, 
  children, 
  className = "", 
  actions,
  gradient = false,
  color = "white"
}) => {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    green: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    white: "bg-white border-gray-200"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-lg border p-6 ${gradient ? gradients[color] : 'bg-white border-gray-200'} ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
};
