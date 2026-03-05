"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("cheapest");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const popularItems = [
    "Chicken Biryani",
    "Veg Burger",
    "Paneer Butter Masala",
    "Pizza",
    "Fried Rice",
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
      const res = await fetch(
        `http://localhost:5000/api/products/compare/search?product=${encodeURIComponent(
          finalQuery
        )}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setResults(data);

      const updatedRecent = [
        finalQuery,
        ...recentSearches.filter((r) => r !== finalQuery),
      ].slice(0, 5);

      setRecentSearches(updatedRecent);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecent)
      );
    } catch (err: any) {
      setError(err.message || "Error fetching results");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#fff0f5] via-white to-[#ffe4e1] text-[#3b2f2f] px-6 py-14">

        {/* HERO */}
        <div className="max-w-4xl mx-auto text-center mb-14 relative">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#3b2f2f]">
            Smart Food Price Comparison
          </h1>
          <p className="text-[#8b7b7b] text-lg">
            Compare Swiggy, Zomato & Uber Eats instantly.
          </p>

          {/* SEARCH */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search Chicken Biryani..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/40 border border-[#daa520]/30 focus:ring-2 focus:ring-[#daa520] outline-none text-[#3b2f2f]"
            />

            {/* AUTOCOMPLETE DROPDOWN */}
            {(suggestions.length > 0 ||
              (query.length === 0 && recentSearches.length > 0)) && (
              <div className="absolute w-full mt-2 bg-white border border-[#daa520]/20 rounded-xl shadow-xl text-left z-50">
                {query.length === 0 && recentSearches.length > 0 && (
                  <div className="p-3 text-xs text-[#8b7b7b] border-b border-[#daa520]/10">
                    Recent Searches
                  </div>
                )}

                {(query.length > 0
                  ? suggestions
                  : recentSearches
                ).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="px-4 py-3 hover:bg-[#ffb6d9]/20 cursor-pointer transition-all text-sm text-[#3b2f2f]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => handleSearch()}
              className="mt-4 w-full bg-[#daa520] hover:bg-[#b8860b] py-3 rounded-xl font-semibold transition-all text-[#3b2f2f]"
            >
              {loading ? "Comparing..." : "Compare Prices"}
            </button>
          </div>

          {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-white/30 border border-[#daa520]/20 p-8 rounded-2xl h-60"
              ></div>
            ))}
          </div>
        )}

        {/* RESULTS */}
        {results && results.comparisons?.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/30 border border-[#daa520]/20 rounded-lg px-4 py-2 text-sm text-[#3b2f2f]"
              >
                <option value="cheapest">Sort by Cheapest</option>
                <option value="fastest">Sort by Fastest</option>
              </select>
            </div>

            {(() => {
              let processed = [...results.comparisons];

              if (sortBy === "cheapest") {
                processed.sort(
                  (a: any, b: any) =>
                    a.finalPrice - b.finalPrice
                );
              } else {
                processed.sort(
                  (a: any, b: any) =>
                    a.etaMinutes - b.etaMinutes
                );
              }

              return (
                <div className="grid md:grid-cols-2 gap-8">
                  {processed.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="p-8 rounded-2xl border bg-white/40 border-[#daa520]/20 hover:scale-[1.03] transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={`https://logo.clearbit.com/${item.platform
                            .toLowerCase()
                            .replace(" ", "")}.com`}
                          className="w-8 h-8 rounded"
                        />
                        <h3 className="text-xl font-semibold text-[#3b2f2f]">
                          {item.platform}
                        </h3>
                      </div>

                      <p className="text-[#8b7b7b] text-sm">
                        ETA: {item.etaMinutes} mins
                      </p>

                      <div className="mt-4 text-3xl font-bold text-[#daa520]">
                        ₹{item.finalPrice}
                      </div>

                      <button
                        onClick={() =>
                          window.open(
                            item.redirectUrl,
                            "_blank"
                          )
                        }
                        className="mt-6 w-full py-3 rounded-xl font-semibold bg-[#daa520] hover:bg-[#b8860b] text-[#3b2f2f] transition-all"
                      >
                        Order Now
                      </button>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {!results && !loading && (
          <div className="text-center text-[#8b7b7b] mt-24">
            🍽️ Search a dish to start comparing
          </div>
        )}

        <footer className="mt-24 text-center text-[#b8a8a8] text-sm">
          © 2026 DishDash • Compare smarter, order better
        </footer>
      </div>
    </>
  );
}