import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaPlayCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    title: "Business Idea Come True",
    headline: "We grow & Manage Your Business",
    description:
      "We create fantastic websites and applications for creative modern business websites.",
    image:
      "http://demo.joomlabuff.com/growth/images/joomlabuff/slideshow/home-1/slider-2.jpg",
  },
  {
    title: "Empower Your Digital Presence",
    headline: "Smart & Scalable Solutions",
    description:
      "We deliver future-ready tech solutions tailored to your unique business needs.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Innovate & Inspire",
    headline: "Transforming Ideas into Reality",
    description:
      "Join the digital revolution with our world-class development services.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

const transition = { duration: 0.8, ease: [0.25, 1, 0.5, 1] };

export default function HeroSliderTwo() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const slideInterval = 6000;

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

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(handleNext, slideInterval);
      return () => clearInterval(timer);
    }
  }, [current, isHovered, handleNext]);

  const { title, headline, description, image } = slides[current];

  return (
    <div 
      className="relative h-screen w-full flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? "30%" : "-30%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-30%" : "30%", opacity: 0 }}
            transition={transition}
            className="max-w-2xl"
          >
            <motion.h5 
              className="text-lg font-medium mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.2 }}
            >
              {title}
            </motion.h5>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.3 }}
            >
              {headline}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.4 }}
            >
              {description}
            </motion.p>

            <motion.div 
              className="flex gap-4 flex-wrap"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.5 }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full transition-all duration-300 hover:bg-gray-100"
              >
                <FaPlusCircle /> Learn more
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10"
              >
                <FaPlayCircle /> Watch video
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 bg-white/10 text-white rounded-full p-3 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={transition}
      >
        <FaChevronLeft className="text-xl" />
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 bg-white/10 text-white rounded-full p-3 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={transition}
      >
        <FaChevronRight className="text-xl" />
      </motion.button>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: isHovered ? 0 : 1,
          originX: 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-white origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ 
            duration: slideInterval/1000, 
            ease: "linear",
            repeat: Infinity
          }}
          key={current}
        />
      </motion.div>

      {/* Pagination Dots */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...transition, delay: 0.6 }}
      >
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goToSlide(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="relative flex items-center justify-center w-3 h-3"
          >
            <motion.span
              className={`absolute w-2 h-2 rounded-full ${
                idx === current ? "bg-white" : "bg-white/50"
              }`}
              animate={{
                scale: idx === current ? [1, 1.2, 1] : 1,
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}