"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/compare/search?product=${encodeURIComponent(
          query
        )}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch results");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950 to-black text-white px-6 py-16">
      
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Compare Food Prices Instantly
        </h1>

        <p className="text-gray-400 text-lg">
          Find the cheapest platform in seconds.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search Chicken Biryani..."
            className="w-full max-w-lg px-5 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold transition-all w-full sm:w-auto"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-red-400 font-medium">{error}</p>
        )}
      </div>

      {/* RESULTS */}
      {results && results.comparisons?.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Results for{" "}
            <span className="text-emerald-400">
              {results.product}
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {results.comparisons.map((item: any, index: number) => {
              const isCheapest =
                item.platform === results.cheapest?.platform;

              return (
                <div
                  key={index}
                  className={`relative p-8 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105
                    ${
                      isCheapest
                        ? "bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/20"
                        : "bg-white/5 border-white/10"
                    }`}
                >
                  {isCheapest && (
                    <div className="absolute -top-3 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      BEST DEAL
                    </div>
                  )}

                  <h3 className="text-2xl font-semibold mb-4">
                    {item.platform}
                  </h3>

                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>Base Price: ₹{item.basePrice}</p>
                    <p>Delivery Fee: ₹{item.deliveryFee}</p>
                    <p>Discount: -₹{item.discount}</p>
                    <p>ETA: {item.etaMinutes} mins</p>
                  </div>

                  <div className="mt-6 text-3xl font-bold text-white">
                    ₹{item.finalPrice}
                  </div>

                  <button
                    onClick={() =>
                      window.open(item.redirectUrl, "_blank")
                    }
                    className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all
                      ${
                        isCheapest
                          ? "bg-emerald-500 hover:bg-emerald-600 text-black"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                  >
                    Order Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}