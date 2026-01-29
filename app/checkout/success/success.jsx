"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentRef = searchParams.get("paymentRef");
  const [order, setOrder] = useState(null);
  const [emailStatus, setEmailStatus] = useState({
    sent: false,
    loading: false,
    error: null,
  });

  // Function to send emails
  const sendOrderEmails = async (orderData) => {
    setEmailStatus({ sent: false, loading: true, error: null });

    try {
      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: orderData,
          paymentRef: paymentRef,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send emails");
      }

      const result = await response.json();
      setEmailStatus({ sent: true, loading: false, error: null });
      return result;
    } catch (error) {
      console.error("Email sending error:", error);
      setEmailStatus({ sent: false, loading: false, error: error.message });
    }
  };

  useEffect(() => {
    const loadOrderAndSendEmails = async () => {
      if (orderId) {
        const orders = JSON.parse(
          localStorage.getItem("amazon-world-orders") || "[]",
        );
        const foundOrder = orders.find((o) => o.id === orderId);

        if (foundOrder) {
          setOrder(foundOrder);

          // Only send emails if not already sent for this order
          if (!foundOrder.emailsSent) {
            // Send emails
            await sendOrderEmails(foundOrder);

            // Mark emails as sent in localStorage
            const updatedOrders = orders.map((o) => {
              if (o.id === orderId) {
                return { ...o, emailsSent: true };
              }
              return o;
            });
            localStorage.setItem(
              "amazon-world-orders",
              JSON.stringify(updatedOrders),
            );
          }
        }
      }
    };

    loadOrderAndSendEmails();
  }, [orderId, paymentRef]);

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

            {/* Email Status Indicator */}
            <div className="mt-6">
              {emailStatus.loading && (
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending confirmation emails...
                </div>
              )}
              {emailStatus.sent && (
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full">
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Confirmation emails sent!
                </div>
              )}
              {emailStatus.error && (
                <div className="inline-flex items-center bg-red-500/20 text-white px-4 py-2 rounded-full">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  Email failed to send. Please contact support.
                </div>
              )}
            </div>
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

            {/* Order Items */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>
                          Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                        </span>
                        <span className="font-semibold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Continue Shopping
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
        </div>
      </main>
    </div>
  );
}
