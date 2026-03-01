"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Glow Background */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
          DishDash
        </h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/orders")}
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg font-medium transition-all"
        >
          Compare Now
        </motion.button>
      </motion.nav>

      {/* HERO */}
      <section className="relative z-10 text-center px-6 py-32 max-w-6xl mx-auto">

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-6xl md:text-7xl font-bold leading-tight mb-8"
        >
          Compare Food Delivery
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            Like a Pro.
          </span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-gray-400 text-xl max-w-2xl mx-auto mb-12"
        >
          DishDash scans multiple food delivery platforms and finds the
          cheapest option instantly.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="flex justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/orders")}
            className="bg-emerald-500 hover:bg-emerald-600 px-10 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/30"
          >
            Start Comparing
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-8 py-20">

        {[ 
          { value: "₹2,30,000+", label: "Money Saved" },
          { value: "15,000+", label: "Orders Compared" },
          { value: "3 Platforms", label: "Supported Apps" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center hover:scale-105 transition-all"
          >
            <h3 className="text-4xl font-bold text-emerald-400 mb-2">
              {item.value}
            </h3>
            <p className="text-gray-400">{item.label}</p>
          </motion.div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-8 py-20">

        {[
          {
            title: "Instant Comparison",
            desc: "Compare delivery fees, discounts and final price instantly.",
          },
          {
            title: "Smart Breakdown",
            desc: "Transparent pricing before placing your order.",
          },
          {
            title: "Best Deal Highlight",
            desc: "Automatically identifies cheapest & fastest option.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 backdrop-blur-lg hover:scale-105 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center py-28 border-t border-white/10"
      >
        <h2 className="text-5xl font-bold mb-8">
          Order Smarter. Save More.
        </h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/orders")}
          className="bg-emerald-500 hover:bg-emerald-600 px-12 py-5 rounded-xl font-semibold text-xl shadow-lg shadow-emerald-500/30"
        >
          Compare Your Next Meal
        </motion.button>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-gray-500 py-10 border-t border-white/10">
        © 2026 DishDash • Built with precision
      </footer>

    </div>
  );
}