import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Briefcase, Users, Heart, Trophy, MapPin, Clock, Search, Filter, 
  Send, CheckCircle, ArrowRight, Star, Coffee, Wifi, Car, 
  Gamepad2, Plane, GraduationCap, Shield, Zap, Globe
} from "lucide-react";

// Career data
const careerData = {
  hero: {
    title: "Build Your Future",
    subtitle: "With Us",
    description: "Join our innovative team where creativity meets technology. We're looking for passionate individuals who want to make a difference in the world of AI and education.",
    stats: [
      { label: "Team Members", value: "100+", icon: Users },
      { label: "Countries", value: "12", icon: Globe },
      { label: "Projects", value: "500+", icon: Briefcase },
      { label: "Satisfaction", value: "98%", icon: Heart }
    ]
  },
  
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead the development of our next-generation AI-powered educational platform using React, TypeScript, and modern web technologies.",
      requirements: ["React.js expertise", "TypeScript proficiency", "UI/UX design skills", "Team leadership"],
      benefits: ["Remote work", "$120k-$180k", "Stock options", "Health insurance"],
      urgent: true
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "New York / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Design and implement machine learning models to enhance our educational AI systems and improve personalized learning experiences.",
      requirements: ["Python expertise", "TensorFlow/PyTorch", "ML algorithms", "Data analysis"],
      benefits: ["Hybrid work", "$130k-$200k", "Research budget", "Conference attendance"],
      urgent: false
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "London / Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Create intuitive and beautiful user experiences for our educational platform, focusing on accessibility and user engagement.",
      requirements: ["Figma/Sketch expertise", "User research", "Prototyping", "Design systems"],
      benefits: ["Creative freedom", "$90k-$140k", "Design tools budget", "Flexible hours"],
      urgent: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Austin / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Build and maintain scalable cloud infrastructure to support millions of learners worldwide using modern DevOps practices.",
      requirements: ["AWS/Azure expertise", "Kubernetes", "CI/CD pipelines", "Infrastructure as Code"],
      benefits: ["Remote first", "$110k-$160k", "Learning budget", "Health & wellness"],
      urgent: true
    },
    {
      id: 5,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Drive product strategy and roadmap for our AI-powered educational tools, working closely with engineering and design teams.",
      requirements: ["Product strategy", "Data-driven decisions", "Stakeholder management", "Education tech experience"],
      benefits: ["Equity package", "$140k-$190k", "Team retreats", "Professional development"],
      urgent: false
    },
    {
      id: 6,
      title: "Content Strategist",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
      experience: "2+ years",
      description: "Develop engaging content strategies to communicate our mission and connect with educators and learners globally.",
      requirements: ["Content creation", "SEO knowledge", "Social media", "Education background"],
      benefits: ["Flexible schedule", "$60k-$90k", "Creative projects", "Work-life balance"],
      urgent: false
    }
  ],

  benefits: [
    {
      icon: Wifi,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world with flexible hours and async collaboration.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Learning & Growth",
      description: "$5,000 annual learning budget for courses, conferences, and certifications.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Comprehensive Benefits",
      description: "Health, dental, vision insurance plus mental health support and wellness programs.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Coffee,
      title: "Unlimited PTO",
      description: "Take the time you need to recharge with our unlimited paid time off policy.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Plane,
      title: "Annual Retreats",
      description: "Company-wide retreats to beautiful destinations for team building and strategy.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Car,
      title: "Commuter Benefits",
      description: "Transportation stipends, parking allowances, and bike-to-work programs.",
      color: "from-teal-500 to-blue-500"
    }
  ],

  process: [
    {
      step: 1,
      title: "Apply Online",
      description: "Submit your application with resume and portfolio through our easy online form.",
      icon: Send,
      duration: "5 mins"
    },
    {
      step: 2,
      title: "Initial Screening",
      description: "Our talent team will review your application and reach out within 48 hours.",
      icon: Search,
      duration: "2 days"
    },
    {
      step: 3,
      title: "Technical Interview",
      description: "Showcase your skills in a collaborative technical discussion with our team.",
      icon: Zap,
      duration: "1 hour"
    },
    {
      step: 4,
      title: "Final Interview",
      description: "Meet the team and discuss how you'll contribute to our mission and culture.",
      icon: Users,
      duration: "45 mins"
    },
    {
      step: 5,
      title: "Offer & Onboarding",
      description: "Receive your offer and join our comprehensive onboarding program.",
      icon: CheckCircle,
      duration: "1 week"
    }
  ]
};

