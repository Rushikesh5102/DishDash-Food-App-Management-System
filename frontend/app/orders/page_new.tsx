"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { searchAndCompareProduct } from "@/lib/api";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("cheapest");
  const [savedOrders, setSavedOrders] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"search" | "saved">("search");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
    
    const saved = localStorage.getItem("savedOrders");
    if (saved) {
      const orders = JSON.parse(saved);
      setSavedOrders(orders);
      calculateTotalSavings(orders);
    }
  }, []);

  const calculateTotalSavings = (orders: any[]) => {
    const savings = orders.reduce((sum, order) => {
      const maxPrice = Math.max(
        ...order.comparisons.map((c: any) => c.finalPrice)
      );
      return sum + (maxPrice - order.cheapest.finalPrice);
    }, 0);
    setTotalSavings(savings);
  };

  const popularItems = [
    "Chicken Biryani",
    "Veg Burger",
    "Margherita Pizza",
    "Salmon Sushi Roll",
    "Paneer Butter Masala",
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = popularItems.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async (searchTerm?: string) => {
    const finalQuery = searchTerm || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError("");
    setResults(null);
    setSuggestions([]);

    try {
      const data = await searchAndCompareProduct(finalQuery);
      setResults(data);

      const updatedRecent = [
        finalQuery,
        ...recentSearches.filter((r) => r !== finalQuery),
      ].slice(0, 5);

      setRecentSearches(updatedRecent);
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));
    } catch (err: any) {
      setError(err.message || "Error fetching results");
    }

    setLoading(false);
  };

  const saveOrder = (item: any) => {
    const newOrder = {
      ...item,
      savedAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...savedOrders];
    setSavedOrders(updated);
    localStorage.setItem("savedOrders", JSON.stringify(updated));
    calculateTotalSavings(updated);
  };

  const removeOrder = (index: number) => {
    const updated = savedOrders.filter((_, i) => i !== index);
    setSavedOrders(updated);
    localStorage.setItem("savedOrders", JSON.stringify(updated));
    calculateTotalSavings(updated);
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
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#fff0f5] via-white to-[#ffe4e1] text-[#3b2f2f] px-6 py-14">
        {/* VIEW TOGGLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8 flex gap-4 justify-center"
        >
          <motion.button
            onClick={() => setViewMode("search")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === "search"
                ? "bg-[#daa520] text-[#3b2f2f] shadow-lg"
                : "bg-white/30 text-[#3b2f2f] border border-[#daa520]/20"
            }`}
          >
            🔍 Search & Compare
          </motion.button>
          <motion.button
            onClick={() => setViewMode("saved")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === "saved"
                ? "bg-[#daa520] text-[#3b2f2f] shadow-lg"
                : "bg-white/30 text-[#3b2f2f] border border-[#daa520]/20"
            }`}
          >
            💾 Saved Orders ({savedOrders.length})
          </motion.button>
        </motion.div>

        {/* SEARCH MODE */}
        {viewMode === "search" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* HERO */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center mb-14"
            >
              <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#3b2f2f]">
                🍽️ Smart Food Price Comparison
              </h1>
              <p className="text-[#8b7b7b] text-lg">
                Compare prices across Swiggy, Zomato, Eatsure, Maginpin & Dunzo instantly
              </p>

              {/* SEARCH BOX */}
              <motion.div className="mt-8 relative max-w-xl mx-auto">
                <motion.input
                  type="text"
                  placeholder="Search any dish..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-6 py-4 rounded-xl bg-white/50 border-2 border-[#daa520]/30 focus:border-[#daa520] focus:ring-4 focus:ring-[#daa520]/20 outline-none text-[#3b2f2f] placeholder-[#8b7b7b]/50"
                />

                {/* AUTOCOMPLETE */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity:
                      suggestions.length > 0 || (query.length === 0 && recentSearches.length > 0)
                        ? 1
                        : 0,
                    y:
                      suggestions.length > 0 || (query.length === 0 && recentSearches.length > 0)
                        ? 0
                        : -10,
                  }}
                  className="absolute w-full mt-2 bg-white border border-[#daa520]/20 rounded-xl shadow-xl text-left z-50"
                >
                  {query.length === 0 && recentSearches.length > 0 && (
                    <div className="p-3 text-xs text-[#8b7b7b] border-b border-[#daa520]/10 font-semibold">
                      ⏰ Recent Searches
                    </div>
                  )}

                  {(query.length > 0 ? suggestions : recentSearches).map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ backgroundColor: "rgba(218, 165, 32, 0.1)" }}
                      onClick={() => {
                        setQuery(item);
                        handleSearch(item);
                      }}
                      className="px-4 py-3 cursor-pointer transition-all text-sm text-[#3b2f2f]"
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  onClick={() => handleSearch()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-gradient-to-r from-[#daa520] to-[#ffb6d9] hover:from-[#b8860b] hover:to-[#ff99c8] py-3 rounded-xl font-semibold transition-all text-white shadow-lg"
                >
                  {loading ? "🔄 Comparing..." : "Compare Prices"}
                </motion.button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-red-600 font-semibold"
                >
                  ❌ {error}
                </motion.p>
              )}
            </motion.div>

            {/* LOADING */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
              >
                {[1, 2, 3, 4].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white/30 border border-[#daa520]/20 p-8 rounded-2xl h-80"
                  />
                ))}
              </motion.div>
            )}

            {/* RESULTS */}
            {results && results.comparisons?.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
              >
                {/* CHEAPEST HIGHLIGHT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border-2 border-green-400/50 rounded-2xl text-center"
                >
                  <p className="text-[#8b7b7b] text-sm font-semibold">💰 CHEAPEST OPTION</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ₹{results.cheapest.finalPrice}
                  </p>
                  <p className="text-[#3b2f2f] font-semibold">
                    on {results.cheapest.platform}
                  </p>
                </motion.div>

                {/* SORT AND GRID */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#3b2f2f]">
                    All Platforms ({results.comparisons.length})
                  </h2>
                  <motion.select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/30 border border-[#daa520]/20 rounded-lg px-4 py-2 text-sm text-[#3b2f2f] font-semibold"
                  >
                    <option value="cheapest">💰 Cheapest First</option>
                    <option value="fastest">⚡ Fastest First</option>
                  </motion.select>
                </div>

                <motion.div
                  variants={containerVariants}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {(() => {
                    let processed = [...results.comparisons];
                    if (sortBy === "cheapest") {
                      processed.sort((a: any, b: any) => a.finalPrice - b.finalPrice);
                    } else {
                      processed.sort((a: any, b: any) => a.etaMinutes - b.etaMinutes);
                    }

                    return processed.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover="hover"
                        className="p-6 rounded-2xl border bg-white/40 border-[#daa520]/20 hover:shadow-2xl transition-all overflow-hidden relative"
                      >
                        {/* PRODUCT IMAGE */}
                        {item.productImage && (
                          <motion.img
                            src={item.productImage}
                            alt={item.productName}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-48 object-cover rounded-xl mb-4"
                          />
                        )}

                        {/* PLATFORM INFO */}
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#daa520] to-[#ffb6d9] flex items-center justify-center text-white font-bold"
                          >
                            {item.platform.charAt(0)}
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#3b2f2f]">
                              {item.platform}
                            </h3>
                            <p className="text-xs text-[#8b7b7b]">⏱️ {item.etaMinutes} mins</p>
                          </div>
                        </div>

                        {/* PRICING BREAKDOWN */}
                        <div className="space-y-2 text-sm mb-4 bg-white/20 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <span className="text-[#8b7b7b]">Base Price:</span>
                            <span className="font-semibold">₹{item.basePrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8b7b7b]">Delivery:</span>
                            <span className="font-semibold">₹{item.deliveryFee}</span>
                          </div>
                          {item.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount:</span>
                              <span className="font-semibold">-₹{item.discount}</span>
                            </div>
                          )}
                        </div>

                        {/* FINAL PRICE */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 text-3xl font-bold text-[#daa520]"
                        >
                          ₹{item.finalPrice}
                        </motion.div>

                        {/* BUTTONS */}
                        <div className="flex gap-3 mt-6">
                          <motion.button
                            onClick={() => saveOrder(results)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-2 rounded-lg font-semibold bg-white/30 border border-[#daa520]/20 text-[#3b2f2f] hover:bg-white/50 transition-all"
                          >
                            💾 Save
                          </motion.button>
                          <motion.button
                            onClick={() => window.open(item.redirectUrl, "_blank")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-2 rounded-lg font-semibold bg-[#daa520] hover:bg-[#b8860b] text-[#3b2f2f] transition-all"
                          >
                            🛒 Order
                          </motion.button>
                        </div>
                      </motion.div>
                    ));
                  })()}
                </motion.div>
              </motion.div>
            )}

            {!results && !loading && query.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#8b7b7b] mt-24"
              >
                <p className="text-6xl mb-4">🍽️</p>
                <p className="text-xl">Search a dish to start comparing prices</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* SAVED ORDERS MODE */}
        {viewMode === "saved" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto mb-8"
            >
              <h1 className="text-4xl font-bold text-[#3b2f2f] mb-2">💾 Saved Orders</h1>
              
              {savedOrders.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-6 bg-gradient-to-r from-[#daa520]/20 to-[#ffb6d9]/20 border border-[#daa520]/30 rounded-2xl"
                >
                  <p className="text-[#8b7b7b] text-sm">💰 Total Potential Savings</p>
                  <p className="text-4xl font-bold text-green-600">₹{totalSavings.toFixed(2)}</p>
                </motion.div>
              )}
            </motion.div>

            {savedOrders.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
              >
                <div className="grid md:grid-cols-1 gap-6">
                  {savedOrders.map((order, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-6 rounded-2xl border bg-white/40 border-[#daa520]/20 overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-[#3b2f2f]">
                            {order.product}
                          </h2>
                          <p className="text-sm text-[#8b7b7b]">
                            📅 {new Date(order.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <motion.button
                          onClick={() => removeOrder(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-600 font-semibold hover:bg-red-500/30 transition-all"
                        >
                          🗑️ Remove
                        </motion.button>
                      </div>

                      <div className="grid md:grid-cols-5 gap-4">
                        {order.comparisons.map((item: any, idx: number) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white/30 rounded-xl border border-[#daa520]/20"
                          >
                            <p className="font-semibold text-[#3b2f2f] mb-2">
                              {item.platform}
                            </p>
                            <p className="text-2xl font-bold text-[#daa520]">
                              ₹{item.finalPrice}
                            </p>
                            <p className="text-xs text-[#8b7b7b] mt-2">
                              ⏱️ {item.etaMinutes}m
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <motion.button
                          onClick={() =>
                            window.open(order.cheapest.redirectUrl, "_blank")
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 rounded-lg font-semibold bg-[#daa520] hover:bg-[#b8860b] text-[#3b2f2f]"
                        >
                          🛒 Order from {order.cheapest.platform}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#8b7b7b] mt-24"
              >
                <p className="text-6xl mb-4">📭</p>
                <p className="text-xl">No saved orders yet. Start comparing and saving!</p>
              </motion.div>
            )}
          </motion.div>
        )}

        <footer className="mt-24 text-center text-[#b8a8a8] text-sm">
          © 2026 DishDash • Compare smarter, order better
        </footer>
      </div>
    </>
  );
}
