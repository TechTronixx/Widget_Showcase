import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Gift, Star, Trophy, Users } from "lucide-react";

const referralSchema = z.object({
  email: z.string().email("please enter a valid email address"),
  name: z.string().min(2, "name must be at least 2 characters"),
});

type ReferralForm = z.infer<typeof referralSchema>;

interface ReferAndEarnCardProps {
  theme?: "light" | "dark";
  accentColor?: string;
  rewardAmount?: number;
  totalReferrals?: number;
  rank?: string;
  nextMilestone?: number;
}

const milestoneRewards = [
  { referrals: 5, reward: "Silver Badge" },
  { referrals: 10, reward: "Gold Badge" },
  { referrals: 25, reward: "Platinum Badge" },
];

export function ReferAndEarnCard({
  theme = "light",
  accentColor = "#FF5733",
  rewardAmount = 50,
  totalReferrals = 3,
  rank = "Bronze",
  nextMilestone = 5,
}: ReferAndEarnCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    console.log(data);
  };

  const progress = (totalReferrals / nextMilestone) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md p-6 rounded-2xl shadow-lg ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Trophy size={20} style={{ color: accentColor }} />
            <span
              className={`text-sm mt-1 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              Rank
            </span>
            <span className="font-bold" style={{ color: accentColor }}>
              {rank}
            </span>
          </motion.div>
        </div>
        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Users size={20} style={{ color: accentColor }} />
            <span
              className={`text-sm mt-1 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              Referrals
            </span>
            <span className="font-bold" style={{ color: accentColor }}>
              {totalReferrals}
            </span>
          </motion.div>
        </div>
        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Gift size={20} style={{ color: accentColor }} />
            <span
              className={`text-sm mt-1 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              Earned
            </span>
            <span className="font-bold" style={{ color: accentColor }}>
              ${rewardAmount * totalReferrals}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Next Milestone: {nextMilestone} referrals
          </span>
          <span
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {totalReferrals}/{nextMilestone}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <h3
          className={`text-sm font-semibold mb-3 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Unlock Rewards
        </h3>
        <div className="space-y-2">
          {milestoneRewards.map((milestone, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg ${
                totalReferrals >= milestone.referrals
                  ? "bg-opacity-20"
                  : theme === "light"
                  ? "bg-gray-50"
                  : "bg-gray-800"
              }`}
              style={
                totalReferrals >= milestone.referrals
                  ? { backgroundColor: `${accentColor}20` }
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <Star
                  size={16}
                  className={
                    totalReferrals >= milestone.referrals ? "" : "text-gray-400"
                  }
                  style={
                    totalReferrals >= milestone.referrals
                      ? { color: accentColor }
                      : undefined
                  }
                />
                <span
                  className={`text-sm ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {milestone.reward}
                </span>
              </div>
              <span
                className={`text-sm ${
                  totalReferrals >= milestone.referrals
                    ? "font-semibold"
                    : theme === "light"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                {milestone.referrals} referrals
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Friend's name"
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
            placeholder="Their email"
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
          className="w-full px-4 py-3 text-white rounded-lg font-medium flex items-center justify-center gap-2"
          type="submit"
        >
          <Send size={18} />
          <span>Invite & Earn ${rewardAmount}</span>
        </motion.button>
      </form>
    </motion.div>
  );
}
