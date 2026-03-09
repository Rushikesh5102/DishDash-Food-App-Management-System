'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { usePathname, useRouter } from 'next/navigation';

const authLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/search', label: 'Search' },
  { href: '/orders', label: 'Orders' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/settings', label: 'Settings' },
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowMobileMenu(false);
    setShowUserMenu(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href={isAuthenticated ? '/dashboard' : '/'} className="text-xl font-bold text-gray-900">
          DishDash
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    pathname === link.href ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((value) => !value)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-sm font-semibold text-white"
                >
                  {user?.firstName?.[0] || 'U'}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile & Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-amber-700">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setShowMobileMenu((value) => !value)}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 lg:hidden"
        >
          {showMobileMenu ? 'Close' : 'Menu'}
        </button>
      </nav>

      {showMobileMenu && (
        <div className="border-t border-amber-100 bg-white px-4 py-3 lg:hidden">
          <div className="space-y-1">
            {isAuthenticated ? (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      pathname === link.href ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setShowMobileMenu(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700">
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setShowMobileMenu(false)}
                  className="block rounded-md bg-gradient-to-r from-amber-600 to-pink-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
