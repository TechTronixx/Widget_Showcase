import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, MapPin, CheckCircle, X } from "lucide-react";

interface OrderStatusToastProps {
  theme?: "light" | "dark";
  accentColor?: string;
  orderNumber?: string;
  currentStatus?: "processing" | "shipped" | "out-for-delivery" | "delivered";
  isVisible?: boolean;
  onClose?: () => void;
}

const statusConfig = {
  processing: {
    icon: Package,
    message: "Your order is being processed",
    subMessage: "We'll notify you when it ships",
  },
  shipped: {
    icon: Truck,
    message: "Your order is on its way",
    subMessage: "Expected delivery in 2-3 days",
  },
  "out-for-delivery": {
    icon: MapPin,
    message: "Out for delivery today",
    subMessage: "Your package will arrive soon",
  },
  delivered: {
    icon: CheckCircle,
    message: "Package delivered",
    subMessage: "Thank you for shopping with us",
  },
};

export function OrderStatusToast({
  theme = "light",
  accentColor = "#4CAF50",
  orderNumber = "ORD-123456",
  currentStatus = "processing",
  isVisible = true,
  onClose,
}: OrderStatusToastProps) {
  const status = statusConfig[currentStatus];
  const Icon = status.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm ${
            theme === "light"
              ? "bg-white shadow-lg"
              : "bg-gray-900 shadow-2xl shadow-black/10"
          } rounded-lg overflow-hidden`}
        >
          <div className="relative">
            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5 }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
              style={{ backgroundColor: accentColor }}
              onAnimationComplete={() => onClose?.()}
            />

            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Icon size={24} style={{ color: accentColor }} />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`font-medium ${
                          theme === "light" ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {status.message}
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        Order #{orderNumber}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <p
                    className={`text-sm mt-1 ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {status.subMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
