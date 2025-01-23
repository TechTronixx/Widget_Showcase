import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface ReferralWelcomeWidgetProps {
  theme?: "light" | "dark";
  accentColor?: string;
  referrerName?: string;
  rewardAmount?: number;
  onClose?: () => void;
  isOpen?: boolean;
}

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          initial={{
            opacity: 1,
            scale: 0,
            x: "50%",
            y: "50%",
          }}
          animate={{
            opacity: 0,
            scale: 1,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.2,
            repeat: Infinity,
          }}
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 50%)`,
          }}
        />
      ))}
    </div>
  );
};

export function ReferralWelcomeWidget({
  theme = "light",
  accentColor = "#FF5733",
  referrerName = "John",
  rewardAmount = 50,
  onClose,
  isOpen = true,
}: ReferralWelcomeWidgetProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl overflow-hidden ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
            layoutId="welcome-popup"
          >
            {showConfetti && <Confetti />}

            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              }`}
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ rotate: -15 }}
                animate={{ rotate: 15 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                }}
                className="relative mb-6"
              >
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Gift size={32} style={{ color: accentColor }} />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles size={20} className="text-yellow-400" />
                </motion.div>
              </motion.div>

              <h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                Welcome to Our Community!
              </h2>

              <p
                className={`text-lg mb-4 ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                You've been referred by{" "}
                <span className="font-semibold">{referrerName}</span>
              </p>

              <div
                className="w-full p-4 rounded-lg mb-6"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Sign up now and get{" "}
                  <span className="font-bold">${rewardAmount}</span> in rewards!
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: accentColor }}
                className="w-full py-3 px-6 text-white rounded-lg font-medium"
              >
                Claim Your Reward
              </motion.button>

              <p
                className={`mt-4 text-xs ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                *Terms and conditions apply
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
