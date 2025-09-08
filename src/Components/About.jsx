import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import { FaPiggyBank, FaGlobeAsia, FaUsers, FaProjectDiagram, FaBullseye, FaUserTie, FaUserGraduate, FaChalkboardTeacher, FaUserCog } from "react-icons/fa";

function About() {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-[#F5EFE7] via-[#D8C4B6] to-[#3E5879] text-[#213555] overflow-hidden">
      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#213555] overflow-hidden"
      >
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D8C4B6] rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, null],
              x: [null, Math.random() * 100 - 50, null],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Company Name with Enhanced Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-[#D8C4B6] to-white bg-clip-text text-transparent drop-shadow-2xl">
              Sajre Edutech
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#D8C4B6] to-transparent mx-auto mt-4 max-w-lg"
            />
          </motion.div>

          {/* Subtitle Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mb-8"
          > 
            <p className="text-2xl md:text-3xl font-light mb-2 text-[#D8C4B6]">
              Pvt Ltd
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 leading-relaxed"
            >
              Sajre Edutech Is Building Bridges Between Education, Creativity, And Real Opportunities.
            </motion.p>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(216, 196, 182, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Explore Our Programs
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "#F5EFE7",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-[#D8C4B6] text-[#D8C4B6] font-semibold rounded-full hover:bg-[#D8C4B6] hover:text-[#213555] transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative 3D Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 md:w-48 md:h-48"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
          }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-[#D8C4B6]/30 to-[#F5EFE7]/20 rounded-3xl blur-xl transform rotate-45"></div>
        </motion.div>

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-20 h-20 md:w-32 md:h-32"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity },
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-[#D8C4B6]/20 to-transparent border-2 border-[#D8C4B6]/30 transform rotate-45"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-16 h-16 md:w-24 md:h-24"
          animate={{
            rotate: [360, 0],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-[#F5EFE7]/20 border border-[#F5EFE7]/40 transform rotate-45"></div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-[#D8C4B6]"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-[#D8C4B6] rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-[#D8C4B6] rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Us with image left */}
 <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="rounded-2xl shadow-lg w-full md:w-1/2 overflow-hidden"
  >
    <img
      src={img1} 
      alt="About Sajre Edutech"
      className="w-full h-full object-cover rounded-2xl"
    />
  </motion.div>

  <div className="md:w-1/2 text-center md:text-left">
    <h2 className="text-3xl font-bold mb-6">About Us</h2>
    <p className="text-2xl font-bold mb-3">
      Empowering Individuals Through Innovative Education Since 2022
    </p>
    <p className="text-lg text-[#3E5879]">
      Founded in 2022, Sajre Edutech Pvt. Ltd. emerged with a clear vision: to
      bridge the persistent gap between conventional academic education and the
      dynamic needs of modern industries. What began as a modest training center
      has evolved into a multifaceted education provider, offering a wide array
      of advanced, industry-aligned programs. From upskilling professionals to
      nurturing fresh talent, we have consistently focused on delivering relevant
      and future-ready learning experiences that keep pace with global trends.
    </p>
  </div>
</section>


      {/* Mission with image right */}
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row-reverse items-center gap-10  rounded-2xl mx-4 md:mx-20 mb-10">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl shadow-lg w-full md:w-1/2"
        >
          <img
      src={img2} 
      alt="About Sajre Edutech"
      className="w-full h-full object-cover rounded-2xl"
    />
        </motion.div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg">
           Our mission is to cultivate a vibrant educational ecosystem where innovation and learning go hand in hand. At Sajre Edutech, we prioritize practical, hands-on instruction that empowers students with real-world skills, ensuring they are not only knowledgeable but truly job-ready. We are committed to transforming education into a powerful tool for personal growth and professional success, guiding individuals toward fulfilling careers and lifelong learning.
          </p>
        </div>
      </section>

      {/* Aim */}
       <section className="py-20 px-6 md:px-20 bg-[#3E5879] text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-white/10 p-4 rounded-full shadow-lg">
            <FaBullseye className="text-5xl text-[#FFD700]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Our Aim
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed text-white/90"
        >
       Our aim at Sajre Edutech Pvt. Ltd. is to transform the landscape of education by bridging the gap between academic learning and real-world industry requirements. We strive to build a future-focused learning ecosystem that emphasizes practical skills, innovation, and accessibility. By offering high-quality, hands-on educational programs, we aim to empower individuals from all backgrounds to achieve professional success, drive meaningful impact, and become adaptive, industry-ready professionals in an ever-evolving global economy.
        </motion.p>
      </div>
    </section>

      {/* Courses */}
   <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-[#F3EEEA] to-white">
  <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-[#213555]">
    Our Courses
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
    {/* Affordable Learning */}
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[#E0DED8] hover:shadow-2xl"
    >
      <div className="mb-4 flex justify-center">
        <FaPiggyBank className="text-4xl text-[#FFD700]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#213555]">Affordable Learning</h3>
      <p className="text-[#3E5879] leading-relaxed">
        High-quality education that's light on your pocket, making knowledge accessible to everyone.
      </p>
    </motion.div>

    {/* National-level Exposure */}
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[#E0DED8] hover:shadow-2xl"
    >
      <div className="mb-4 flex justify-center">
        <FaGlobeAsia className="text-4xl text-[#4FC3F7]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#213555]">National-level Exposure</h3>
      <p className="text-[#3E5879] leading-relaxed">
        Opportunities to showcase your skills and gain recognition across India.
      </p>
    </motion.div>

    {/* Supportive Mentor Community */}
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[#E0DED8] hover:shadow-2xl"
    >
      <div className="mb-4 flex justify-center">
        <FaUsers className="text-4xl text-[#81C784]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#213555]">Supportive Mentor Community</h3>
      <p className="text-[#3E5879] leading-relaxed">
        Learn from experienced mentors who guide, inspire, and support you at every step.
      </p>
    </motion.div>

    {/* Real Project-based Learning */}
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[#E0DED8] hover:shadow-2xl"
    >
      <div className="mb-4 flex justify-center">
        <FaProjectDiagram className="text-4xl text-[#FF8A65]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#213555]">Real Project-based Learning</h3>
      <p className="text-[#3E5879] leading-relaxed">
        Hands-on experience with projects that prepare you for real-world challenges.
      </p>
    </motion.div>
  </div>
</section>

      {/* Founder Message */}
      <section className="py-20 px-6 md:px-20  rounded-3xl mx-4 md:mx-20 mb-12 shadow-xl">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl mx-auto text-center relative"
  >
    {/* Heading */}
    <h2 className="text-4xl font-extrabold mb-8 text-[#213555]">Founder's Message</h2>

    {/* Quote */}
    <p className="text-xl italic text-[#3E5879] leading-relaxed relative px-4">
      At the heart of our vision is a strong commitment to innovation we are dedicated to designing and delivering forward-looking educational programs that not only reflect academic rigor but also respond dynamically to the ever-changing needs of the industry. By actively collaborating with experts across sectors and staying attuned to emerging technologies and trends, we aim to bridge the long-standing gap between theoretical knowledge and practical application. Our programs are built to equip learners with the skills, insights, and adaptability required to thrive in real-world environments, ensuring that education remains relevant, impactful, and future-ready.

At the heart of our vision is a strong commitment to innovation we are dedicated to designing and delivering forward-looking educational programs that not only reflect academic rigor but also respond dynamically to the ever-changing needs of the industry. By actively collaborating with experts across sectors and staying attuned to emerging technologies and trends. <span className="font-bold text-[#213555]">Sajre Edutec</span>, we are committed to
      building a world where learning is limitless and accessible to all."
    </p>

    {/* Founder Info */}
    <div className="mt-8 flex flex-col items-center">
     
      <h3 className="text-lg font-semibold text-[#213555]">[Mr. Sayyed Lathif]</h3>
      <p className="text-sm text-[#3E5879]">CEO & Founder</p>
    </div>
  </motion.div>
</section>

      {/* Our Team */}
    <section className="py-20 px-6 md:px-20 bg-[#3E5879] text-white">
  <h2 className="text-4xl font-extrabold mb-6 text-center">Our Team</h2>
  <p className="text-2xl font-medium mb-12 text-center text-[#D8C4B6]">
    Meet the Experts Behind the Mission
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {/* Member 1 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#213555] rounded-2xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-all"
    >
      <div className="flex justify-center mb-4">
        <FaUserTie className="text-5xl text-[#FFD700]" />
      </div>
      <h3 className="text-xl font-semibold">Mr Lal Sab A J</h3>
    </motion.div>

    {/* Member 2 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-[#213555] rounded-2xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-all"
    >
      <div className="flex justify-center mb-4">
        <FaUserGraduate className="text-5xl text-[#FFD700]" />
      </div>
      <h3 className="text-xl font-semibold">Mr Sajjad Naikwadi</h3>
    </motion.div>

    {/* Member 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-[#213555] rounded-2xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-all"
    >
      <div className="flex justify-center mb-4">
        <FaChalkboardTeacher className="text-5xl text-[#FFD700]" />
      </div>
      <h3 className="text-xl font-semibold">Mrs. Reshma M J</h3>
    </motion.div>

    {/* Member 4 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-[#213555] rounded-2xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-all"
    >
      <div className="flex justify-center mb-4">
        <FaUserCog className="text-5xl text-[#FFD700]" />
      </div>
      <h3 className="text-xl font-semibold">Mr Saleem Kallimani</h3>
    </motion.div>
  </div>
</section>

  
    </div>
  );
}

export default About;