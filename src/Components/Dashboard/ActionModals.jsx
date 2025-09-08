import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  X, 
  Copy, 
  CheckCircle, 
  BookOpen, 
  Users, 
  DollarSign, 
  Calendar,
  Link,
  QrCode,
  Share2
} from 'lucide-react';
import { api } from '../../Utils/api';

// Referral Code Modal
export const ReferralModal = ({ isOpen, onClose, userRole, userInfo }) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareStats, setShareStats] = useState({
    totalShares: 0,
    successfulRegistrations: 0,
    pendingInvites: 0
  });
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');

  // Generate referral code or vendor/mentor key based on user role
  const handleGenerateCode = async () => {
    setError('');
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('token');
      let response;
      
      // Use appropriate API endpoint based on role
      switch(userRole) {
        case 'admin':
          if (!companyName || !description) {
            setError('Company Name and Description are required to create a vendor.');
            setIsGenerating(false);
            return;
          }
          response = await api.createVendor({ companyName, description }, token);
          if (response.success) {
            setGeneratedCode(response.data.vendorKey);
          }
          break;
        case 'vendor':
          if (!mentorName || !specialization) {
            setError('Mentor Name and Specialization are required to create a mentor key.');
            setIsGenerating(false);
            return;
          }
          response = await api.createMentor({ mentorName, specialization }, token);
          if (response.success) {
            setGeneratedCode(response.data.mentorKey);
          }
          break;
        case 'mentor':
          response = await api.createMentorReferralCode({ description: 'Student referral code' }, token);
           if (response.success) {
            setGeneratedCode(response.data.code);
          }
          break;
        default:
          throw new Error('Unsupported user role');
      }
      
      if (response.success) {
        // Mock stats for now - can be replaced with real API later
        setShareStats({
          totalShares: Math.floor(Math.random() * 50),
          successfulRegistrations: Math.floor(Math.random() * 20),
          pendingInvites: Math.floor(Math.random() * 10)
        });
      } else {
        setError(response.message || 'Failed to generate code.');
      }
    } catch (error) {
      console.error('Failed to generate code:', error);
      setError(error.message || 'Failed to generate code. Please try again.');
    }
    setIsGenerating(false);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share referral link
  const shareReferral = () => {
    const shareData = {
      title: `Join our learning platform!`,
      text: `Use my referral code: ${generatedCode}`,
      url: `${window.location.origin}/register?ref=${generatedCode}`
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      copyToClipboard();
    }
  };

  const getRoleDescription = () => {
    switch(userRole) {
      case 'admin':
        return 'Create a new vendor and get the vendor key';
      case 'vendor':
        return 'Create a new mentor and get the mentor key';
      case 'mentor':
        return 'Share this code to invite students to your courses';
      default:
        return 'Share this code to invite others to join';
    }
  };
  
  const getTitle = () => {
    switch(userRole) {
      case 'admin':
        return 'Create Vendor';
      case 'vendor':
        return 'Create Mentor';
      default:
        return 'Referral Code';
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
                <p className="text-sm text-gray-600">{getRoleDescription()}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Code Section */}
            <div className="space-y-4">
              {generatedCode ? (
                <div className="space-y-4">
                  {/* Code Display */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Link className="text-blue-600" size={20} />
                        <span className="text-lg font-mono font-bold text-gray-900">{generatedCode}</span>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                        <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{shareStats.totalShares}</p>
                      <p className="text-xs text-gray-600">Shares</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-700">{shareStats.successfulRegistrations}</p>
                      <p className="text-xs text-gray-600">Registered</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-lg font-bold text-yellow-700">{shareStats.pendingInvites}</p>
                      <p className="text-xs text-gray-600">Pending</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={shareReferral}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button
                      onClick={() => setGeneratedCode('')}
                      disabled={isGenerating}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Create Another
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <QrCode className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Generate Your Code</h3>
                    <p className="text-sm text-gray-600">Create a unique code</p>
                  </div>
                  {userRole === 'admin' && (
                    <>
                      <div className="w-full">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 text-left mb-1">Company Name</label>
                        <input
                          type="text"
                          id="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter Company Name"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-left mb-1">Description</label>
                        <input
                          type="text"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter Description"
                        />
                      </div>
                    </>
                  )}
                  {userRole === 'vendor' && (
                    <>
                      <div className="w-full">
                        <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700 text-left mb-1">Mentor Name</label>
                        <input
                          type="text"
                          id="mentorName"
                          value={mentorName}
                          onChange={(e) => setMentorName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter Mentor Name"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 text-left mb-1">Specialization</label>
                        <input
                          type="text"
                          id="specialization"
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter Specialization"
                        />
                      </div>
                    </>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    onClick={handleGenerateCode}
                    disabled={isGenerating}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Code'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Course Management Modal
export const CourseModal = ({ isOpen, onClose, userInfo, onCourseAdded }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    level: 'beginner',
    maxStudents: '',
    startDate: '',
    endDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'UI/UX Design',
    'Digital Marketing',
    'Blockchain',
    'Cybersecurity',
    'Cloud Computing'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!courseData.title.trim()) newErrors.title = 'Title is required';
    if (!courseData.description.trim()) newErrors.description = 'Description is required';
    if (!courseData.duration) newErrors.duration = 'Duration is required';
    if (!courseData.price) newErrors.price = 'Price is required';
    if (!courseData.category) newErrors.category = 'Category is required';
    if (!courseData.maxStudents) newErrors.maxStudents = 'Max students is required';
    if (!courseData.startDate) newErrors.startDate = 'Start date is required';
    if (!courseData.endDate) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.createCourse({
        ...courseData,
        vendorId: null, // Changed from userInfo.id to null
        price: parseFloat(courseData.price),
        maxStudents: parseInt(courseData.maxStudents),
        duration: parseInt(courseData.duration)
      }, token);

      if (response.success) {
        toast.success('Course created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onCourseAdded(response.data);
        onClose();
        // Reset form
        setCourseData({
          title: '',
          description: '',
          duration: '',
          price: '',
          category: '',
          level: 'Beginner',
          maxStudents: '',
          startDate: '',
          endDate: ''
        });
      }
    } catch (error) {
      console.error('Failed to create course:', error);
      toast.error('Failed to create course. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrors({ submit: 'Failed to create course. Please try again.' });
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
                  <p className="text-sm text-gray-600">Create a new course for your students</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter course title"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe your course"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Duration (in hours) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours) *
                  </label>
                  <input
                    type="number"
                    value={courseData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.duration ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 40"
                    min="1"
                  />
                  {errors.duration && <p className="text-red-600 text-sm mt-1">{errors.duration}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={courseData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 99.99"
                    min="0"
                  />
                  {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Max Students */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Students *
                  </label>
                  <input
                    type="number"
                    value={courseData.maxStudents}
                    onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.maxStudents ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 50"
                    min="1"
                  />
                  {errors.maxStudents && <p className="text-red-600 text-sm mt-1">{errors.maxStudents}</p>}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={courseData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.startDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={courseData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.endDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};