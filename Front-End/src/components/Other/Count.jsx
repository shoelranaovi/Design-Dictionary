import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollCounterFramer = ({value=1000}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const start = 0;
    const end = value; // Desired count value

    const interval = setInterval(() => {
      setCount((prev) => (prev < end ? prev + 5 : end));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl font-bold"
        animate={controls}
        transition={{ duration: 1 }}>
        Total Work: {count}
      </motion.h2>
      <p>Scroll down to see the count!</p>
    </div>
  );
};

export default ScrollCounterFramer;
