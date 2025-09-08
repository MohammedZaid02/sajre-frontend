import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample course images (replace with your actual image paths)
import digitalImg from "../assets/digital.jpg";
import fashionImg from "../assets/fashion.jpg";
import webImg from "../assets/web.jpg";
import cyberImg from "../assets/cyber.jpg";
import hackingImg from "../assets/hacking.jpg";

export default function Cour() {
  const courses = [
    {
      title: "Digital Marketing",
      img: digitalImg,
      desc: "Learn SEO, social media marketing, Google Ads, and strategies to grow businesses online.",
      details:
        "This course covers advanced SEO techniques, PPC strategies, and social media growth hacks. Perfect for entrepreneurs and marketers.",
      coupon: "DIGI2025",
      discount: "20% OFF",
    },
    {
      title: "Fashion Designing",
      img: fashionImg,
      desc: "Unleash your creativity with sketching, textile design, and modern fashion trends.",
      details:
        "Dive into the world of fashion design, garment making, and branding. Includes hands-on projects and portfolio development.",
      coupon: "STYLE25",
      discount: "25% OFF",
    },
    {
      title: "Web Designing",
      img: webImg,
      desc: "Master UI/UX design, responsive layouts, and front-end development for stunning websites.",
      details:
        "From HTML, CSS, and JavaScript to advanced responsive design and accessibility. Build stunning real-world projects.",
      coupon: "WEB10",
      discount: "10% OFF",
    },
    {
      title: "Cyber Security",
      img: cyberImg,
      desc: "Understand network security, penetration testing, and defense strategies against threats.",
      details:
        "Hands-on learning in threat detection, ethical hacking basics, and network defense. Includes lab simulations.",
      coupon: "SECURE15",
      discount: "15% OFF",
    },
    {
      title: "Ethical Hacking",
      img: hackingImg,
      desc: "Gain hands-on skills in ethical hacking, vulnerability analysis, and digital forensics.",
      details:
        "Learn to identify vulnerabilities, penetration testing methods, and safeguard systems ethically.",
      coupon: "HACKER30",
      discount: "30% OFF",
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div
      className="relative w-full min-h-screen text-[#cdd1d8] overflow-hidden"
      style={{
        background: "radial-gradient(circle, rgba(33,53,85,1) 0%, rgba(62,88,121,1) 50%, rgba(216,196,182,1) 100%)",

      }}
    >
        
      {/* ===== Hero Section ===== */}
      <section className="text-center py-20 px-6 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 text-[#b5bcc6]"
        >
          Explore Our Courses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg max-w-2xl mx-auto text-[#d5dae1]"
        >
          Discover a wide range of industry-focused courses designed to empower
          you with practical skills and future-ready knowledge. Whether you're
          starting fresh or looking to enhance your expertise, we have the right
          program for you.
        </motion.p>
      </section>

      {/* ===== Courses Section ===== */}
      <section
        className={`px-6 md:px-20 py-10 flex flex-col gap-16 transition-all duration-500 ${
          selectedCourse ? "blur-md pointer-events-none" : ""
        }`}
      >
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Card */}
            <div className="bg-white/80 rounded-2xl shadow-lg w-full md:w-1/2 overflow-hidden">
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-64 object-cover rounded-2xl hover:scale-105 transition"
              />
            </div>

            {/* Title + Description + Button */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
              <p className="text-[#d5d9df] mb-4">{course.desc}</p>
              <button
                onClick={() => setSelectedCourse(course)}
                className="mt-2 px-6 py-2 bg-[#555e6b] text-white rounded-lg shadow-md hover:bg-[#3E5879] transition"
              >
                View More
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ===== Course Detail Modal ===== */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 bg-[#627492] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#3E5879] transition"
              >
                ✕
              </button>

              {/* Course Content */}
              <div className="p-8">
                <img
                  src={selectedCourse.img}
                  alt={selectedCourse.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <h2 className="text-3xl font-bold text-[#213555] mb-4">
                  {selectedCourse.title}
                </h2>
                <p className="text-gray-700 mb-4">{selectedCourse.details}</p>

                {/* Coupon & Discount */}
             

                {/* Enroll Button */}
               
                <Link to="/Payment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[#3E5879] text-white rounded-lg shadow-md hover:bg-[#213555] transition"
                  >
                    Enroll Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}