import React from "react";
import { useSelector } from "react-redux";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
  const { theme, layout } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : theme === "orange"
          ? "bg-orange-500 text-white"
          : "bg-white text-black"
      }`}>
      {/* Layout Change Effect */}
      <div className={layout === "vertical" ? "flex flex-col" : "flex-row"}>
        <div className="p-4 border-b border-gray-300">Header</div>
        <div className="p-4 flex-1">
          <h1>Welcome to Theme & Layout Switcher</h1>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default App;
