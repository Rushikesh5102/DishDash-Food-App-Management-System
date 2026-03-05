"use client";

import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    { title: "Total Orders", value: 120 },
    { title: "Revenue", value: "₹45,000" },
    { title: "Pending Orders", value: 12 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-[#3b2f2f]">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/50 p-6 rounded-xl shadow-xl border border-[#daa520]/20"
          >
            <h3 className="text-[#8b7b7b]">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2 text-[#3b2f2f]">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}