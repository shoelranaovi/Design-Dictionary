import React from "react";
import { motion } from "framer-motion";

const SliderItem = () => {
  return (
    <div
      className="slider-item slick-slide slick-current slick-active relative overflow-hidden group"
      id="block-6c59237f-59c6-4f57-b0af-e892e6d54d78"
      data-slick-index="0"
      aria-hidden="false"
      tabIndex="0"
    >
      <a href="/collections/all" tabIndex="0" className="relative block">
        {/* Static Image (No Animation) */}
        <figure className="slider-thumb overflow-hidden">
          <img
            src="//gemma-demo.myshopify.com/cdn/shop/files/home4-slider1.jpg?v=1614776686"
            alt="Men Casuals"
            className="w-full"
          />
        </figure>

        {/* Animated Text on Hover */}
        <motion.div
          className="slider-item-content text-center absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }} // Start Hidden
          whileHover={{ opacity: 1, y: 0 }} // Fade & Slide Up on Hover
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Men Casuals
          </motion.h2>
          <motion.h3
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fashion 2019
          </motion.h3>
          <motion.div
            className="btn btn-white bg-white text-black px-5 py-2 mt-4 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Shop Now
          </motion.div>
        </motion.div>
      </a>
    </div>
  );
};

export default SliderItem;

