"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // Function to get cart count from localStorage
  const getCartCount = () => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("amazon-world-cart");
      if (cartData) {
        try {
          const cart = JSON.parse(cartData);
          // Count unique products (not total quantity)
          const uniqueProductCount = cart.reduce((count, item) => {
            return count + 1; // Each item in cart counts as 1, regardless of quantity
          }, 0);
          return uniqueProductCount;
        } catch (error) {
          console.error("Error parsing cart data:", error);
          return 0;
        }
      }
    }
    return 0;
  };

  // Function to update cart count
  const updateCartCount = () => {
    const count = getCartCount();
    setCartCount(count);
  };

  // Load cart count on component mount
  useEffect(() => {
    updateCartCount();

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      updateCartCount();
    };

    // Add event listener for custom cart-updated event
    window.addEventListener("cart-updated", handleCartUpdate);

    // Also listen for storage changes (in case cart is modified in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "amazon-world-cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Set up interval to check for cart updates (fallback)
    const intervalId = setInterval(updateCartCount, 2000);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // You can implement search functionality here
      // For example: router.push(`/search?q=${searchQuery}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to handle cart click (optional - you can add more logic here)
  const handleCartClick = () => {
    // Update cart count when cart icon is clicked (just to be sure it's current)
    updateCartCount();
  };

  return (
    <>
      <nav className="top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="shrink-0">
                <Image
                  src="/images/amzworld-logo.jpg"
                  alt="Amazon World Logo"
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Hidden when search is open */}
            {!isSearchOpen && (
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-white transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    {/* Underline effect */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2"></span>
                  </a>
                ))}
              </div>
            )}

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Bar Container */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isSearchOpen ? "w-80" : "w-0 overflow-hidden"
                }`}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    autoFocus={isSearchOpen}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </form>
              </div>

              {/* Search Toggle Button */}
              <button
                onClick={handleSearchToggle}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
              >
                {isSearchOpen ? (
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>

              {/* Cart Icon */}
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Dynamic Cart Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* CTA Button - Hidden when search is open */}
              {!isSearchOpen && (
                <Link
                  href="/collections"
                  className="hidden md:block cursor-pointer bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-black/40 transition-colors duration-300"
                >
                  SHOP NOW
                </Link>
              )}
            </div>

            {/* Mobile View - Icons */}
            <div className="flex md:hidden items-center space-x-4">
              {/* Search Icon for Mobile */}
              <button
                onClick={handleSearchToggle}
                className="p-2 hover:bg-gray-100 text-white rounded-full transition-colors duration-300"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
              >
                {isSearchOpen ? (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>

              {/* Cart Icon for Mobile */}
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Dynamic Cart Badge for Mobile */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={handleMobileMenuToggle}
                className="text-white p-2 hover:bg-gray-100/20 rounded-full transition-colors duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Full width */}
          {isSearchOpen && (
            <div className="mt-4 md:hidden animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-md"
                  autoFocus
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "bg-black/50 backdrop-blur-sm"
            : "bg-transparent pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="shrink-0">
              <Image
                src="/images/amzworld-logo.jpg"
                alt="Amazon World Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <button
              onClick={closeMobileMenu}
              className="text-gray-700 hover:text-black p-2"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-black transition-colors duration-300 font-medium py-4 px-2 relative group border-b border-gray-100 last:border-b-0"
              >
                {item.name}
                {/* Underline effect for mobile */}
                <span className="absolute -bottom-0.5 left-2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-1/3"></span>
              </a>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <Link
            href="/collections"
            onClick={closeMobileMenu}
            className="w-full mt-8 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            SHOP NOW
          </Link>

          {/* Cart Info in Mobile Menu */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {/* Dynamic Cart Badge in Mobile Menu */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Your Cart</p>
                  <p className="text-gray-500 text-sm">
                    {cartCount === 0
                      ? "Cart is empty"
                      : `${cartCount} item${cartCount !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Need help? <br />
              <a
                href="tel:+2349077080174"
                className="text-black font-medium hover:underline"
              >
                +234 (907) 708 0174
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
