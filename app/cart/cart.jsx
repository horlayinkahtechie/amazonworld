"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Cart utility functions
const CART_STORAGE_KEY = "amazon-world-cart";

const getCart = () => {
  if (typeof window === "undefined") return [];
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

const updateCart = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
    // Listen for cart updates
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart);
    setIsLoading(false);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove items with 0 quantity

    setCartItems(updatedCart);
    updateCart(updatedCart);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    updateCart(updatedCart);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  const subtotal = getCartTotal(cartItems);
  const shippingFee = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shippingFee;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="container mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300"
            >
              Start Shopping
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Cart
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="sm:w-32 sm:h-32 w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors h-6"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <span className="text-gray-700 font-medium mr-4">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <span className="text-xl">-</span>
                            </button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                              disabled={item.quantity >= 10}
                            >
                              <span className="text-xl">+</span>
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₦{item.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-4">
                        {item.in_stock ? (
                          <span className="inline-flex items-center text-green-600 text-sm">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-600 text-sm">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shippingFee === 0 ? (
                          <span className="text-green-600">₦0</span>
                        ) : (
                          `₦${shippingFee.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    {subtotal < 50000 && (
                      <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                        🎉 Spend ₦{(50000 - subtotal).toLocaleString()} more for
                        free shipping!
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-2xl">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full cursor-pointer bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] mb-4"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/shop"
                    className="w-full border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>

                  {/* Security Info */}
                  <div className="mt-6 text-sm text-gray-500">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-4 h-4 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Secure checkout
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      100% Satisfaction Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
