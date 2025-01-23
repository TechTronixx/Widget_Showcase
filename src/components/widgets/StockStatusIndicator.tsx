import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Clock, Loader2 } from "lucide-react";

interface StockStatusIndicatorProps {
  theme?: "light" | "dark";
  accentColor?: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "restocking";
  quantity?: number;
  lowStockThreshold?: number;
  restockDate?: string;
  showQuantity?: boolean;
  variant?: "badge" | "card" | "inline";
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  "in-stock": {
    icon: CheckCircle,
    label: "In Stock",
    color: "#10B981", // green
    bgColor: "rgba(16, 185, 129, 0.1)",
  },
  "low-stock": {
    icon: AlertCircle,
    label: "Low Stock",
    color: "#F59E0B", // amber
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  "out-of-stock": {
    icon: AlertCircle,
    label: "Out of Stock",
    color: "#EF4444", // red
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
  restocking: {
    icon: Clock,
    label: "Restocking Soon",
    color: "#6366F1", // indigo
    bgColor: "rgba(99, 102, 241, 0.1)",
  },
};

export function StockStatusIndicator({
  theme = "light",
  status = "in-stock",
  quantity = 10,
  lowStockThreshold = 5,
  restockDate,
  showQuantity = true,
  variant = "badge",
  size = "md",
}: StockStatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const renderBadge = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor: config.bgColor }}
    >
      <Icon
        size={size === "sm" ? 14 : size === "md" ? 16 : 18}
        style={{ color: config.color }}
      />
      <span style={{ color: config.color }} className="font-medium">
        {config.label}
        {showQuantity && status !== "out-of-stock" && ` (${quantity})`}
      </span>
    </motion.div>
  );

  const renderCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-lg border ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-900 border-gray-700"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: config.bgColor }}
        >
          <Icon size={24} style={{ color: config.color }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-medium ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              {config.label}
            </h3>
            {status === "restocking" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={16} className="text-gray-400" />
              </motion.div>
            )}
          </div>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {status === "in-stock" && showQuantity && (
              <>Available: {quantity} units</>
            )}
            {status === "low-stock" && showQuantity && (
              <>Only {quantity} units left</>
            )}
            {status === "out-of-stock" && "Currently unavailable"}
            {status === "restocking" && restockDate && (
              <>Expected by {restockDate}</>
            )}
          </p>
          {status === "low-stock" && (
            <motion.div
              className="mt-2 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: config.color,
                  width: `${(quantity / lowStockThreshold) * 100}%`,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderInline = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5"
    >
      <Icon
        size={size === "sm" ? 14 : size === "md" ? 16 : 18}
        style={{ color: config.color }}
      />
      <span
        className={`font-medium ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        {config.label}
      </span>
      {showQuantity && status !== "out-of-stock" && (
        <span className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
          ({quantity})
        </span>
      )}
    </motion.div>
  );

  switch (variant) {
    case "badge":
      return renderBadge();
    case "card":
      return renderCard();
    case "inline":
      return renderInline();
    default:
      return renderBadge();
  }
}
