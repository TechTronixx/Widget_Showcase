import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Gift, ArrowRight } from "lucide-react";

// form schema
const referralSchema = z.object({
  email: z.string().email("please enter a valid email address"),
  name: z.string().min(2, "name must be at least 2 characters"),
});

type ReferralForm = z.infer<typeof referralSchema>;

interface ReferAndEarnWidgetProps {
  theme?: "light" | "dark";
  accentColor?: string;
  rewardAmount?: number;
}

export function ReferAndEarnWidget({
  theme = "light",
  accentColor = "#FF5733",
  rewardAmount = 50,
}: ReferAndEarnWidgetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    console.log(data);
    // handle form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md p-6 rounded-2xl shadow-lg ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 15 }}
          className="p-3 rounded-full"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Gift
            size={24}
            style={{ color: accentColor }}
            className="text-primary"
          />
        </motion.div>
        <h2
          className={`text-xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Refer & Earn ${rewardAmount}
        </h2>
      </div>

      <p
        className={`mb-6 text-sm ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        Share the love and get rewarded! Invite your friends and earn $
        {rewardAmount} for each successful referral.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Your friend's name"
            className={`w-full px-4 py-2 rounded-lg border ${
              theme === "light"
                ? "border-gray-200 focus:border-blue-500"
                : "border-gray-700 bg-gray-800 focus:border-blue-400"
            } outline-none transition-colors`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Their email address"
            className={`w-full px-4 py-2 rounded-lg border ${
              theme === "light"
                ? "border-gray-200 focus:border-blue-500"
                : "border-gray-700 bg-gray-800 focus:border-blue-400"
            } outline-none transition-colors`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ backgroundColor: accentColor }}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white rounded-lg group"
          type="submit"
        >
          <Send size={18} />
          <span>Send Invitation</span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </form>

      <p
        className={`mt-4 text-xs text-center ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        Terms and conditions apply. Rewards are credited after successful
        signup.
      </p>
    </motion.div>
  );
}
