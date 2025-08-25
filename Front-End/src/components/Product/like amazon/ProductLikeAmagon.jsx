import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, CheckCircle, Star, StarHalf } from "lucide-react";
import ProductZoomDialog from "./Dielog";

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

export default function ProductImageZoom() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imageRef = useRef(null);
  const zoomBoxSize = 150;
  const zoomLevel = 250;

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8">
      {/* Left - Image Gallery */}
      <div className="flex flex-col w-full md:w-1/2 relative">
        {/* Image Preview (Opens Dialog on Click) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div
              className="relative border border-gray-300 rounded-md overflow-hidden cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              ref={imageRef}
              onClick={() => setIsDialogOpen(true)}
            >
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-80 object-cover transition-transform duration-300 ease-in-out"
                loading="lazy"
              />

              {/* Zoom Box */}
              {isZoomed && (
                <div
                  className="absolute border-2 border-blue-400 bg-white bg-opacity-30 pointer-events-none transition-opacity duration-300 opacity-100"
                  style={{
                    width: `${zoomBoxSize}px`,
                    height: `${zoomBoxSize}px`,
                    left: `${zoomPosition.x - zoomBoxSize / 2}px`,
                    top: `${zoomPosition.y - zoomBoxSize / 2}px`,
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: `${zoomLevel}%`,
                    backgroundPosition: `${(zoomPosition.x / imageRef.current.clientWidth) * 100}% ${(zoomPosition.y / imageRef.current.clientHeight) * 100}%`,
                  }}
                />
              )}
            </div>
          </DialogTrigger>

          {/* Dialog Content - Large Image */}
          <DialogContent className="max-w-2xl p-6">
          <ProductZoomDialog />
          </DialogContent>
        </Dialog>

        {/* Image Thumbnails */}
        <div className="flex mt-2 gap-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              loading="lazy"
              className={`w-16 h-16 border rounded-md cursor-pointer transition-transform hover:scale-110 ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right - Product Details OR Zoom Preview */}
      <div className="w-1/2 flex flex-col">
        {isZoomed ? (
          <div className="mt-4 border border-gray-300 rounded-md overflow-hidden w-full h-80 transition-opacity duration-300 opacity-100">
            <div
              className="w-full h-full bg-no-repeat transition-transform duration-300 ease-in-out"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: `${zoomLevel}%`,
                backgroundPosition: `${(zoomPosition.x / imageRef.current?.clientWidth) * 100}% ${(zoomPosition.y / imageRef.current?.clientHeight) * 100}%`,
              }}
            />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{product.title}</h2>

            {/* Rating Section */}
            <div className="flex items-center text-yellow-500 mt-1">
              {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                <Star key={i} size={20} />
              ))}
              {product.rating % 1 !== 0 && <StarHalf size={20} />}
              <span className="text-gray-600 ml-2">({product.ratingsCount} ratings)</span>
            </div>

            {/* Price Section */}
            <div className="text-3xl font-bold text-gray-800 mt-3">${product.price}</div>
            <div className="text-green-600 flex items-center mt-2">
              <CheckCircle size={20} className="mr-1" />
              Apply {product.discount}% coupon
            </div>

            {/* Specifications */}
            <div className="mt-4 text-gray-700 space-y-1">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Connectivity:</strong> {product.connectivity}</p>
              <p><strong>Compatible Devices:</strong> {product.compatibleDevices}</p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md shadow-md">
                Buy Now
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md flex items-center shadow-md">
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
