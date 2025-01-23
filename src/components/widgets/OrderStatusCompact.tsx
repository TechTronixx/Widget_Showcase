import { motion } from "framer-motion";
import { Package, Truck, MapPin, CheckCircle } from "lucide-react";

interface OrderStatusCompactProps {
  theme?: "light" | "dark";
  accentColor?: string;
  orderNumber?: string;
  currentStatus?: "processing" | "shipped" | "out-for-delivery" | "delivered";
  estimatedDelivery?: string;
}

const statusSteps = [
  { id: "processing", icon: Package, label: "Processing" },
  { id: "shipped", icon: Truck, label: "Shipped" },
  { id: "out-for-delivery", icon: MapPin, label: "Out for Delivery" },
  { id: "delivered", icon: CheckCircle, label: "Delivered" },
];

export function OrderStatusCompact({
  theme = "light",
  accentColor = "#4CAF50",
  orderNumber = "ORD-123456",
  currentStatus = "processing",
  estimatedDelivery = "March 25, 2024",
}: OrderStatusCompactProps) {
  const getCurrentStep = () => {
    return statusSteps.findIndex((step) => step.id === currentStatus);
  };

  const isStepComplete = (index: number) => {
    return index <= getCurrentStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-2xl p-4 rounded-xl shadow-sm ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Order
          </span>
          <span
            className={`font-medium ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            #{orderNumber}
          </span>
        </div>
        <div
          className={`text-sm ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Est. {estimatedDelivery}
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(getCurrentStep() / (statusSteps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Steps */}
        <div className="relative z-10 flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = isStepComplete(index);
            const isCurrent = index === getCurrentStep();

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={false}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isComplete
                      ? "bg-opacity-20"
                      : theme === "light"
                      ? "bg-gray-100"
                      : "bg-gray-800"
                  }`}
                  style={
                    isComplete
                      ? { backgroundColor: `${accentColor}20` }
                      : undefined
                  }
                >
                  <Icon
                    size={20}
                    className={!isComplete ? "text-gray-400" : ""}
                    style={isComplete ? { color: accentColor } : undefined}
                  />
                </motion.div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent
                      ? theme === "light"
                        ? "text-gray-900"
                        : "text-white"
                      : theme === "light"
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1"
                  >
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      Current
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
