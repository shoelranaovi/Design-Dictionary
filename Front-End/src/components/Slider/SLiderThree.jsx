import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaPlayCircle, FaPause } from "react-icons/fa";
import { useSwipeable } from "react-swipeable"; // For swipe support
import { useInView } from "react-intersection-observer"; // For lazy loading

// Enhanced slide data with theme colors for dynamic gradients
const slides = [
  {
    title: "Innovative Solutions",
    headline: "Transform Your Business Digital Presence",
    description:
      "Award-winning web applications and stunning interfaces that elevate your brand and drive customer engagement.",
    image: "",
    ctaLabel: "Our Services",
    ctaLink: "/services",
    theme: { primary: "#4f46e5", secondary: "#a5b4fc" },
  },
  {
    title: "Expert Development",
    headline: "Built for Performance & Growth",
    description:
      "Scalable technology solutions that adapt to your evolving business needs with industry-leading practices.",
    image: "",
    ctaLabel: "View Portfolio",
    ctaLink: "/portfolio",
    theme: { primary: "#15803d", secondary: "#86efac" },
  },
  {
    title: "Strategic Partnership",
    headline: "Your Vision, Our Expertise",
    description:
      "Collaborative approach to deliver results that exceed expectations and create lasting business value.",
    image: "",
    ctaLabel: "Contact Us",
    ctaLink: "/contact",
    theme: { primary: "#b91c1c", secondary: "#fecaca" },
  },
];

// Animation variants for different elements
const slideVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 1.1,
  }),
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    scale: 0.9,
  }),
};

const textVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: [0.32, 0.72, 0.35, 1.12] },
  }),
};

export default function ExtraordinaryHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = 7000;
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const sliderRef = useRef(null);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    delta: 10,
    preventDefaultTouchmoveEvent: true,
  });

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

  // Auto-slide with pause functionality
  useEffect(() => {
    if (!isHovered && !isPaused && inView) {
      const timer = setInterval(handleNext, slideInterval);
      return () => clearInterval(timer);
    }
  }, [current, isHovered, isPaused, inView, handleNext]);

  // Keyboard navigation with focus management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsPaused(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const { title, headline, description, image, ctaLabel, ctaLink, theme } = slides[current];

  return (
    <div
      ref={sliderRef}
      className="relative h-screen w-full overflow-hidden"
      {...swipeHandlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero image slider"
      aria-live="polite"
    >
      {/* Parallax Background with Lazy Loading */}
      <AnimatePresence custom={direction}>
        <motion.div
          key={current}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.32, 0.72, 0.35, 1.12] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: inView ? `url(${image})` : "none",
            transform: `translateY(${isHovered ? "-20px" : "0"})`, // Parallax effect
          }}
        >
          {/* Dynamic Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{ background: `linear-gradient(90deg, ${theme.primary}99, ${theme.secondary}66)` }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div ref={ref} className="container mx-auto px-6 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center h-full">
          <div className="hidden md:block"></div>
          <AnimatePresence custom={direction}>
            <motion.div
              key={current}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              className="col-span-2 md:col-span-1 text-white"
            >
              <motion.span
                variants={textVariants}
                initial="initial"
                animate="animate"
                custom={0}
                className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium tracking-wide mb-4"
                style={{ backgroundColor: `${theme.primary}33` }}
              >
                {title}
              </motion.span>

              <motion.h1
                variants={textVariants}
                initial="initial"
                animate="animate"
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                {headline}
              </motion.h1>

              <motion.p
                variants={textVariants}
                initial="initial"
                animate="animate"
                custom={2}
                className="text-lg opacity-90 mb-8 max-w-md"
              >
                {description}
              </motion.p>

              <motion.div
                variants={textVariants}
                initial="initial"
                animate="animate"
                custom={3}
                className="flex flex-wrap gap-5"
              >
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full text-base font-medium transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: theme.secondary }}
                >
                  {ctaLabel}
                  <FaArrowRight className="ml-1 text-sm transition-transform group-hover:translate-x-1" />
                </a>
                <motion.button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-3 bg-transparent text-white border border-white/50 px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlayCircle className="text-lg" />
                  <span>Watch Video</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="hidden md:block"></div>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-6 sm:px-12 z-20">
        <div className="flex gap-4">
          <motion.button
            onClick={handlePrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-sm" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <FaArrowRight className="text-sm" />
          </motion.button>
        </div>

        {/* Progress Bar Indicators with Thumbnail Previews */}
        <div className="flex gap-2">
          {slides.map((slide, idx) => (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="group relative"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current ? "true" : "false"}
            >
              <motion.div
                className={`h-1 rounded-full ${
                  idx === current ? "bg-white" : "bg-white/30"
                } transition-all duration-300 group-hover:bg-white/80`}
                animate={{
                  width: idx === current && !isPaused ? [48, 48, 0] : 48,
                }}
                transition={{
                  duration: idx === current && !isPaused ? slideInterval / 1000 : 0,
                  ease: "linear",
                  repeat: idx === current && !isPaused ? Infinity : 0,
                }}
              />
              {/* Thumbnail Preview */}
              <motion.div
                className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-cover bg-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator with Glassmorphic Design */}
      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white gap-2 cursor-pointer backdrop-blur-md bg-white/10 rounded-full px-4 py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-sm font-light">Explore More</span>
        <motion.div
          className="w-5 h-9 border border-white/30 rounded-full flex justify-center pt-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Pause/Play Button with Animation */}
      <motion.button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-8 right-8 bg-black/30 backdrop-blur-md text-white p-3 rounded-full z-20 hover:bg-black/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? <FaPlayCircle size={20} /> : <FaPause size={20} />}
      </motion.button>

      {/* Skip Intro Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute top-8 left-8 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full z-20 hover:bg-black/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Skip introduction"
      >
        Skip Intro
      </motion.button>
    </div>
  );
}