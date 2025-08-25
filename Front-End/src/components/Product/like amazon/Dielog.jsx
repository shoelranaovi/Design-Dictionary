import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, CheckCircle, Star, StarHalf, ZoomIn, ZoomOut } from "lucide-react";

const product = {
  title: "TECKNET Wired Gaming Keyboard, RGB Backlit Keyboard with Volume Buttons",
  price: 35.99,
  discount: 10,
  brand: "TECKNET",
  rating: 4.3,
  ratingsCount: 779,
  color: "White",
  connectivity: "USB-C",
  compatibleDevices: "Laptop",
  images: [
    "https://m.media-amazon.com/images/I/71o7Rtl89QL._AC_SX425_.jpg",
    "https://m.media-amazon.com/images/I/71K5s99KYSL._AC_SX425_.jpg",
    "/keyboard3.jpg",
    "/keyboard4.jpg",
  ],
};

export default function ProductZoomDialog() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Main Image Triggering Dialog */}
   
        {/* Dialog Content */}
        <DialogContent className="max-w-4xl">
          <div className="flex gap-4">
            {/* Large Image with Zoom Effect */}
            <div className="relative w-2/3" onMouseMove={handleMouseMove}>
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Zoomable Product"
                className="w-full object-cover cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              />
              {isZoomed && (
                <div
                  className="absolute top-0 left-0 w-full h-full bg-white opacity-100 pointer-events-none"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>

            {/* Product Details */}
            <div className="w-1/3">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">Color: {product.color}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
              {/* Thumbnail Images */}
              <div className="flex mt-4 gap-2">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Thumbnail"
                    className="w-16 h-16 border cursor-pointer hover:scale-110"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
    </div>
  );
}
