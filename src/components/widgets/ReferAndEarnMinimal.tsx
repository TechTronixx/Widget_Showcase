import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ReferAndEarnMinimalProps {
  theme?: "light" | "dark";
  rewardAmount?: number;
  onSubmit?: (email: string) => void;
}

export function ReferAndEarnMinimal({
  theme = "light",
  rewardAmount = 50,
  onSubmit,
}: ReferAndEarnMinimalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("please enter a valid email address");
      return;
    }
    if (!email.includes("@")) {
      setError("please enter a valid email address");
      return;
    }
    setError("");
    onSubmit?.(email);
  };

  return (
    <div
      className={`p-8 rounded-3xl ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <h2
        className={`text-4xl font-bold mb-4 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Share Our Platform
      </h2>
      <div className="flex items-baseline gap-2 mb-8">
        <span
          className={`text-lg ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Get
        </span>
        <span className="text-[#7C3AED] text-4xl font-semibold">
          ${rewardAmount}
        </span>
        <span
          className={`text-lg ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          for every friend who joins
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter friend's email"
            className={`w-full px-6 py-4 text-lg rounded-2xl pr-16 ${
              theme === "light"
                ? "bg-gray-50 text-gray-900 placeholder-gray-400"
                : "bg-gray-800 text-white placeholder-gray-500"
            } ${error ? "border-2 border-red-500" : ""}`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-xl bg-[#FF5533] text-white hover:opacity-90 transition-opacity"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-red-500"
          >
            {error}
          </motion.p>
        )}
      </form>

      <div className="grid grid-cols-3 gap-4">
        <div
          className={`p-6 rounded-2xl ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div
            className={`text-lg font-medium mb-1 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Step 1
          </div>
          <div
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Invite
          </div>
        </div>
        <div
          className={`p-6 rounded-2xl ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div
            className={`text-lg font-medium mb-1 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Step 2
          </div>
          <div
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Join
          </div>
        </div>
        <div
          className={`p-6 rounded-2xl ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div
            className={`text-lg font-medium mb-1 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Step 3
          </div>
          <div
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Earn
          </div>
        </div>
      </div>

      <p
        className={`mt-8 text-center text-lg ${
          theme === "light" ? "text-gray-600" : "text-gray-400"
        }`}
      >
        Your friend will receive an invitation to join Our Platform. Once they
        sign up, you'll receive ${rewardAmount} in rewards.
      </p>
    </div>
  );
}
