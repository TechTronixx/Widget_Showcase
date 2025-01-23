import { useState } from "react";
import { ProductQuickView } from "./components/widgets/ProductQuickView";
import { StockStatusIndicator } from "./components/widgets/StockStatusIndicator";
import { MiniCartDrawer } from "./components/widgets/MiniCartDrawer";
import { ReferAndEarnWidget } from "./components/widgets/ReferAndEarnWidget";
import { ReferAndEarnCard } from "./components/widgets/ReferAndEarnCard";
import { ReferAndEarnMinimal } from "./components/widgets/ReferAndEarnMinimal";
import { ReferAndEarnSocial } from "./components/widgets/ReferAndEarnSocial";
import { OrderStatusWidget } from "./components/widgets/OrderStatusWidget";
import { OrderStatusCompact } from "./components/widgets/OrderStatusCompact";
import { OrderStatusToast } from "./components/widgets/OrderStatusToast";

function App() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accentColor, setAccentColor] = useState("#FF5733");

  // Widget states
  const [showProductQuickView, setShowProductQuickView] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showStatusToast, setShowStatusToast] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    "processing" | "shipped" | "out-for-delivery" | "delivered"
  >("processing");

  // Sample data
  const cartItems = [
    {
      id: "1",
      name: "Premium Product",
      price: 99.99,
      quantity: 1,
      image: "https://placehold.co/100x100/png",
      options: {
        Size: "M",
        Color: "Blue",
      },
    },
  ];

  return (
    <div className={theme === "light" ? "bg-gray-100" : "bg-gray-950"}>
      {/* Controls */}
      <div className="fixed z-50 flex gap-4 top-4 right-4">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`px-4 py-2 rounded-lg ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          Toggle Theme
        </button>
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          className="w-10 h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div className="container p-8 mx-auto space-y-12">
        {/* Product Quick View Section */}
        <section>
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Product Quick View
          </h2>
          <button
            onClick={() => setShowProductQuickView(true)}
            className="px-4 py-2 text-white rounded-lg"
            style={{ backgroundColor: accentColor }}
          >
            Show Quick View
          </button>
          <ProductQuickView
            theme={theme}
            accentColor={accentColor}
            isOpen={showProductQuickView}
            onClose={() => setShowProductQuickView(false)}
          />
        </section>

        {/* Stock Status Section */}
        <section>
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Stock Status Indicators
          </h2>
          <div className="grid gap-4">
            <StockStatusIndicator
              theme={theme}
              accentColor={accentColor}
              status="in-stock"
              variant="badge"
            />
            <StockStatusIndicator
              theme={theme}
              accentColor={accentColor}
              status="low-stock"
              variant="card"
              quantity={3}
            />
            <StockStatusIndicator
              theme={theme}
              accentColor={accentColor}
              status="out-of-stock"
              variant="inline"
            />
          </div>
        </section>

        {/* Mini Cart Section */}
        <section>
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Mini Cart
          </h2>
          <button
            onClick={() => setShowMiniCart(true)}
            className="px-4 py-2 text-white rounded-lg"
            style={{ backgroundColor: accentColor }}
          >
            Show Cart
          </button>
          <MiniCartDrawer
            theme={theme}
            accentColor={accentColor}
            isOpen={showMiniCart}
            onClose={() => setShowMiniCart(false)}
            items={cartItems}
          />
        </section>

        {/* Refer & Earn Section */}
        <section>
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Refer & Earn Widgets
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Classic Form
              </h3>
              <ReferAndEarnWidget
                theme={theme}
                accentColor={accentColor}
                rewardAmount={50}
              />
            </div>
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Gamified Card
              </h3>
              <ReferAndEarnCard
                theme={theme}
                accentColor={accentColor}
                rewardAmount={50}
                totalReferrals={12}
                rank="Silver"
                nextMilestone={15}
              />
            </div>
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Minimal Design
              </h3>
              <ReferAndEarnMinimal theme={theme} rewardAmount={50} />
            </div>
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Social Sharing
              </h3>
              <ReferAndEarnSocial
                theme={theme}
                accentColor={accentColor}
                rewardAmount={50}
                referralLink="https://example.com/ref/123"
                referralCode="REF123"
              />
            </div>
          </div>
        </section>

        {/* Order Status Section */}
        <section>
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Order Status Widgets
          </h2>
          <div className="space-y-8">
            <div>
              <label
                className={`block mb-2 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Change Status:
              </label>
              <select
                value={orderStatus}
                onChange={(e) =>
                  setOrderStatus(
                    e.target.value as
                      | "processing"
                      | "shipped"
                      | "out-for-delivery"
                      | "delivered"
                  )
                }
                className={`px-4 py-2 rounded-lg ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-gray-800 border-gray-700"
                }`}
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  Classic Timeline
                </h3>
                <OrderStatusWidget
                  theme={theme}
                  accentColor={accentColor}
                  currentStatus={orderStatus}
                  orderNumber="ORD123"
                  estimatedDelivery="2024-02-01"
                />
              </div>
              <div className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  Compact View
                </h3>
                <OrderStatusCompact
                  theme={theme}
                  accentColor={accentColor}
                  currentStatus={orderStatus}
                  orderNumber="ORD123"
                  estimatedDelivery="2024-02-01"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Toast Notification
              </h3>
              <button
                onClick={() => setShowStatusToast(true)}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: accentColor }}
              >
                Show Status Toast
              </button>
              <OrderStatusToast
                theme={theme}
                accentColor={accentColor}
                currentStatus={orderStatus}
                orderNumber="ORD123"
                isVisible={showStatusToast}
                onClose={() => setShowStatusToast(false)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
