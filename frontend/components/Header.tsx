'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            🍽️ DishDash
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-indigo-600 transition font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/orders"
                className="text-gray-700 hover:text-indigo-600 transition font-medium"
              >
                My Orders
              </Link>
              <Link
                href="/favorites"
                className="text-gray-700 hover:text-indigo-600 transition font-medium"
              >
                ❤️ Favorites
              </Link>
              <Link
                href="/notifications"
                className="text-gray-700 hover:text-indigo-600 transition font-medium relative"
              >
                🔔 Notifications
                {/* Unread badge would go here */}
              </Link>
              <Link
                href="/settings"
                className="text-gray-700 hover:text-indigo-600 transition font-medium"
              >
                ⚙️ Settings
              </Link>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold hover:shadow-lg transition"
                >
                  {user?.firstName?.[0] || 'U'}
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      👤 My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-2xl"
            >
              {showMobileMenu ? '✕' : '☰'}
            </motion.button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isAuthenticated && showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition"
              onClick={() => setShowMobileMenu(false)}
            >
              My Orders
            </Link>
            <Link
              href="/favorites"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition"
              onClick={() => setShowMobileMenu(false)}
            >
              ❤️ Favorites
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition"
              onClick={() => setShowMobileMenu(false)}
            >
              ⚙️ Settings
            </Link>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition font-medium"
            >
              🚪 Logout
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
