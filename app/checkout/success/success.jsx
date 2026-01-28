"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentRef = searchParams.get("paymentRef");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(
        localStorage.getItem("amazon-world-orders") || "[]",
      );
      const foundOrder = orders.find((o) => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-linear-to-br from-green-900 via-green-800 to-green-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-600"
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
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Payment Successful!
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Thank you for your purchase, {order.customer.firstName}! Your
              order #{orderId} has been confirmed.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Order Number
                </h3>
                <p className="text-2xl font-bold text-gray-900">{orderId}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Payment Reference
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {paymentRef || order.paymentReference || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Total Amount
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  ₦{order.totals.total.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mt-8 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Payment Status:{" "}
                    {order.status === "paid" ? "Paid" : "Pending"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    A receipt has been sent to {order.customer.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 text-sm">
                We&apos;ve sent order confirmation and invoice to{" "}
                {order.customer.email}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                Contact customer support at +234 907 7080 174 or email
                support@amazonworld.com
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-transparent border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
