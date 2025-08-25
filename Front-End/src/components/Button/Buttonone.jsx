import React, { useState } from 'react';

const ShimmerButton = () => {
  const [shimmerDir, setShimmerDir] = useState('');
  console.log(shimmerDir)

  return (
    <button
      onMouseEnter={() => setShimmerDir('in')}
      onMouseLeave={() => setShimmerDir('out')}
      className="relative overflow-hidden px-6 py-3 text-white bg-indigo-600 rounded-lg font-semibold shadow-lg"
    >
      <span className="relative z-10">Hover Me</span>

      {/* Glass shimmer layer */}
      <span
        key={shimmerDir} // Forces re-animation on direction change
        className={`
          absolute inset-0 z-0 pointer-events-none
          before:absolute before:top-0 before:left-[-100%]
          before:h-full before:w-full before:skew-x-[-20deg] before:bg-white/35 before:blur-mdnpm run dev
          
          before:content-['']
          ${shimmerDir === 'in' ? 'before:animate-shimmer-in' : 'before:animate-shimmer-out'}
        `}
      />
    </button>
  );
};

export default ShimmerButton;







// // tailwind.config.js
// module.exports = {
//     content: ['./src/**/*.{js,jsx,ts,tsx}'],
//     theme: {
//       extend: {
//         keyframes: {
//           shimmer: {
//             '0%': { left: '-100%' },
//             '100%': { left: '100%' },
//           },
//         },
//         animation: {
//           shimmer: 'shimmer 1s ease-in-out forwards',
//         },
//       },
//     },
//     plugins: [],
//   };
  

