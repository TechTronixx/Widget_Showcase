import { motion } from "framer-motion";
import {
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Calendar,
  Clock,
  Info,
  MapIcon,
  Phone,
} from "lucide-react";

interface OrderStatusDetailedProps {
  theme?: "light" | "dark";
  accentColor?: string;
  orderNumber?: string;
  currentStatus?: "processing" | "shipped" | "out-for-delivery" | "delivered";
  estimatedDelivery?: string;
  deliveryAddress?: string;
  trackingNumber?: string;
  orderDate?: string;
  deliveryTime?: string;
  courierContact?: string;
  courierName?: string;
}

const statusSteps = [
  {
    id: "processing",
    icon: Package,
    label: "Order Processing",
    description: "Your order is being prepared",
  },
  {
    id: "shipped",
    icon: Truck,
    label: "Order Shipped",
    description: "Your package is on its way",
  },
  {
    id: "out-for-delivery",
    icon: MapPin,
    label: "Out for Delivery",
    description: "Your package will be delivered today",
  },
  {
    id: "delivered",
    icon: CheckCircle,
    label: "Delivered",
    description: "Package has been delivered",
  },
];

export function OrderStatusDetailed({
  theme = "light",
  accentColor = "#4CAF50",
  orderNumber = "ORD-123456",
  currentStatus = "processing",
  estimatedDelivery = "March 25, 2024",
  deliveryAddress = "123 Delivery St, City, Country",
  trackingNumber = "TRK123456789",
  orderDate = "March 20, 2024",
  deliveryTime = "2:00 PM - 5:00 PM",
  courierContact = "+1 234 567 8900",
  courierName = "Express Delivery",
}: OrderStatusDetailedProps) {
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
      className={`w-full max-w-2xl rounded-xl shadow-lg overflow-hidden ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {/* Header */}
      <div className="p-6 text-white" style={{ backgroundColor: accentColor }}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Order Status</h2>
            <p className="text-white/80">#{orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Estimated Delivery</p>
            <p className="font-semibold">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Timeline */}
        <div className="mb-8">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = isStepComplete(index);
            const isCurrent = index === getCurrentStep();

            return (
              <div key={step.id} className="relative">
                {index !== statusSteps.length - 1 && (
                  <div
                    className={`absolute left-5 top-10 w-0.5 h-16 ${
                      isComplete ? "" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={
                      isComplete ? { backgroundColor: accentColor } : undefined
                    }
                  />
                )}
                <motion.div
                  initial={false}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  className={`flex items-start gap-4 mb-8 ${
                    isCurrent ? "relative z-10" : ""
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${
                      isComplete ? "" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                    style={
                      isComplete
                        ? { backgroundColor: `${accentColor}20` }
                        : undefined
                    }
                  >
                    <Icon
                      size={24}
                      className={!isComplete ? "text-gray-400" : ""}
                      style={isComplete ? { color: accentColor } : undefined}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  {isCurrent && (
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      Current
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Details */}
          <div>
            <h3
              className={`text-lg font-medium mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Delivery Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapIcon
                  size={20}
                  className={
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Delivery Address
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {deliveryAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  size={20}
                  className={
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Delivery Time
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div>
            <h3
              className={`text-lg font-medium mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Order Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Info
                  size={20}
                  className={
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Tracking Number
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {trackingNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar
                  size={20}
                  className={
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Order Date
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {orderDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  size={20}
                  className={
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {courierName}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {courierContact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Preview Placeholder */}
        <div className="mt-6">
          <div
            className={`w-full h-40 rounded-lg ${
              theme === "light" ? "bg-gray-100" : "bg-gray-800"
            } flex items-center justify-center`}
          >
            <MapIcon
              size={32}
              className={theme === "light" ? "text-gray-400" : "text-gray-600"}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
