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
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700"
          >
            <h3 className="text-gray-400">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}