// Floating Career Elements
const FloatingCareerElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 5 === 0 ? (
            <Briefcase className="w-5 h-5 text-[#D8C4B6]/20" />
          ) : i % 5 === 1 ? (
            <Users className="w-6 h-6 text-[#F5EFE7]/15" />
          ) : i % 5 === 2 ? (
            <Trophy className="w-4 h-4 text-[#3E5879]/25" />
          ) : i % 5 === 3 ? (
            <Heart className="w-5 h-5 text-[#213555]/20" />
          ) : (
            <Star className="w-6 h-6 text-[#D8C4B6]/25" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(245, 239, 231, 0.15)"
      }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[#F5EFE7]/20 group relative"
    >
      {/* Urgent Badge */}
      {job.urgent && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Urgent
          </div>
        </motion.div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[#F5EFE7] mb-2 group-hover:text-[#D8C4B6] transition-colors duration-300">
              {job.title}
            </h3>
            <div className="flex items-center gap-4 text-[#F5EFE7]/70 text-sm">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#D8C4B6] font-semibold text-sm">
              {job.experience}
            </div>
            <div className="text-[#F5EFE7]/60 text-xs">experience</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#F5EFE7]/80 text-sm leading-relaxed mb-6">
          {job.description}
        </p>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mb-6">
                {/* Requirements */}
                <div>
                  <h4 className="text-[#D8C4B6] font-medium text-sm mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#3E5879]/20 text-[#F5EFE7]/80 text-xs rounded-lg"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-[#D8C4B6] font-medium text-sm mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#D8C4B6]/20 text-[#F5EFE7]/80 text-xs rounded-lg"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#D8C4B6] hover:text-[#F5EFE7] transition-colors duration-300 flex items-center gap-1 text-sm font-medium"
          >
            {isExpanded ? 'Show Less' : 'View Details'}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(216, 196, 182, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold rounded-xl hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            Apply Now
          </motion.button>
        </div>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-0.5 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ step, index, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="flex items-center gap-6 relative"
    >
      {/* Step Number */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#D8C4B6] to-[#F5EFE7] rounded-full flex items-center justify-center text-[#213555] font-bold text-lg shadow-lg"
      >
        {step.step}
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <step.icon className="w-5 h-5 text-[#D8C4B6]" />
          <h3 className="text-lg font-semibold text-[#F5EFE7]">{step.title}</h3>
          <span className="text-[#D8C4B6] text-sm font-medium">({step.duration})</span>
        </div>
        <p className="text-[#F5EFE7]/80 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-[#D8C4B6] to-[#F5EFE7]/30"></div>
      )}
    </motion.div>
  );
};

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const departments = ["All", "Engineering", "AI Research", "Design", "Infrastructure", "Product", "Marketing"];
  const jobTypes = ["All", "Full-time", "Part-time", "Contract"];

  const filteredJobs = careerData.jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesType = selectedType === "All" || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#D8C4B6]">
      {/* Background Effects */}
      <FloatingCareerElements />

      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            background: [
              "radial-gradient(circle at 20% 60%, #213555 0%, transparent 60%), radial-gradient(circle at 80% 40%, #3E5879 0%, transparent 60%), radial-gradient(circle at 40% 80%, #D8C4B6 0%, transparent 60%)",
              "radial-gradient(circle at 60% 20%, #213555 0%, transparent 60%), radial-gradient(circle at 30% 70%, #3E5879 0%, transparent 60%), radial-gradient(circle at 70% 50%, #D8C4B6 0%, transparent 60%)",
              "radial-gradient(circle at 40% 40%, #213555 0%, transparent 60%), radial-gradient(circle at 80% 80%, #3E5879 0%, transparent 60%), radial-gradient(circle at 20% 20%, #D8C4B6 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Artistic background elements */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-[#F5EFE7]/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-[#D8C4B6]/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Briefcase className="w-20 h-20 text-[#D8C4B6]" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#F5EFE7] mb-6">
              {careerData.hero.title}
              <motion.span
                className="block text-4xl md:text-6xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent mt-2"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {careerData.hero.subtitle}
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[#F5EFE7]/90 mb-10 text-lg leading-relaxed"
            >
              {careerData.hero.description}
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {careerData.hero.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-[#D8C4B6] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#F5EFE7] mb-1">{stat.value}</div>
                  <div className="text-[#F5EFE7]/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(216, 196, 182, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg border border-[#213555]/20 flex items-center gap-3"
              >
                <Search className="w-5 h-5" />
                View Open Positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(62, 88, 121, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3E5879]/20 to-[#213555]/20 backdrop-blur-sm text-[#F5EFE7] font-semibold border border-[#F5EFE7]/20 hover:bg-[#F5EFE7]/10 transition-all duration-300 flex items-center gap-3"
              >
                <Users className="w-5 h-5" />
                Learn About Culture
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              "https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc1NzA4MTQ1MHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBvZmZpY2V8ZW58MXx8fHwxNzU3MTE5MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1617035969161-f6d66f95445e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wfGVufDF8fHx8MTc1NzA4MzUzNHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1686771416537-bf4a4f263d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NzA4MTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`overflow-hidden rounded-2xl shadow-lg border-2 border-[#F5EFE7]/20 ${
                  index === 0 ? 'row-span-2' : index === 3 ? 'col-span-2' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Team ${index + 1}`}
                  className={`w-full object-cover ${
                    index === 0 ? 'h-full' : index === 3 ? 'h-32' : 'h-24'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#213555]/40 via-transparent to-transparent"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Job Openings Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Search className="w-16 h-16 text-[#D8C4B6] mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5EFE7] mb-6">
            Open Positions
            <span className="block text-3xl md:text-4xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent mt-2">
              Join Our Team
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-[#F5EFE7]/80 text-lg"
          >
            Discover exciting opportunities to grow your career and make an impact. 
            We're always looking for talented individuals to join our mission.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-6xl mx-auto mb-12 relative z-10"
        >
          <div className="bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-2xl shadow-xl border border-[#F5EFE7]/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#F5EFE7]/60" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#3E5879]/20 border border-[#F5EFE7]/20 rounded-xl text-[#F5EFE7] placeholder-[#F5EFE7]/60 focus:outline-none focus:ring-2 focus:ring-[#D8C4B6]/50 transition-all duration-300"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 bg-[#3E5879]/20 border border-[#F5EFE7]/20 rounded-xl text-[#F5EFE7] focus:outline-none focus:ring-2 focus:ring-[#D8C4B6]/50 transition-all duration-300"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-[#213555] text-[#F5EFE7]">
                    {dept}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-[#3E5879]/20 border border-[#F5EFE7]/20 rounded-xl text-[#F5EFE7] focus:outline-none focus:ring-2 focus:ring-[#D8C4B6]/50 transition-all duration-300"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type} className="bg-[#213555] text-[#F5EFE7]">
                    {type}
                  </option>
                ))}
              </select>

              {/* Results Count */}
              <div className="flex items-center justify-center text-[#F5EFE7]/70">
                <Filter className="w-4 h-4 mr-2" />
                {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </motion.div>

        {/* Job Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#F5EFE7]/70 mt-12"
          >
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No positions match your search criteria.</p>
            <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </section>

      {/* ===== Benefits & Culture Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-[#D8C4B6] mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5EFE7] mb-6">
            Why Choose Us
            <span className="block text-3xl md:text-4xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent mt-2">
              Amazing Benefits
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-[#F5EFE7]/80 text-lg"
          >
            We believe in taking care of our team. From comprehensive benefits to flexible work arrangements,
            we're committed to creating an environment where you can thrive.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {careerData.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(245, 239, 231, 0.15)"
              }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[#F5EFE7]/20 group relative p-8 text-center"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.color} rounded-3xl`}></div>
              </div>
              
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className="mb-6 p-4 bg-gradient-to-br from-[#3E5879]/20 to-[#213555]/20 rounded-full w-fit mx-auto"
              >
                <benefit.icon className="w-8 h-8 text-[#D8C4B6]" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-[#F5EFE7] mb-4 relative z-10">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#F5EFE7]/80 leading-relaxed relative z-10">
                {benefit.description}
              </p>

              {/* Decorative line */}
              <motion.div
                className="w-12 h-0.5 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] mx-auto mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Application Process Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <CheckCircle className="w-16 h-16 text-[#D8C4B6] mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5EFE7] mb-6">
            Our Hiring Process
            <span className="block text-3xl md:text-4xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent mt-2">
              Simple & Transparent
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-[#F5EFE7]/80 text-lg"
          >
            We've designed our hiring process to be straightforward and respectful of your time.
            Here's what you can expect when you apply.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          {careerData.process.map((step, index) => (
            <ProcessStep 
              key={step.step} 
              step={step} 
              index={index}
              isLast={index === careerData.process.length - 1}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center relative z-10"
        >
          <h3 className="text-3xl font-bold text-[#F5EFE7] mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-[#F5EFE7]/80 mb-8 text-lg max-w-2xl mx-auto">
            Join our team of innovators and help us shape the future of education technology.
            Your next career adventure awaits!
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(216, 196, 182, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg border border-[#213555]/20 flex items-center gap-3 mx-auto text-lg"
          >
            <Send className="w-6 h-6" />
            Apply Today
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

     
    </div>
  );
}