// src/components/ThemedCard.js
import React from "react";

const ThemedCard = ({ title, content, buttonText }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md dark:bg-gray-800 bg-white dark:border-gray-700 border border-gray-200 transition-colors duration-200">
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-800">
          {title}
        </h3>
        <p className="dark:text-gray-300 text-gray-600 mb-4">{content}</p>
        <button className="px-4 py-2 rounded bg-secondary-light dark:bg-secondary-dark text-white hover:opacity-90 transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ThemedCard;
