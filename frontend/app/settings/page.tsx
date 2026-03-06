"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    showTips: true,
    currency: "INR",
  });

  const [theme, setTheme] = useState("light");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("appSettings");
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      setSettings(parsedSettings);
      setTheme(parsedSettings.darkMode ? "dark" : "light");
    }
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem("appSettings", JSON.stringify(updated));

    if (key === "darkMode") {
      setTheme(value ? "dark" : "light");
    }
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete all saved orders and searches.")) {
      localStorage.removeItem("savedOrders");
      localStorage.removeItem("recentSearches");
      localStorage.removeItem("appSettings");
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {
      savedOrders: localStorage.getItem("savedOrders"),
      recentSearches: localStorage.getItem("recentSearches"),
      settings: localStorage.getItem("appSettings"),
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dishdash-backup-${Date.now()}.json`;
    link.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen px-6 py-14 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-[#fff0f5] via-white to-[#ffe4e1] text-[#3b2f2f]"
      }`}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h1 className={`text-5xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-[#3b2f2f]"
          }`}>
            ⚙️ Settings
          </h1>
          <p className={theme === "dark" ? "text-gray-400" : "text-[#8b7b7b]"}>
            Customize your DishDash experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* NOTIFICATION SETTINGS */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border-2 ${
              theme === "dark"
                ? "bg-gray-800/50 border-blue-500/30"
                : "bg-white/40 border-[#daa520]/20"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#3b2f2f]"
            }`}>
              🔔 Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-[#3b2f2f]"
                  }`}>
                    Push Notifications
                  </p>
                  <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-[#8b7b7b] text-sm"}>
                    Get notified when prices change
                  </p>
                </div>
                <motion.button
                  onClick={() => handleSettingChange("notifications", !settings.notifications)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    settings.notifications
                      ? "bg-[#daa520]"
                      : theme === "dark"
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.notifications ? 28 : 4 }}
                    className="w-6 h-6 bg-white rounded-full"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-[#3b2f2f]"
                  }`}>
                    Show Tips & Tricks
                  </p>
                  <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-[#8b7b7b] text-sm"}>
                    Display helpful suggestions
                  </p>
                </div>
                <motion.button
                  onClick={() => handleSettingChange("showTips", !settings.showTips)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    settings.showTips
                      ? "bg-[#daa520]"
                      : theme === "dark"
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.showTips ? 28 : 4 }}
                    className="w-6 h-6 bg-white rounded-full"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* APPEARANCE SETTINGS */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border-2 ${
              theme === "dark"
                ? "bg-gray-800/50 border-purple-500/30"
                : "bg-white/40 border-[#daa520]/20"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#3b2f2f]"
            }`}>
              🎨 Appearance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-[#3b2f2f]"
                  }`}>
                    Dark Mode
                  </p>
                  <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-[#8b7b7b] text-sm"}>
                    Easy on the eyes for night time
                  </p>
                </div>
                <motion.button
                  onClick={() => handleSettingChange("darkMode", !settings.darkMode)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    settings.darkMode
                      ? "bg-[#daa520]"
                      : theme === "dark"
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.darkMode ? 28 : 4 }}
                    className="w-6 h-6 bg-white rounded-full"
                  />
                </motion.button>
              </div>

              <div>
                <p className={`font-semibold mb-3 ${
                  theme === "dark" ? "text-white" : "text-[#3b2f2f]"
                }`}>
                  Currency
                </p>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange("currency", e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white/30 border-[#daa520]/20 text-[#3b2f2f]"
                  } border`}
                >
                  <option value="INR">₹ Indian Rupee (INR)</option>
                  <option value="USD">$ US Dollar (USD)</option>
                  <option value="EUR">€ Euro (EUR)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* DATA SETTINGS */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border-2 ${
              theme === "dark"
                ? "bg-gray-800/50 border-green-500/30"
                : "bg-white/40 border-[#daa520]/20"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#3b2f2f]"
            }`}>
              💾 Data Management
            </h2>

            <div className="space-y-3">
              <motion.button
                onClick={handleExportData}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                  theme === "dark"
                    ? "bg-green-600/30 border border-green-600/50 text-green-400 hover:bg-green-600/50"
                    : "bg-green-400/20 border border-green-400/50 text-green-600 hover:bg-green-400/30"
                }`}
              >
                📥 Export Data as JSON
              </motion.button>

              <motion.button
                onClick={handleClearData}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                  theme === "dark"
                    ? "bg-red-600/30 border border-red-600/50 text-red-400 hover:bg-red-600/50"
                    : "bg-red-400/20 border border-red-400/50 text-red-600 hover:bg-red-400/30"
                }`}
              >
                🗑️ Clear All Data
              </motion.button>
            </div>
          </motion.div>

          {/* DATA STORAGE */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border-2 ${
              theme === "dark"
                ? "bg-gray-800/50 border-yellow-500/30"
                : "bg-white/40 border-[#daa520]/20"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#3b2f2f]"
            }`}>
              📊 Storage Statistics
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-white/30"
              }`}>
                <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-[#8b7b7b] text-sm"}>
                  Saved Orders
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}>
                  {localStorage.getItem("savedOrders")
                    ? JSON.parse(localStorage.getItem("savedOrders") || "[]").length
                    : 0}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-white/30"
              }`}>
                <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-[#8b7b7b] text-sm"}>
                  Recent Searches
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}>
                  {localStorage.getItem("recentSearches")
                    ? JSON.parse(localStorage.getItem("recentSearches") || "[]").length
                    : 0}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ABOUT */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border-2 ${
              theme === "dark"
                ? "bg-gray-800/50 border-indigo-500/30"
                : "bg-white/40 border-[#daa520]/20"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#3b2f2f]"
            }`}>
              ℹ️ About DishDash
            </h2>

            <div className={theme === "dark" ? "text-gray-300 space-y-2" : "text-[#8b7b7b] space-y-2"}>
              <p className="font-semibold">Version 1.0.0</p>
              <p>© 2026 DishDash • Smart Food Price Comparison</p>
              <p className="text-sm">
                Made with ❤️ to help you save money on food delivery
              </p>
            </div>
          </motion.div>
        </motion.div>

        {savedSuccessfully && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold"
          >
            ✅ Settings saved successfully!
          </motion.div>
        )}

        <footer className={`mt-24 text-center text-sm ${
          theme === "dark" ? "text-gray-500" : "text-[#b8a8a8]"
        }`}>
          © 2026 DishDash • Smart ordering, Smarter savings
        </footer>
      </div>
    </>
  );
}