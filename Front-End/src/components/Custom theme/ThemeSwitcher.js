import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setLayout } from "../redux/themeSlice";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const { theme, layout } = useSelector((state) => state.theme);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-lg font-bold">Theme & Layout Switcher</h2>

      {/* Theme Selector */}
      <div className="mt-4">
        <h3 className="font-semibold">Select Theme:</h3>
        <button
          onClick={() => dispatch(setTheme("light"))}
          className={`p-2 m-1 ${
            theme === "light" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}>
          Light
        </button>
        <button
          onClick={() => dispatch(setTheme("dark"))}
          className={`p-2 m-1 ${
            theme === "dark" ? "bg-black text-white" : "bg-gray-300"
          }`}>
          Dark
        </button>
        <button
          onClick={() => dispatch(setTheme("orange"))}
          className={`p-2 m-1 ${
            theme === "orange" ? "bg-orange-500 text-white" : "bg-gray-300"
          }`}>
          Orange
        </button>
      </div>

      {/* Layout Selector */}
      <div className="mt-4">
        <h3 className="font-semibold">Select Layout:</h3>
        <button
          onClick={() => dispatch(setLayout("vertical"))}
          className={`p-2 m-1 ${
            layout === "vertical" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}>
          Vertical
        </button>
        <button
          onClick={() => dispatch(setLayout("horizontal"))}
          className={`p-2 m-1 ${
            layout === "horizontal" ? "bg-purple-500 text-white" : "bg-gray-300"
          }`}>
          Horizontal
        </button>
        <button
          onClick={() => dispatch(setLayout("top"))}
          className={`p-2 m-1 ${
            layout === "top" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}>
          Top
        </button>
        <button
          onClick={() => dispatch(setLayout("bottom"))}
          className={`p-2 m-1 ${
            layout === "bottom" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}>
          Bottom
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
