import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

interface OrderStatusWidgetProps {
  theme?: "light" | "dark";
  accentColor?: string;
  orderNumber?: string;
  currentStatus?: "processing" | "shipped" | "out-for-delivery" | "delivered";
  estimatedDelivery?: string;
}

const statusSteps = [
  { id: "processing", icon: Package, label: "Order Processing" },
  { id: "shipped", icon: Truck, label: "Shipped" },
  { id: "out-for-delivery", icon: MapPin, label: "Out for Delivery" },
  { id: "delivered", icon: CheckCircle, label: "Delivered" },
];

export function OrderStatusWidget({
  theme = "light",
  accentColor = "#4CAF50",
  orderNumber = "ORD-123456",
  currentStatus = "processing",
  estimatedDelivery = "March 25, 2024",
}: OrderStatusWidgetProps) {
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
      className={`w-full max-w-md p-6 rounded-2xl shadow-lg ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={`text-xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Order Status
          </h2>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Order #{orderNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Est. {estimatedDelivery}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {statusSteps.map((step, index) => {
          const isComplete = isStepComplete(index);
          const isCurrent = index === getCurrentStep();
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative">
              {index !== statusSteps.length - 1 && (
                <div
                  className={`absolute left-6 top-8 w-0.5 h-12 ${
                    isComplete
                      ? ""
                      : theme === "light"
                      ? "bg-gray-200"
                      : "bg-gray-700"
                  }`}
                  style={
                    isComplete ? { backgroundColor: accentColor } : undefined
                  }
                />
              )}
              <motion.div
                initial={false}
                animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
                className="flex items-start gap-4"
              >
                <div
                  className={`relative z-10 p-3 rounded-full ${
                    isComplete
                      ? ""
                      : theme === "light"
                      ? "bg-gray-100"
                      : "bg-gray-800"
                  }`}
                  style={
                    isComplete
                      ? {
                          backgroundColor: `${accentColor}20`,
                        }
                      : undefined
                  }
                >
                  <Icon
                    size={20}
                    className={
                      !isComplete
                        ? theme === "light"
                          ? "text-gray-400"
                          : "text-gray-500"
                        : ""
                    }
                    style={isComplete ? { color: accentColor } : undefined}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {step.label}
                  </h3>
                  {isCurrent && (
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {currentStatus === "processing"
                        ? "Your order is being processed"
                        : currentStatus === "shipped"
                        ? "Your package is on its way"
                        : currentStatus === "out-for-delivery"
                        ? "Your package will be delivered today"
                        : "Your package has been delivered"}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
