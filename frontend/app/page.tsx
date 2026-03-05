"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] text-[#3b2f2f] overflow-hidden relative">

      {/* ANIMATED LUXURY BACKGROUND */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.2] blur-3xl"
        style={{
          background:
            "linear-gradient(120deg, #daa520, #ffb6d9, #daa520, #ffb6d9)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* FLOATING GLASS NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/80 border border-[#daa520]/20 px-10 py-4 rounded-full flex items-center justify-between w-[90%] max-w-6xl shadow-2xl"
      >
        <motion.h1
          animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-xl font-semibold bg-gradient-to-r from-[#daa520] via-[#ffb6d9] to-[#daa520] bg-[length:200%_200%] bg-clip-text text-transparent"
        >
          DishDash
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/orders")}
          className="bg-gradient-to-r from-[#daa520] via-[#ffb6d9] to-[#daa520] text-[#3b2f2f] px-6 py-2 rounded-full font-medium shadow-xl hover:shadow-[#daa520]/30 transition-all"
        >
          Compare
        </motion.button>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative z-10 text-center px-6 pt-40 pb-32 max-w-6xl mx-auto">

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-6xl md:text-7xl font-semibold leading-tight mb-8 tracking-tight"
        >
          Redefining
          <br />
          <span className="bg-gradient-to-r from-[#daa520] via-[#ffb6d9] to-[#daa520] bg-clip-text text-transparent">
            Food Comparison.
          </span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-[#8b7b7b] text-xl max-w-2xl mx-auto mb-14"
        >
          An elegant way to compare delivery fees, discounts and total price —
          across platforms instantly.
        </motion.p>

        <motion.button
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/orders")}
          className="bg-gradient-to-r from-[#daa520] via-[#ffb6d9] to-[#daa520] text-[#3b2f2f] px-14 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-[#daa520]/30 transition-all"
        >
          Start Comparing
        </motion.button>
      </section>

      {/* LUXURY CARDS */}
      <section className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-10 py-24">

        {[
          {
            title: "Precision Pricing",
            desc: "Accurate breakdown including delivery, discounts & final cost.",
          },
          {
            title: "Instant Insights",
            desc: "Identify cheapest & fastest option within seconds.",
          },
          {
            title: "Premium Experience",
            desc: "Designed with elegance, built with performance.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white/50 border border-[#daa520]/20 backdrop-blur-lg rounded-3xl p-10 shadow-xl transition-all"
          >
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-br from-[#daa520]/10 via-[#ffb6d9]/10 to-[#daa520]/10 blur-xl" />

            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#daa520] to-[#ffb6d9] bg-clip-text text-transparent">
              {item.title}
            </h3>
            <p className="text-[#8b7b7b]">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center py-32 border-t border-white/10"
      >
        <h2 className="text-5xl font-semibold mb-10 tracking-tight text-[#3b2f2f]">
          Luxury Meets Utility.
        </h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/orders")}
          className="bg-gradient-to-r from-[#daa520] via-[#ffb6d9] to-[#daa520] text-[#3b2f2f] px-16 py-6 rounded-full font-semibold text-xl shadow-2xl hover:shadow-[#daa520]/30 transition-all"
        >
          Compare Your Next Meal
        </motion.button>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-[#b8a8a8] py-14 tracking-wide">
        © 2026 DishDash — Crafted with Elegance
      </footer>
    </div>
  );
}