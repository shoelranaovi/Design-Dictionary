// src/App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your other components

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-50">
          <header className="flex justify-between items-center p-4 border-b dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white">
            <h1 className="text-xl font-bold dark:text-white text-gray-800">
              My MERN App
            </h1>
            <ThemeToggle />
          </header>

          <main className="container mx-auto p-4">
            <Routes>
              {/* Your routes go here */}
              <Route path="/" element={<HomePage />} />
              {/* Additional routes */}
            </Routes>
          </main>

          <footer className="p-4 text-center dark:bg-gray-800 bg-white dark:text-gray-400 text-gray-600 border-t dark:border-gray-700 border-gray-200">
            © {new Date().getFullYear()} My MERN App
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

// Example HomePage component with theme-aware styling
const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md dark:bg-gray-800 bg-white">
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">
        Welcome to My MERN App
      </h2>
      <p className="dark:text-gray-300 text-gray-600 mb-4">
        This application demonstrates a theme switcher implementation using
        Tailwind CSS and React Context.
      </p>
      <button className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white hover:opacity-90 transition">
        Call to Action
      </button>
    </div>
  );
};

export default App;
