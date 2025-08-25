import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaPlayCircle } from "react-icons/fa";

// Enhanced slide data with more meaningful content and better image paths
const slides = [
  {
    title: "Innovative Solutions",
    headline: "Transform Your Business Digital Presence",
    description:
      "Award-winning web applications and stunning interfaces that elevate your brand and drive customer engagement.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Use local images instead of external URLs
    ctaLabel: "Our Services",
    ctaLink: "/services",
  },
  {
    title: "Expert Development",
    headline: "Built for Performance & Growth",
    description:
      "Scalable technology solutions that adapt to your evolving business needs with industry-leading practices.",
    image: "http://demo.joomlabuff.com/growth/images/joomlabuff/slideshow/home-1/slider-2.jpg",
    ctaLabel: "View Portfolio",
    ctaLink: "/portfolio",
  },
  {
    title: "Strategic Partnership",
    headline: "Your Vision, Our Expertise",
    description:
      "Collaborative approach to deliver results that exceed expectations and create lasting business value.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ctaLabel: "Contact Us",
    ctaLink: "/contact",
  },
];

// Improved animations with optimized timing
const transition = { 
  duration: 0.7, 
  ease: [0.32, 0.72, 0.35, 1.12] 
};

export default function EnhancedHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = 7000; // Slightly longer for better user experience

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Improved auto-slide logic with pause function
  useEffect(() => {
    if (!isHovered && !isPaused) {
      const timer = setInterval(handleNext, slideInterval);
      return () => clearInterval(timer);
    }
  }, [current, isHovered, isPaused, handleNext]);

  const { title, headline, description, image, ctaLabel, ctaLink } = slides[current];

  // Function to handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero image slider"
    >
      {/* Background images with improved transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: direction > 0 ? 1.1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: direction > 0 ? 0.9 : 1.1 }}
          transition={transition}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </motion.div>
      </AnimatePresence>

      {/* Main content container with improved layout */}
      <div className="container mx-auto px-6 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center h-full">
          {/* Left empty space for larger screens */}
          <div className="hidden md:block"></div>
          
          {/* Central content area */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              initial={{ y: direction > 0 ? 80 : -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -80 : 80, opacity: 0 }}
              transition={transition}
              className="col-span-2 md:col-span-1 text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className="mb-2"
              >
                <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide">
                  {title}
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                {headline}
              </motion.h1>

              <motion.p 
                className="text-lg opacity-90 mb-8 max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.4 }}
              >
                {description}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.5 }}
              >
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full text-base font-medium transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                >
                  {ctaLabel}
                  <FaArrowRight className="ml-1 text-sm transition-transform group-hover:translate-x-1" />
                </a>
                
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-3 bg-transparent text-white border border-white/50 px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10"
                >
                  <FaPlayCircle className="text-lg" />
                  <span>Watch Video</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Right empty space - only for larger screens */}
          <div className="hidden md:block"></div>
        </div>
      </div>

      {/* Enhanced navigation controls with better visual feedback */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-6 sm:px-12 z-20">
        <div className="flex gap-4">
          <motion.button
            onClick={handlePrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-sm" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <FaArrowRight className="text-sm" />
          </motion.button>
        </div>

        {/* Slide indicator pills */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current ? "true" : "false"}
              className="group relative"
            >
              <motion.div 
                className={`w-12 h-1 rounded-full ${
                  idx === current ? "bg-white" : "bg-white/30"
                } transition-all duration-300 group-hover:bg-white/80`}
                animate={{
                  width: idx === current && !isPaused ? [48, 48, 0] : 48,
                }}
                transition={{
                  duration: idx === current ? slideInterval/1000 : 0,
                  times: [0, 0.1, 1],
                  ease: "linear",
                  repeat: idx === current && !isPaused ? Infinity : 0,
                  repeatDelay: 0,
                }}
              />
              {idx === current && (
                <motion.span 
                  className="absolute top-0 left-0 text-xs text-white opacity-0 transform -translate-y-6 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {idx + 1}/{slides.length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        

      </motion.div>

      {/* Pause/Play button for accessibility */}
      <motion.button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-8 right-8 bg-black/20 backdrop-blur-sm text-white/80 p-2 rounded-full z-20 hover:bg-black/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        <span className="sr-only">{isPaused ? "Play" : "Pause"} slideshow</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          {isPaused ? (
            <path d="M4 3.5L12 8L4 12.5V3.5Z" />
          ) : (
            <>
              <rect x="3" y="3" width="3.5" height="10" rx="1" />
              <rect x="9.5" y="3" width="3.5" height="10" rx="1" />
            </>
          )}
        </svg>
      </motion.button>
    </div>
  );
}