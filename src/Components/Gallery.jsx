import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Eye, Heart, Star, Camera, Brush, ImageIcon, Zap, Sparkles, ArrowRight } from "lucide-react";

// Gallery data with real artwork images
const galleryData = {
  hero: {
    title: "Artistic Masterpieces",
    subtitle: "Journey Through Centuries of Creative Expression",
    description: "Discover breathtaking artworks from classical paintings to contemporary digital art. Each piece tells a story, evokes emotion, and captures the essence of human creativity.",
    featuredImage: "https://images.unsplash.com/photo-1740598307395-3ccc0ec28a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBwYWludGluZ3MlMjBtdXNldW18ZW58MXx8fHwxNzU3MTUyMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  
  classical: {
    title: "Classical Masterpieces",
    description: "Timeless paintings that have shaped the art world for centuries",
    artworks: [
      {
        id: 1,
        title: "Renaissance Glory",
        artist: "Master Unknown",
        year: "15th Century",
        medium: "Oil on Canvas",
        image: "https://images.unsplash.com/photo-1740598307395-3ccc0ec28a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBwYWludGluZ3MlMjBtdXNldW18ZW58MXx8fHwxNzU3MTUyMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A magnificent example of Renaissance artistry, showcasing the period's mastery of light and shadow."
      },
      {
        id: 2,
        title: "Portrait Elegance",
        artist: "Classical Master",
        year: "18th Century",
        medium: "Oil on Canvas",
        image: "https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1NzA1MDMyNnww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "An exquisite portrait capturing the essence and character of the subject with remarkable detail."
      },
      {
        id: 3,
        title: "Landscape Poetry",
        artist: "Nature Virtuoso",
        year: "19th Century",
        medium: "Oil on Canvas",
        image: "https://images.unsplash.com/photo-1703593693038-3a326e089c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBwYWludGluZyUyMG5hdHVyZXxlbnwxfHx8fDE3NTcxNTIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A breathtaking landscape that demonstrates the artist's deep connection with nature."
      }
    ]
  },

  modern: {
    title: "Modern Abstract Art",
    description: "Bold expressions of contemporary creativity and innovative techniques",
    artworks: [
      {
        id: 4,
        title: "Abstract Dreams",
        artist: "Modern Visionary",
        year: "2023",
        medium: "Mixed Media",
        image: "https://images.unsplash.com/photo-1724339289597-6d562f096dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NTcxNTIyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A vibrant explosion of color and form that challenges traditional artistic boundaries."
      },
      {
        id: 5,
        title: "Contemporary Expression",
        artist: "Gallery Artist",
        year: "2024",
        medium: "Acrylic on Canvas",
        image: "https://images.unsplash.com/photo-1631288140270-a1d4f68ff381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1NzA2MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A powerful statement piece that reflects the complexities of modern life."
      }
    ]
  },

  sketches: {
    title: "Sketches & Drawings",
    description: "The raw beauty of pencil on paper - where ideas first come to life",
    artworks: [
      {
        id: 6,
        title: "Pencil Mastery",
        artist: "Sketch Artist",
        year: "2024",
        medium: "Graphite on Paper",
        image: "https://images.unsplash.com/photo-1742130847850-4284808ae5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5jaWwlMjBza2V0Y2hlcyUyMGRyYXdpbmd8ZW58MXx8fHwxNzU3MTUyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "An intricate pencil drawing showcasing incredible attention to detail and shading techniques."
      },
      {
        id: 7,
        title: "Watercolor Wonder",
        artist: "Aqua Artist",
        year: "2024",
        medium: "Watercolor",
        image: "https://images.unsplash.com/photo-1703587820463-31df3ad2d39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhcnR8ZW58MXx8fHwxNzU3MDM2ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A delicate watercolor piece that captures the fluidity and transparency of the medium."
      }
    ]
  },

  digital: {
    title: "Digital Art & Sculptures",
    description: "Where technology meets artistry in the digital age",
    artworks: [
      {
        id: 8,
        title: "Digital Innovation",
        artist: "Tech Artist",
        year: "2024",
        medium: "Digital Art",
        image: "https://images.unsplash.com/photo-1606937492590-2c6e942b1951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1NzAzNjg5NHww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A stunning digital artwork that pushes the boundaries of computer-generated art."
      },
      {
        id: 9,
        title: "Sculptural Form",
        artist: "3D Sculptor",
        year: "2024",
        medium: "Bronze Sculpture",
        image: "https://images.unsplash.com/photo-1750920362984-0a0d44d04577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1NzE1MjI1MXww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A powerful three-dimensional piece that explores form, space, and human emotion."
      },
      {
        id: 10,
        title: "Street Art Culture",
        artist: "Urban Artist",
        year: "2024",
        medium: "Spray Paint",
        image: "https://images.unsplash.com/photo-1628522994788-53bc1b1502c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBncmFmZml0aXxlbnwxfHx8fDE3NTcwNDY4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Vibrant street art that brings color and life to urban environments."
      }
    ]
  }
};

// Floating Art Elements
const FloatingArtElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
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
            opacity: [0, 0.4, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 4 === 0 ? (
            <Palette className="w-6 h-6 text-[#D8C4B6]/30" />
          ) : i % 4 === 1 ? (
            <Brush className="w-5 h-5 text-[#F5EFE7]/20" />
          ) : i % 4 === 2 ? (
            <ImageIcon className="w-4 h-4 text-[#3E5879]/25" />
          ) : (
            <Sparkles className="w-7 h-7 text-[#213555]/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Custom Gallery Card Component
const GalleryCard = ({ artwork, index, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: isLarge ? 1.02 : 1.05,
        rotateY: isLarge ? 2 : 5,
        boxShadow: "0 30px 60px rgba(245, 239, 231, 0.2)"
      }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-gradient-to-br from-[#F5EFE7]/10 to-[#D8C4B6]/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[#F5EFE7]/20 group cursor-pointer ${
        isLarge ? 'col-span-2 row-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-96' : 'h-64'}`}>
        <motion.img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#213555]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Floating Action Buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 backdrop-blur-sm rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/80 text-white' 
                    : 'bg-[#F5EFE7]/20 text-[#F5EFE7] hover:bg-[#F5EFE7]/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-[#F5EFE7]/20 backdrop-blur-sm rounded-full text-[#F5EFE7] hover:bg-[#F5EFE7]/30 transition-all duration-300"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="px-3 py-1 bg-[#D8C4B6]/90 backdrop-blur-sm rounded-full text-[#213555] font-medium text-sm"
          >
            {artwork.medium}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <motion.h3
          className="text-xl font-semibold text-[#F5EFE7] mb-2 group-hover:text-[#D8C4B6] transition-colors duration-300"
        >
          {artwork.title}
        </motion.h3>
        <p className="text-[#F5EFE7]/80 text-sm mb-2">by {artwork.artist}</p>
        <p className="text-[#D8C4B6] text-sm mb-3 font-medium">{artwork.year}</p>
        <p className="text-[#F5EFE7]/70 text-sm leading-relaxed mb-4">
          {artwork.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#F5EFE7]/60 text-sm">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {Math.floor(Math.random() * 1000) + 100}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {Math.floor(Math.random() * 100) + 20}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="text-[#D8C4B6] hover:text-[#F5EFE7] transition-colors duration-300 flex items-center gap-1 text-sm font-medium"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Decorative line */}
        <motion.div
          className="w-12 h-0.5 bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = ({ title, description, icon: Icon }) => (
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
      <Icon className="w-16 h-16 text-[#D8C4B6] mx-auto" />
    </motion.div>
    
    <h2 className="text-4xl md:text-5xl font-bold text-[#F5EFE7] mb-6">
      {title}
    </h2>
    
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="max-w-3xl mx-auto text-center text-[#F5EFE7]/80 text-lg"
    >
      {description}
    </motion.p>
  </motion.div>
);

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [galleryData.hero.featuredImage, galleryData.classical.artworks[0].image, galleryData.modern.artworks[0].image];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#D8C4B6]">
      {/* Background Effects */}
      <FloatingArtElements />

      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 70%, #213555 0%, transparent 60%), radial-gradient(circle at 70% 30%, #3E5879 0%, transparent 60%), radial-gradient(circle at 50% 90%, #D8C4B6 0%, transparent 60%)",
              "radial-gradient(circle at 70% 80%, #213555 0%, transparent 60%), radial-gradient(circle at 20% 40%, #3E5879 0%, transparent 60%), radial-gradient(circle at 80% 20%, #D8C4B6 0%, transparent 60%)",
              "radial-gradient(circle at 90% 20%, #213555 0%, transparent 60%), radial-gradient(circle at 10% 80%, #3E5879 0%, transparent 60%), radial-gradient(circle at 40% 60%, #D8C4B6 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Artistic background elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-[#F5EFE7]/10 rounded-full blur-2xl"
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
              <Palette className="w-20 h-20 text-[#D8C4B6]" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#F5EFE7] mb-6">
              {galleryData.hero.title}
              <motion.span
                className="block text-4xl md:text-5xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent mt-2"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {galleryData.hero.subtitle}
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[#F5EFE7]/90 mb-10 text-lg leading-relaxed"
            >
              {galleryData.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(216, 196, 182, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg border border-[#213555]/20 flex items-center gap-3"
              >
                <Camera className="w-5 h-5" />
                Explore Gallery
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(62, 88, 121, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3E5879]/20 to-[#213555]/20 backdrop-blur-sm text-[#F5EFE7] font-semibold border border-[#F5EFE7]/20 hover:bg-[#F5EFE7]/10 transition-all duration-300 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Featured Artists
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#F5EFE7]/20">
              {/* Artistic frame decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D8C4B6]/30 to-[#F5EFE7]/30 rounded-3xl blur-lg"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute w-full h-full"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img
                    src={heroImages[currentImageIndex]}
                    alt="Featured Artwork"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213555]/40 via-transparent to-[#D8C4B6]/20"></div>
                </motion.div>
              </AnimatePresence>

              {/* Image indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroImages.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                      i === currentImageIndex ? 'bg-[#F5EFE7] scale-125' : 'bg-[#F5EFE7]/40 hover:bg-[#F5EFE7]/70'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentImageIndex(i)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Classical Masterpieces Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <SectionHeader 
          title={galleryData.classical.title}
          description={galleryData.classical.description}
          icon={Brush}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData.classical.artworks.map((artwork, index) => (
              <GalleryCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
                isLarge={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Modern Abstract Art Section ===== */}
   

      {/* ===== Sketches & Drawings Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <SectionHeader 
          title={galleryData.sketches.title}
          description={galleryData.sketches.description}
          icon={Brush}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryData.sketches.artworks.map((artwork, index) => (
              <GalleryCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Digital Art & Sculptures Section ===== */}
      <section className="relative w-full min-h-screen py-20 px-6 overflow-hidden">
        <SectionHeader 
          title={galleryData.digital.title}
          description={galleryData.digital.description}
          icon={Camera}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData.digital.artworks.map((artwork, index) => (
              <GalleryCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
                isLarge={index === 1}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center relative z-10"
        >
          <h3 className="text-3xl font-bold text-[#F5EFE7] mb-6">
            Ready to Start Your Own Artistic Journey?
          </h3>
          <p className="text-[#F5EFE7]/80 mb-8 text-lg max-w-2xl mx-auto">
            Join our community of artists and creators. Showcase your work, learn from masters, and be part of the artistic revolution.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(216, 196, 182, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg border border-[#213555]/20 flex items-center gap-3 mx-auto text-lg"
          >
            <Star className="w-6 h-6" />
            Join Our Gallery
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}