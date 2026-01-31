"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync Cart Logic
  useEffect(() => {
    const updateCart = () => {
      const data = localStorage.getItem("amazon-world-cart");
      if (data) setCartCount(JSON.parse(data).length);
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <nav
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-sm py-2" : "bg-white/90 backdrop-blur-md py-4"}`}
      >
        <div className="container mx-auto px-6 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/amzworld-logo.jpg"
                  alt="AMZ World Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Center: Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-sm uppercase tracking-wide"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-sm uppercase tracking-wide flex items-center space-x-1"
              >
                <span>Collections</span>
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-sm uppercase tracking-wide"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-sm uppercase tracking-wide"
              >
                Contact
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative hidden xl:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group p-2">
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE TOP NAVBAR (Logo + Search Bar) --- */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/amzworld-logo.jpg"
                  alt="AMZ World Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2">
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            {/* Home */}
            <Link href="/" className="flex flex-col items-center flex-1 group">
              <div className="p-2 rounded-xl group-hover:bg-gray-50 transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-600 mt-0.5">
                Home
              </span>
            </Link>

            {/* Collections */}
            <Link
              href="/collections"
              className="flex flex-col items-center flex-1 group"
            >
              <div className="p-2 rounded-xl group-hover:bg-gray-50 transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-600 mt-0.5">
                Collections
              </span>
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="flex flex-col items-center flex-1 group"
            >
              <div className="p-2 rounded-xl group-hover:bg-gray-50 transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-600 mt-0.5">
                About
              </span>
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="flex flex-col items-center flex-1 group"
            >
              <div className="p-2 rounded-xl group-hover:bg-gray-50 transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-600 mt-0.5">
                Contact
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
