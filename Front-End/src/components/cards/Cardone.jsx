import { useState } from "react";

function ProductCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-80 h-96 overflow-hidden rounded-lg shadow-lg" 
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePosition.x}px`,
        "--mouse-y": `${mousePosition.y}px`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50 transition-opacity duration-500 pointer-events-none"></div>
      <img
        src="https://th.bing.com/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt="Product"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-80 h-80 bg-white opacity-20 rounded-full blur-xl"
          style={{
            left: `calc(var(--mouse-x) - 10rem)`,
            top: `calc(var(--mouse-y) - 10rem)`,
          }}
        ></div>
      </div>

      {/* Product details section */}
      <div className="absolute bottom-0 w-full bg-white bg-opacity-90 p-4">
        <h3 className="text-lg font-semibold">Product Name</h3>
        <p className="mt-2 text-gray-600">$99.99</p>
        <p className="mt-2 text-sm text-gray-500">
          Brief description of the product goes here.
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
