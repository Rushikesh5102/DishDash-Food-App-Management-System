"use client";

import Link from "next/link";
import { LayoutDashboard, Package, BarChart3, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: Package },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white/50 border-r border-[#daa520]/20 p-6">
      <h1 className="text-2xl font-bold text-[#daa520] mb-10">
        DishDash Pro
      </h1>

      <nav className="space-y-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link key={link.name} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-[#3b2f2f] 
                ${active ? "bg-[#daa520]/20 text-[#daa520]" : "hover:bg-[#ffb6d9]/10"}`}
              >
                <Icon size={20} />
                {link.name}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}