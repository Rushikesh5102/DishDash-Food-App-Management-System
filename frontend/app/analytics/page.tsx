"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [savedOrders, setSavedOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrdersCompared: 0,
    totalSavings: 0,
    averageDiscountRate: 0,
    mostUsedPlatform: "",
    cheapestPlatform: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("savedOrders");
    const recent = localStorage.getItem("recentSearches");

    if (saved) {
      const orders = JSON.parse(saved);
      setSavedOrders(orders);
      calculateStats(orders, recent ? JSON.parse(recent) : []);
    }
  }, []);

  const calculateStats = (orders: any[], searches: any[]) => {
    let totalSavings = 0;
    let platformUsage: Record<string, number> = {};
    let platformCheapest: Record<string, number> = {};
    let totalDiscounts = 0;
    let discountCount = 0;

    orders.forEach((order) => {
      const maxPrice = Math.max(
        ...order.comparisons.map((c: any) => c.finalPrice)
      );
      const savings = maxPrice - order.cheapest.finalPrice;
      totalSavings += savings;

      order.comparisons.forEach((c: any) => {
        platformUsage[c.platform] = (platformUsage[c.platform] || 0) + 1;
        if (c.discount > 0) {
          totalDiscounts += c.discount;
          discountCount++;
        }
      });

      platformCheapest[order.cheapest.platform] =
        (platformCheapest[order.cheapest.platform] || 0) + 1;
    });

    const mostUsedPlatform =
      Object.entries(platformUsage).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";
    const cheapestPlatform =
      Object.entries(platformCheapest).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    setStats({
      totalOrdersCompared: searches.length,
      totalSavings,
      averageDiscountRate:
        discountCount > 0 ? (totalDiscounts / discountCount).toFixed(2) : 0,
      mostUsedPlatform,
      cheapestPlatform,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#fff0f5] via-white to-[#ffe4e1] text-[#3b2f2f] px-6 py-14">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-bold text-[#3b2f2f] mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-[#8b7b7b] text-lg">
            Track your ordering habits and savings with detailed analytics
          </p>
        </motion.div>

        {savedOrders.length > 0 ? (
          <>
            {/* STATS GRID */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12"
            >
              {/* Total Searches */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-500/20 border-2 border-blue-400/50"
              >
                <p className="text-blue-600 font-semibold text-sm">📝 Searches Compared</p>
                <p className="text-5xl font-bold text-blue-600 mt-3">
                  {stats.totalOrdersCompared}
                </p>
                <p className="text-blue-600/70 text-sm mt-2">
                  Total price comparisons made
                </p>
              </motion.div>

              {/* Total Savings */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-green-400/20 to-green-500/20 border-2 border-green-400/50"
              >
                <p className="text-green-600 font-semibold text-sm">💰 Total Savings</p>
                <p className="text-5xl font-bold text-green-600 mt-3">
                  ₹{stats.totalSavings.toFixed(2)}
                </p>
                <p className="text-green-600/70 text-sm mt-2">
                  By choosing cheapest options
                </p>
              </motion.div>

              {/* Avg Discount */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#daa520]/20 to-[#ffb6d9]/20 border-2 border-[#daa520]/50"
              >
                <p className="font-semibold text-sm text-[#daa520]">🎁 Avg Discount</p>
                <p className="text-5xl font-bold text-[#daa520] mt-3">
                  ₹{stats.averageDiscountRate}
                </p>
                <p className="text-[#daa520]/70 text-sm mt-2">
                  Per platform average
                </p>
              </motion.div>
            </motion.div>

            {/* PLATFORM INSIGHTS */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12"
            >
              {/* Most Used */}
              <motion.div
                variants={itemVariants}
                className="p-8 rounded-2xl bg-white/40 border-2 border-[#daa520]/20"
              >
                <h3 className="text-2xl font-bold text-[#3b2f2f] mb-6">
                  🏆 Most Frequently Cheapest
                </h3>
                <div className="text-6xl font-bold text-[#daa520]">
                  {stats.cheapestPlatform}
                </div>
                <p className="text-[#8b7b7b] mt-3">
                  Usually offers the best prices for your orders
                </p>
              </motion.div>

              {/* Platform Breakdown */}
              <motion.div
                variants={itemVariants}
                className="p-8 rounded-2xl bg-white/40 border-2 border-[#daa520]/20"
              >
                <h3 className="text-2xl font-bold text-[#3b2f2f] mb-6">
                  📍 All Platforms
                </h3>
                <div className="space-y-3">
                  {["Swiggy", "Zomato", "Eatsure", "Maginpin", "Dunzo"].map((platform) => (
                    <motion.div
                      key={platform}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/20"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#daa520]"></div>
                      <span className="font-semibold text-[#3b2f2f]">{platform}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* SAVED ORDERS BREAKDOWN */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-[#3b2f2f] mb-6">
                📋 Recent Comparisons
              </h2>
              <div className="space-y-4">
                {savedOrders.slice(0, 5).map((order, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-2xl bg-white/40 border border-[#daa520]/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#3b2f2f]">
                          {order.product}
                        </h3>
                        <p className="text-sm text-[#8b7b7b]">
                          📅 {new Date(order.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ₹{(Math.max(...order.comparisons.map((c: any) => c.finalPrice)) -
                            order.cheapest.finalPrice).toFixed(2)}
                        </p>
                        <p className="text-xs text-green-600/70">Saved</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {order.comparisons.map((item: any, i: number) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className={`p-3 rounded-lg text-center ${
                            item.platform === order.cheapest.platform
                              ? "bg-green-400/30 border-2 border-green-400"
                              : "bg-white/20"
                          }`}
                        >
                          <p className="text-xs font-semibold text-[#8b7b7b]">
                            {item.platform}
                          </p>
                          <p className="text-lg font-bold text-[#daa520] mt-1">
                            ₹{item.finalPrice}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-24"
          >
            <p className="text-6xl mb-4">📊</p>
            <p className="text-xl text-[#8b7b7b]">
              No data yet. Start comparing orders to see analytics!
            </p>
          </motion.div>
        )}

        <footer className="mt-24 text-center text-[#b8a8a8] text-sm">
          © 2026 DishDash • Smart ordering, Smarter savings
        </footer>
      </div>
    </>
  );
}