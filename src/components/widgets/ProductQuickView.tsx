import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface ProductQuickViewProps {
  theme?: "light" | "dark";
  accentColor?: string;
  isOpen?: boolean;
  onClose?: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    rating: number;
    reviewCount: number;
    images: string[];
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    inStock: boolean;
  };
}

export function ProductQuickView({
  theme = "light",
  accentColor = "#FF5733",
  isOpen = false,
  onClose,
  product = {
    id: "1",
    name: "Premium Product",
    price: 99.99,
    originalPrice: 129.99,
    description:
      "High-quality premium product with excellent features and design.",
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://placehold.co/600x800/png",
      "https://placehold.co/600x800/png",
      "https://placehold.co/600x800/png",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" },
      { name: "Gray", hex: "#808080" },
    ],
    inStock: true,
  },
}: ProductQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute right-4 top-4 z-10 p-2 rounded-full ${
                theme === "light"
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <X
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
                size={20}
              />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative aspect-square">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]}
                  alt={`${product.name} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                    theme === "light" ? "bg-white/80" : "bg-gray-900/80"
                  } hover:bg-opacity-100`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                    theme === "light" ? "bg-white/80" : "bg-gray-900/80"
                  } hover:bg-opacity-100`}
                >
                  <ChevronRight size={20} />
                </button>

                {/* Thumbnail Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        selectedImage === index
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: accentColor }}
                    >
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span
                        className={`text-sm line-through ${
                          theme === "light" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          fill={
                            i < Math.floor(product.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`mb-6 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {product.description}
                </p>

                {/* Sizes */}
                {product.sizes && (
                  <div className="mb-6">
                    <h3
                      className={`text-sm font-medium mb-3 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Select Size
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            selectedSize === size
                              ? "border-transparent text-white"
                              : theme === "light"
                              ? "border-gray-200 text-gray-900 hover:border-gray-300"
                              : "border-gray-700 text-white hover:border-gray-600"
                          }`}
                          style={
                            selectedSize === size
                              ? { backgroundColor: accentColor }
                              : undefined
                          }
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {product.colors && (
                  <div className="mb-6">
                    <h3
                      className={`text-sm font-medium mb-3 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Select Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.hex)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color.hex
                              ? "ring-2 ring-offset-2"
                              : "hover:scale-110"
                          }`}
                          style={
                            {
                              backgroundColor: color.hex,
                              borderColor:
                                theme === "light" ? "#E5E7EB" : "#374151",
                              "--ring-color": accentColor,
                              "--ring-offset-color":
                                theme === "light" ? "white" : "#111827",
                            } as React.CSSProperties
                          }
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white"
                    style={{ backgroundColor: accentColor }}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={20} />
                    <span>
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
