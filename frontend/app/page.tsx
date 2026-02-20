"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">DishDash</h1>
        <div className="space-x-6">
          <button className="hover:text-blue-600">Home</button>
          <button className="hover:text-blue-600">Orders</button>
          <button className="hover:text-blue-600">About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-4xl font-bold mb-4">
          Manage Your Food Orders Smartly
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Efficient. Fast. Reliable.
        </p>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full border p-2 mb-4 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add New Order
          </button>
        </div>
      </div>

    </div>
  );
}