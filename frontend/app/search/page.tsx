'use client';

import { useMemo, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { searchAndCompareProduct } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface PlatformPrice {
  platform: string;
  basePrice: number;
  deliveryFee: number;
  discount: number;
  finalPrice: number;
  etaMinutes: number;
  rating?: number;
  redirectUrl?: string;
}

interface SearchResult {
  product: string;
  restaurant: string;
  description: string;
  options: PlatformPrice[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'fastest' | 'default'>('default');

  const popularItems = [
    'Chicken Biryani',
    'Veg Burger',
    'Margherita Pizza',
    'Paneer Butter Masala',
    'Masala Dosa',
    'Tandoori Chicken',
  ];

  const sortedOptions = useMemo(() => {
    if (!result?.options?.length) {
      return [];
    }

    const options = [...result.options];

    if (sortBy === 'fastest') {
      options.sort((a, b) => a.etaMinutes - b.etaMinutes);
      return options;
    }

    if (sortBy === 'price') {
      options.sort((a, b) => a.finalPrice - b.finalPrice);
      return options;
    }

    options.sort((a, b) => a.finalPrice - b.finalPrice);
    return options;
  }, [result, sortBy]);

  const runSearch = async (input?: string) => {
    const term = (input ?? query).trim();
    if (!term) {
      setError('Please enter a food item to search.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await searchAndCompareProduct(term);
      const comparisons = Array.isArray(data?.comparisons) ? data.comparisons : [];

      if (!comparisons.length) {
        setError('No listings found for this item.');
        return;
      }

      setResult({
        product: data.product || term,
        restaurant: data.restaurant?.name || comparisons[0]?.restaurantName || 'Unknown restaurant',
        description: 'Compare delivery platforms and place your order from the best option.',
        options: comparisons.map((item: any) => ({
          platform: item.platform,
          basePrice: Number(item.basePrice || 0),
          deliveryFee: Number(item.deliveryFee || 0),
          discount: Number(item.discount || 0),
          finalPrice: Number(item.finalPrice || 0),
          etaMinutes: Number(item.etaMinutes || 0),
          rating: Number(item.rating || 0),
          redirectUrl: item.redirectUrl,
        })),
      });
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50 px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 text-center md:mb-12">
            <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">Search Food</h1>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Compare item pricing and delivery details across platforms.
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-100 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runSearch()}
                placeholder="Search for any dish..."
                className="w-full rounded-xl border border-amber-200 px-4 py-3 text-gray-900 outline-none focus:border-amber-500"
              />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => runSearch()}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-amber-600 to-pink-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </motion.button>
            </div>
          </div>

          {!result && !loading && (
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Popular Searches</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {popularItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      runSearch(item);
                    }}
                    className="rounded-xl border border-amber-100 bg-white px-3 py-3 text-sm font-medium text-gray-800 transition hover:border-amber-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm md:p-7">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{result.product}</h2>
                  <p className="text-sm text-gray-600">{result.restaurant}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto"
                >
                  View Platform Options
                </button>
              </div>

              <p className="text-sm text-gray-700">{result.description}</p>
              {sortedOptions[0] && (
                <p className="mt-3 text-sm font-medium text-green-700">
                  Best current price: Rs {sortedOptions[0].finalPrice.toFixed(2)} on {sortedOptions[0].platform}
                </p>
              )}
            </div>
          )}

          <AnimatePresence>
            {isModalOpen && result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 12 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-xl md:p-6"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{result.product} options</h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-600"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {['default', 'price', 'fastest'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSortBy(mode as 'default' | 'price' | 'fastest')}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                          sortBy === mode
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {mode === 'default' ? 'Default' : mode === 'price' ? 'Lowest Price' : 'Fastest'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {sortedOptions.map((option, index) => (
                      <div
                        key={`${option.platform}-${index}`}
                        className={`rounded-xl border p-4 ${index === 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900">{option.platform}</p>
                          <p className="text-sm text-gray-600">ETA: {option.etaMinutes} min</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 md:grid-cols-4">
                          <p>Base: Rs {option.basePrice.toFixed(2)}</p>
                          <p>Delivery: Rs {option.deliveryFee.toFixed(2)}</p>
                          <p>Discount: Rs {option.discount.toFixed(2)}</p>
                          <p className="font-semibold text-gray-900">Total: Rs {option.finalPrice.toFixed(2)}</p>
                        </div>

                        {option.redirectUrl && (
                          <a
                            href={option.redirectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Order on {option.platform}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
