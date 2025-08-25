// 1. First, update your tailwind.config.js to enable dark mode

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add other content paths as needed
  ],
  darkMode: "class", // This enables class-based dark mode instead of media queries
  theme: {
    extend: {
      colors: {
        // Define your custom color scheme
        primary: {
          light: "#4F46E5", // indigo-600 for light mode
          dark: "#818CF8", // indigo-400 for dark mode
        },
        secondary: {
          light: "#059669", // emerald-600 for light mode
          dark: "#34D399", // emerald-400 for dark mode
        },
        background: {
          light: "#FFFFFF", // white for light mode
          dark: "#1F2937", // gray-800 for dark mode
        },
        text: {
          light: "#1F2937", // gray-800 for light mode
          dark: "#F9FAFB", // gray-50 for dark mode
        },
      },
    },
  },
  plugins: [],
};
