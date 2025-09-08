import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Target, BookOpen, Lightbulb, Globe, Scissors, Code, Shield, Lock, Sparkles, ChevronDown, HelpCircle } from "lucide-react";

// ====== Images ======
import ai2 from "../assets/ai2.jpg";
import ai3 from "../assets/ai3.jpg";
import img2 from "../assets/ai1.jpg";
import ai4 from "../assets/ai4.jpg";
import ai5 from "../assets/ai5.jpg";
import art1 from "../assets/art1.jpg";
import art2 from "../assets/art2.jpg";
import art3 from "../assets/art3.jpg";

import digitalImg from "../assets/digital.jpg";
import fashionImg from "../assets/fashion.jpg";
import webImg from "../assets/web.jpg";
import cyberImg from "../assets/cyber.jpg";
import hackingImg from "../assets/hacking.jpg";

// Carousel slides
const slides = [
  { image: ai2, title: "Turn Your Creativity Into Recognition", description: "Turn Your Creativity Into Recognition. Step Into the National Art Summit Now!" },
  { image: ai3, title: "Join India's Creative Movement", description: "Join India's Creative Movement" },
  { image: img2, title: "Where Passion Meets Recognition", description: "Where Passion Meets Recognition" },
  { image: ai4, title: "Your Art, Your Story", description: "Your Art, Your Story Indias Stage" },
  { image: ai5, title: "Where Passion Meets Recognition", description: "Where Passion Meets Recognition" },
];

// Extra images for ImageSlider
const sliderImages = [art1, art2, art3];

// Courses data
const courses = [
  {
    title: "Digital Marketing",
    description: "Master SEO, SEM, and social media strategies for business growth.",
    image: digitalImg,
    icon: <Globe className="w-10 h-10 text-[#D8C4B6]" />,
  },
  {
    title: "Fashion Designing",
    description: "Unleash your creativity with modern fashion design techniques.",
    image: fashionImg,
    icon: <Scissors className="w-10 h-10 text-[#D8C4B6]" />,
  },
  {
    title: "Web Designing",
    description: "Learn to create stunning, responsive, and user-friendly websites.",
    image: webImg,
    icon: <Code className="w-10 h-10 text-[#D8C4B6]" />,
  },
  {
    title: "Cyber Security",
    description: "Protect systems and networks with cutting-edge security practices.",
    image: cyberImg,
    icon: <Shield className="w-10 h-10 text-[#D8C4B6]" />,
  },
  {
    title: "Ethical Hacking",
    description: "Learn penetration testing and ethical hacking to secure systems.",
    image: hackingImg,
    icon: <Lock className="w-10 h-10 text-[#D8C4B6]" />,
  },
];

