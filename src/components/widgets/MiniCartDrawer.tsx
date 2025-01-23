import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: {
    [key: string]: string;
  };
}

interface MiniCartDrawerProps {
  theme?: "light" | "dark";
  accentColor?: string;
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  currency?: string;
  shipping?: number;
  tax?: number;
}

export function MiniCartDrawer({
  theme = "light",
  accentColor = "#FF5733",
  isOpen = false,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  currency = "$",
  shipping = 0,
  tax = 0,
}: MiniCartDrawerProps) {
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping + tax;

  const handleRemoveItem = async (id: string) => {
    setRemovingItem(id);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Animation delay
    onRemoveItem?.(id);
    setRemovingItem(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-xl ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} style={{ color: accentColor }} />
                <h2
                  className={`text-lg font-bold ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  Your Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
                }`}
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-4 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ShoppingBag
                    size={48}
                    className="mb-4 text-gray-300 dark:text-gray-600"
                  />
                  <p
                    className={`text-lg font-medium mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Your cart is empty
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      animate={
                        removingItem === item.id
                          ? { opacity: 0, x: -100 }
                          : { opacity: 1, x: 0 }
                      }
                      className={`flex gap-4 p-3 rounded-lg ${
                        theme === "light" ? "bg-gray-50" : "bg-gray-800"
                      }`}
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-20 h-20 rounded-md"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          {item.name}
                        </h3>

                        {item.options && (
                          <div className="mt-1 space-y-1">
                            {Object.entries(item.options).map(
                              ([key, value]) => (
                                <p
                                  key={key}
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {key}: {value}
                                </p>
                              )
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity?.(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className={`p-1 rounded-md transition-colors ${
                                theme === "light"
                                  ? "hover:bg-gray-200"
                                  : "hover:bg-gray-700"
                              } ${
                                item.quantity <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <Minus size={16} />
                            </button>
                            <span
                              className={
                                theme === "light"
                                  ? "text-gray-900"
                                  : "text-white"
                              }
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity?.(item.id, item.quantity + 1)
                              }
                              className={`p-1 rounded-md transition-colors ${
                                theme === "light"
                                  ? "hover:bg-gray-200"
                                  : "hover:bg-gray-700"
                              }`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className={`p-1 rounded-md transition-colors ${
                              theme === "light"
                                ? "hover:bg-gray-200 text-gray-500"
                                : "hover:bg-gray-700 text-gray-400"
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          {currency}
                          {item.price * item.quantity}
                        </p>
                        {item.quantity > 1 && (
                          <p
                            className={`text-xs ${
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {currency}
                            {item.price} each
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className={`p-4 border-t ${
                  theme === "light" ? "border-gray-200" : "border-gray-700"
                }`}
              >
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      Subtotal
                    </span>
                    <span
                      className={
                        theme === "light" ? "text-gray-900" : "text-white"
                      }
                    >
                      {currency}
                      {subtotal}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between">
                      <span
                        className={
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }
                      >
                        Shipping
                      </span>
                      <span
                        className={
                          theme === "light" ? "text-gray-900" : "text-white"
                        }
                      >
                        {currency}
                        {shipping}
                      </span>
                    </div>
                  )}
                  {tax > 0 && (
                    <div className="flex justify-between">
                      <span
                        className={
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }
                      >
                        Tax
                      </span>
                      <span
                        className={
                          theme === "light" ? "text-gray-900" : "text-white"
                        }
                      >
                        {currency}
                        {tax}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-medium">Total</span>
                    <span
                      className="text-lg font-bold"
                      style={{ color: accentColor }}
                    >
                      {currency}
                      {total}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 font-medium text-white rounded-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
