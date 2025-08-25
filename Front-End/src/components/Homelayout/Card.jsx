import { useState } from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const { name, price, image, rating } = product;
  const [hover, setHover] = useState(false);

  return (
    <div
      className={` bg-white border  p-1 border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img src={image} alt={name} className="w-full h-40  object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold text-blue-600">${price}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-yellow-500 stroke-yellow-500"
                  : "stroke-gray-300"
              }`}
            />
          ))}
        </div>
        <button className="btn-primary w-full">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