// FAQ data
const faqData = [
  {
    question: "What is the National Art Hunt(NAH)?",
    answer: "The National Art Summit (NAH) is a nationwide creative competition organized by Sajre Edutech, designed to give visibility to emerging and professional artists across India. It includes multiple age categories, exciting themes, and attractive rewards."
  },
  {
    question: "Who can participate in NAH?",
    answer: "Anyone aged 9 years and above can participate, with categories for Juniors, Teens, Youth, and Professional Artists.."
  },
  {
    question:"How many rounds are there in NAH?",
    answer: "NAH has three rounds: Round 1 : Online Submission Round 2 : Online Creative Challenge Round 3 : Offline Grand Finale"
  },
  {
    question: " Can schools, colleges, and organizations enroll their students?",
    answer: "Yes! Institutions can register multiple participants and avail special benefits.."
  },
  {
    question: "Is there a deadline for registration?",
    answer: "Yes, registrations close before the first round begins. We recommend registering early to confirm your spot."
  },
  {
    question: "Is the event online or offline?",
    answer: "Rounds 1 & 2 are online, and Round 3 (Grand Finale) is offline at a designated venue.."
  },
  {
    question: "Who can I contact for more details?",
    answer: "You can reach us via our official contact page or email us at support@sajreedutech.com."
  },
  
];

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#D8C4B6]/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Animated brush strokes
const BrushStrokes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-2 bg-gradient-to-r from-transparent via-[#D8C4B6]/20 to-transparent rounded-full"
          initial={{ x: -400, y: Math.random() * window.innerHeight }}
          animate={{
            x: window.innerWidth + 400,
            rotate: Math.random() * 20 - 10,
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Geometric shapes animation
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i % 3 === 0 ? 'w-16 h-16' : i % 3 === 1 ? 'w-12 h-12' : 'w-8 h-8'
          } ${
            i % 4 === 0 ? 'bg-[#3E5879]/10' :
            i % 4 === 1 ? 'bg-[#D8C4B6]/10' :
            i % 4 === 2 ? 'bg-[#F5EFE7]/10' : 'bg-[#213555]/10'
          } ${
            i % 2 === 0 ? 'rounded-full' : 'rounded-lg'
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: -100,
            rotate: 360,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Custom FAQ Accordion Component
const FAQAccordion = ({ faqData }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full">
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="border-b border-[#F5EFE7]/20 group"
        >
          <motion.button
            onClick={() => toggleItem(index)}
            whileHover={{ backgroundColor: "rgba(245, 239, 231, 0.05)" }}
            className="w-full text-left py-6 px-4 rounded-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 bg-gradient-to-br from-[#3E5879]/20 to-[#213555]/20 rounded-full"
                >
                  <HelpCircle className="w-5 h-5 text-[#D8C4B6]" />
                </motion.div>
                <span className="text-[#F5EFE7] text-lg font-medium hover:text-[#D8C4B6] transition-colors duration-300">
                  {faq.question}
                </span>
              </div>
              <motion.div
                animate={{ 
                  rotate: openItems.has(index) ? 180 : 0,
                  scale: openItems.has(index) ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#D8C4B6]" />
              </motion.div>
            </div>
          </motion.button>

          <AnimatePresence>
            {openItems.has(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="pb-6 px-16"
                >
                  <div className="bg-gradient-to-[#213555]/20 from-[#F5EFE7]/5 to-transparent rounded-xl p-4 border-l-4 border-[#D8C4B6]/50">
                    <p className="text-[#F5EFE7]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [angle, setAngle] = useState(0);
  const [index, setIndex] = useState(0);

  // Rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.2);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  // Auto slide for image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      {/* Background animations */}
      <FloatingParticles />
      <BrushStrokes />
      <GeometricShapes />

      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #213555 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3E5879 0%, transparent 50%), radial-gradient(circle at 40% 40%, #D8C4B6 0%, transparent 50%)",
              "radial-gradient(circle at 60% 70%, #213555 0%, transparent 50%), radial-gradient(circle at 30% 30%, #3E5879 0%, transparent 50%), radial-gradient(circle at 70% 60%, #D8C4B6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 30%, #213555 0%, transparent 50%), radial-gradient(circle at 20% 70%, #3E5879 0%, transparent 50%), radial-gradient(circle at 50% 80%, #D8C4B6 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-[#d8c4b6] via-[#213555] to-[#3E5879] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Artistic paint splashes */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-[#F5EFE7]/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-[#D8C4B6]/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            {/* <Sparkles className="w-16 h-16 text-[#F5EFE7] mx-auto mb-4 " /> */}
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#F5EFE7] mb-6 relative mt-20">
            Welcome to Our 
            <motion.span
              className="block bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
               Art World
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl text-[#F5EFE7]/90 mb-10 text-lg"
          >
            Join India's Creative Movement — Connect with young artists and mentors nationwide.
          </motion.p>
        </motion.div>

        {/* Enhanced Carousel with artistic frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative z-10"
        >
          <div className="relative w-[500px] h-[350px] mx-auto mt-8">
            {/* Artistic frame decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D8C4B6]/30 to-[#F5EFE7]/30 rounded-3xl blur-sm"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#3E5879]/20 to-[#213555]/20 rounded-2xl"></div>
            
            <div
              className="relative w-full h-full"
              style={{ perspective: "1000px" }}
            >
              <div
                className="absolute inset-0 m-auto"
                style={{
                  width: "300px",
                  height: "200px",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg)`,
                  transition: "transform 0.05s linear",
                }}
              >
                {slides.map((slide, i) => (
                  <div
                    key={i}
                    className="absolute w-[300px] h-[200px] shadow-2xl rounded-xl overflow-hidden border-2 border-[#F5EFE7]/20"
                    style={{
                      transform: `rotateY(${i * (360 / slides.length)}deg) translateZ(320px)`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end px-4 pb-4">
                        <h3 className="text-lg font-bold text-white mb-2 text-center">{slide.title}</h3>
                        <p className="text-xs text-gray-200 text-center">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex gap-6 relative z-10"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(62, 88, 121, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3E5879] to-[#213555] text-[#F5EFE7] font-semibold hover:from-[#213555] hover:to-[#3E5879] transition-all duration-300 shadow-lg border border-[#F5EFE7]/20"
          >
            Register Now
          </motion.button> */}
          
        </motion.div>
      </section>

      {/* ===== Mission & Aim Section ===== */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-[#213555] via-[#3e5879] to-[#d8c4b6] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Artistic background elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F5EFE7]/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-[#F5EFE7] text-center mb-6 relative z-10"
        >
          Our Mission & 
          <span className="block bg-gradient-to-r from-[#3E5879] via-[#d8c4b6] to-[#213555] bg-clip-text text-transparent">
            Creative Aim
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl text-center text-[#F5EFE7]/80 mb-16 text-lg relative z-10"
        >
          Empowering education through AI and technology. At EduTech, our mission
          is to make learning more interactive, personalized, and accessible for
          everyone across the globe through the power of artistic innovation.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full relative z-10">
          {[
            { icon: Target, title: "Our Mission", desc: "To revolutionize education through AI-powered tools that make learning engaging and effective.", delay: 0.2 },
            { icon: Lightbulb, title: "Our Aim", desc: "To provide accessible and personalized learning experiences, preparing students for the future.", delay: 0.4 },
            { icon: BookOpen, title: "Interactive Learning", desc: "Creating engaging platforms where students and educators collaborate with cutting-edge tools.", delay: 0.6 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(245, 239, 231, 0.1)"
              }}
              transition={{ duration: 0.7, delay: item.delay }}
              className="bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-[#F5EFE7]/20 group relative overflow-hidden"
            >
              {/* Artistic background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D8C4B6] to-transparent rounded-2xl"></div>
              </div>
              
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className="mb-6 p-4 bg-gradient-to-br from-[#3E5879]/20 to-[#213555]/20 rounded-full backdrop-blur-sm"
              >
                <item.icon className="w-12 h-12 text-[#D8C4B6]" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-[#F5EFE7] mb-4 relative z-10">{item.title}</h3>
              <p className="text-sm text-[#F5EFE7]/80 relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Image Slider Section ===== */}
      <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-[#3e5879] via-[#d8c4b6] to-[#3E5879] flex items-center justify-center px-6 overflow-hidden">
        {/* Artistic frame elements */}
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 border-4 border-[#F5EFE7]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 border-4 border-[#D8C4B6]/30 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative w-full max-w-6xl h-[450px] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#F5EFE7]/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute w-full h-full"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src={sliderImages[index]}
                alt={`Art Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#213555]/40 via-transparent to-[#D8C4B6]/20"></div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {sliderImages.map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  i === index ? 'bg-[#F5EFE7] scale-125' : 'bg-[#F5EFE7]/40 hover:bg-[#F5EFE7]/70'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Courses Offered Section ===== */}
      <section className="relative w-full min-h-screen bg-gradient-to-tl from-[#213555] via-[#3E5879] to-[#D8C4B6] py-20 px-6 flex flex-col items-center overflow-hidden">
        {/* Artistic elements */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-[#F5EFE7]/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-[#F5EFE7] text-center mb-12 relative z-10"
        >
          Creative 
          <span className="block bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent">
            Courses Offered
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full relative z-10">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(245, 239, 231, 0.15)"
              }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[#F5EFE7]/20 group relative"
            >
              {/* Image container with artistic overlay */}
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-48"
                >
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#213555]/60 via-transparent to-transparent"></div>
                
                {/* Floating icon */}
                <motion.div
                  className="absolute top-4 right-4 p-3 bg-[#F5EFE7]/20 backdrop-blur-sm rounded-full"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                >
                  {course.icon}
                </motion.div>
              </div>

              <div className="p-8 text-center relative">
                {/* Artistic background pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-[#3E5879] via-transparent to-[#D8C4B6] rounded-b-3xl"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-[#F5EFE7] mb-4 relative z-10">
                  {course.title}
                </h3>
                <p className="text-sm text-[#F5EFE7]/80 leading-relaxed relative z-10">
                  {course.description}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] mx-auto mt-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative w-full min-h-screen bg-gradient-to-br from-[#3E5879] via-[#213555] to-[#D8C4B6] py-20 px-6 flex flex-col items-center overflow-hidden">
  {/* Background effects */}
  <motion.div
    className="absolute top-10 right-10 w-60 h-60 bg-gradient-to-br from-[#F5EFE7]/5 to-transparent rounded-full blur-3xl"
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 12, repeat: Infinity }}
  />
  <motion.div
    className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-[#D8C4B6]/10 to-transparent rounded-full blur-2xl"
    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
    transition={{ duration: 18, repeat: Infinity }}
  />

  {/* Title */}
  <motion.h2
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-2xl md:text-2xl font-bold text-[#F5EFE7] text-center mb-12 relative z-10"
  >
  National Art Hunt (2025)event
    <span className="block bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent">
  At Sajre Edutech, we understand that learners and participants often have questions
    </span>
  </motion.h2>

  {/* FAQ Accordion */}
  <div className="max-w-4xl w-full relative z-10">
    <FAQAccordion faqData={faqData} />
  </div>



        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center relative z-10"
        >
          <p className="text-[#F5EFE7]/80 mb-6 text-lg">
            Still have questions? We'd love to help you get started!
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 35px rgba(216, 196, 182, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg border border-[#213555]/20 flex items-center gap-3 mx-auto"
          >
            <HelpCircle className="w-5 h-5" />
            Contact Support
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}