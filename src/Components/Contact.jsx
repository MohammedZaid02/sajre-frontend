import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../Utils/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreeToTerms: false, // Added for new UI
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string }

  // Auto-dismiss notification after 5 seconds (kept from original)
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.agreeToTerms) {
      setSubmitStatus({ type: 'error', message: 'You must agree to the Terms of Service.' });
      setIsSubmitting(false);
      return;
    }

    console.log("Form submitted:", formData);

    try {
      await api.contactUs(formData);
      setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        agreeToTerms: false, // Reset checkbox
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative py-16 bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#D8C4B6]"
    >
      {/* Contact form container */}
      <div className="relative z-10 w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
        <p className="text-gray-700 mb-6 max-w-xl">
          If you have questions, feedback, or need to report an issue, just send
          us a message — we’re here to help!
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Before sending your message, check out our{" "}
          <a href="#" className="underline text-blue-600 hover:text-blue-800">
            support pages
          </a>{" "}
          for common questions. You can also check our{" "}
          <a href="#" className="underline text-blue-600 hover:text-blue-800">
            service status
          </a>{" "}
          at any time and sign up for updates.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name (from original) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Your email address{" "}
              <span className="text-gray-500">(so we can reply to you)</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* Phone (from original) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
          </div>

          {/* Subject (from new UI, but keeping original functionality) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Subject</label>
            <input
              name="subject"
              type="text"
              placeholder="Let us know how we can help you"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* Request (from new UI, but mapping to original 'message') */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Your request
            </label>
            <textarea
              name="message" // Changed from 'request' to 'message' to match original formData
              rows="5"
              placeholder="Include as much detail as you can"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              You can include files (documents, screen recordings, screenshots,
              crash logs, etc.) by uploading them to any third-party file
              sharing service (e.g., Dropbox, Google Drive, Microsoft OneDrive,
              WeTransfer) and pasting the URL above. Please ensure correct
              sharing permissions have been set. All text is 100% confidential.
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 text-gray-700">
            <label className="flex items-start text-sm cursor-pointer">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2 mt-1"
              />
              I’ve read and agree to Sketch’s{" "}
              <a href="#" className="underline text-blue-600 hover:text-blue-800 ml-1">
                Terms of Service
              </a>{" "}
              and <a href="#" className="underline text-blue-600 hover:text-blue-800">Privacy Statement</a>
            </label>
            {/* Removed 'wantsUpdates' checkbox as it's not in original formData */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#3E5879] to-[#213555] text-white font-semibold rounded-lg shadow-md hover:from-[#213555] hover:to-[#3E5879] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>

        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 p-3 rounded-lg text-sm ${
                submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}