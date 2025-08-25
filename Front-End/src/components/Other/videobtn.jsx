import React from "react";

const VideoPlayButton = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <a
        href="https://www.youtube.com/watch?v=alswD2tCc_Q"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-red-600 rounded-full transition-transform duration-300 hover:scale-110">
        {/* Play Icon Triangle */}
        <div className="absolute left-1/2 transform -translate-x-1/3 w-0 h-0 border-l-8 border-t-4 border-b-4 border-white border-transparent border-l-white"></div>

        {/* Pulse Animation */}
        <span className="absolute w-full h-full bg-red-500 opacity-50 rounded-full animate-ping"></span>
      </a>
    </div>
  );
};

export default VideoPlayButton;
