'use client';

import './globals.css';
import { AuthProvider } from '@/lib/authContext';
import { Header } from '@/components/Header';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <AuthProvider>
          <Toaster position="top-right" />
          <Header />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}