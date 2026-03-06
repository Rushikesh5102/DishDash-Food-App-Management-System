"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full"></div>
        <p className="text-gray-600 mt-4">Loading DishDash...</p>
      </div>
    </div>
  );
}