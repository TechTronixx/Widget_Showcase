import { motion } from "framer-motion";
import {
  Copy,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface ReferAndEarnSocialProps {
  theme?: "light" | "dark";
  accentColor?: string;
  rewardAmount?: number;
  referralLink?: string;
  referralCode?: string;
}

const socialPlatforms = [
  { icon: Facebook, name: "Facebook", color: "#1877F2" },
  { icon: Twitter, name: "Twitter", color: "#1DA1F2" },
  { icon: Linkedin, name: "LinkedIn", color: "#0A66C2" },
  { icon: MessageCircle, name: "Message", color: "#25D366" },
];

export function ReferAndEarnSocial({
  theme = "light",
  accentColor = "#FF5733",
  rewardAmount = 50,
  referralLink = "https://example.com/ref/123456",
  referralCode = "FRIEND50",
}: ReferAndEarnSocialProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "social">("link");

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md overflow-hidden rounded-2xl ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {/* Header */}
      <div className="p-8 text-white" style={{ backgroundColor: accentColor }}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Share2 size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Share & Earn ${rewardAmount}
          </h2>
          <p className="text-white/80">
            Invite friends and earn rewards when they join
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {(["link", "social"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? theme === "light"
                  ? "text-gray-900 border-b-2"
                  : "text-white border-b-2"
                : theme === "light"
                ? "text-gray-500 hover:text-gray-700"
                : "text-gray-400 hover:text-gray-300"
            }`}
            style={activeTab === tab ? { borderColor: accentColor } : {}}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Sharing
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "link" ? (
          <div className="space-y-4">
            {/* Referral Link */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Your Referral Link
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className={`w-full pr-12 py-3 pl-4 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-800 border-gray-700"
                  } text-sm`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCopy(referralLink)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Copy size={16} style={{ color: accentColor }} />
                </motion.button>
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Your Referral Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={referralCode}
                  className={`w-full pr-12 py-3 pl-4 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-800 border-gray-700"
                  } text-sm font-mono`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCopy(referralCode)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Copy size={16} style={{ color: accentColor }} />
                </motion.button>
              </div>
            </div>

            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  Copied to clipboard!
                </span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => (
              <motion.button
                key={platform.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border flex items-center gap-3 ${
                  theme === "light"
                    ? "border-gray-200 hover:bg-gray-50"
                    : "border-gray-700 hover:bg-gray-800"
                }`}
              >
                <platform.icon size={20} style={{ color: platform.color }} />
                <span
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {platform.name}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <p
          className={`text-xs text-center ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Share your referral link or code with friends. You'll both receive $
          {rewardAmount} when they sign up!
        </p>
      </div>
    </motion.div>
  );
}
