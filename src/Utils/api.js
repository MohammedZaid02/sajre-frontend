// Simple API client using fetch. Adjust VITE_API_URL in .env if needed.
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

async function http(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  post: (path, body, token) => http(path, { method: 'POST', body, token }),
  // Auth endpoints
  login: (email, password) => http('/api/auth/login', { method: 'POST', body: { email, password } }),
  registerStudent: (payload) => http('/api/auth/register/student', { method: 'POST', body: payload }),
  registerVendor: (payload) => http('/api/auth/register/vendor', { method: 'POST', body: payload }),
  registerMentor: (payload) => http('/api/auth/register/mentor', { method: 'POST', body: payload }),
  verifyOtp: (email, otp) => http('/api/auth/verify-otp', { method: 'POST', body: { email, otp } }),
  
  // Public endpoints
  getPublicCourses: () => http('/api/courses'),

  // Admin endpoints
  adminLogin: (email, password) => http('/api/admin/login', { method: 'POST', body: { email, password } }),
  getDashboard: (token) => http('/api/admin/dashboard', { token }),
  createVendor: (payload, token) => http('/api/admin/create-vendor', { method: 'POST', body: payload, token }),
  getAllVendors: (token) => http('/api/admin/vendors', { token }),
  getAllMentors: (token) => http('/api/admin/mentors', { token }),
  getAllStudents: (token) => http('/api/admin/students', { token }),
  getAllCourses: (token) => http('/api/admin/courses', { token }),
  getAllEnrollments: (token) => http('/api/admin/enrollments', { token }),
  updateVendor: (id, payload, token) => http(`/api/admin/vendor/${id}`, { method: 'PUT', body: payload, token }),
  deleteVendor: (id, token) => http(`/api/admin/vendor/${id}`, { method: 'DELETE', token }),
  updateMentor: (id, payload, token) => http(`/api/admin/mentor/${id}`, { method: 'PUT', body: payload, token }),
  deleteMentor: (id, token) => http(`/api/admin/mentor/${id}`, { method: 'DELETE', token }),
  updateStudent: (id, payload, token) => http(`/api/admin/student/${id}`, { method: 'PUT', body: payload, token }),
  deleteStudent: (id, token) => http(`/api/admin/student/${id}`, { method: 'DELETE', token }),
  generateAdminReferralCode: (payload, token) => http('/api/admin/referral/generate', { method: 'POST', body: payload, token }),
  createCourse: (payload, token) => http('/api/admin/create-course', { method: 'POST', body: payload, token }),
    updateCourse: (id, data, token) => api.put(`/admin/course/${id}`, data, { headers: { Authorization: `Bearer ${token}` } }),

  updateEnrollment: (id, data, token) => api.put(`/admin/enrollment/${id}`, data, { headers: { Authorization: `Bearer ${token}` } }),
    deleteCourse: (id, token) => api.delete(`/admin/course/${id}`, { headers: { Authorization: `Bearer ${token}` } }),

  deleteEnrollment: (id, token) => api.delete(`/admin/enrollment/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
  
  // Vendor endpoints
  getVendorDashboard: (token) => http('/api/vendor/dashboard', { token }),
  createMentor: (payload, token) => http('/api/vendor/create-mentor', { method: 'POST', body: payload, token }),
  getVendorMentors: (token) => http('/api/vendor/mentors', { token }),
  getVendorStudents: (token) => http('/api/vendor/students', { token }),
  getVendorCourses: (token) => http('/api/vendor/courses', { token }),
  generateVendorReferralCode: (payload, token) => http('/api/vendor/referral/generate', { method: 'POST', body: payload, token }),
  
  // Mentor endpoints
  getMentorDashboard: (token) => http('/api/mentor/dashboard', { token }),
  createMentorReferralCode: (payload, token) => http('/api/mentor/create-referral-code', { method: 'POST', body: payload, token }),
  getMentorReferralCodes: (token) => http('/api/mentor/referral-codes', { token }),
  getMentorStudents: (token) => http('/api/mentor/students', { token }),
  deactivateReferralCode: (id, token) => http(`/api/mentor/referral-code/${id}/deactivate`, { method: 'PUT', token }),
  getMentorCourses: (token) => http('/api/mentor/courses', { token }),
  getMentorEnrollments: (token) => http('/api/mentor/enrollments', { token }),
  
  // Universal referral system
  generateUniversalReferralCode: (token) => http('/api/referral/generate', { method: 'POST', token }),
  getReferralStats: (token) => http('/api/referral/stats', { token }),
  validateReferralCode: (code) => http('/api/referral/validate', { method: 'POST', body: { code } }),
  
  // User data based on role
  getUserData: (role, token) => http(`/api/users/${role}`, { token }),
  getSubordinates: (token) => http('/api/users/subordinates', { token }),
  updateUserStatus: (userId, status, token) => http(`/api/users/${userId}/status`, { method: 'PUT', body: { status }, token }),
  
  // Live notifications
  getNotifications: (token) => http('/api/notifications', { token }),
  markNotificationRead: (id, token) => http(`/api/notifications/${id}/read`, { method: 'PUT', token }),

  // Activities
  getRecentActivities: (token) => http('/api/mentor/recent-activities', { token }),

  // Contact Form
  contactUs: (payload) => http('/api/contact', { method: 'POST', body: payload }),
};

export default api;