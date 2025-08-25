import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} style={buttonStyle}>
        Scroll to Top
      </button>
    )
  );
};

const buttonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#FFF",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "opacity 0.3s",
};

export default ScrollToTopButton;

// import ScrollToTop from "react-scroll-to-top";

// const App = () => {
//   return (
//     <>
//       <ScrollToTop smooth />
//     </>
//   );
// };

// import React from 'react';
// import { animateScroll as scroll } from 'react-scroll';

// const ScrollToTopButton = () => {
//   const scrollToTop = () => {
//     scroll.scrollToTop({ duration: 500, smooth: true });
//   };

//   return (
//     <button onClick={scrollToTop} style={buttonStyle}>
//       Scroll to Top
//     </button>
//   );
// };

// const buttonStyle = {
//   position: 'fixed',
//   bottom: '20px',
//   right: '20px',
//   padding: '10px 20px',
//   backgroundColor: '#007BFF',
//   color: '#FFF',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
// };

// export default ScrollToTopButton;
