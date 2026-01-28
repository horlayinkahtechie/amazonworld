"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CART_STORAGE_KEY = "amazon-world-cart";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    deliveryInstructions: "",
  });

  const states = [
    "Lagos",
    "Abuja",
    "Rivers",
    "Oyo",
    "Kano",
    "Delta",
    "Kaduna",
    "Ogun",
    "Ondo",
    "Enugu",
    "Edo",
    "Plateau",
    "Akwa Ibom",
    "Cross River",
    "Imo",
  ];

  // Load Paystack script
  useEffect(() => {
    const loadPaystackScript = () => {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        setPaystackLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadPaystackScript();
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
      const cart = JSON.parse(cartData);
      setCartItems(cart);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shippingFee = 8500;
    const total = subtotal + shippingFee;
    return { subtotal, shippingFee, total };
  };

  const validateForm = () => {
    const requiredFields = [
      "email",
      "phone",
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert(
          `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field`,
        );
        return false;
      }
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Nigerian phone number validation
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
    const cleanPhone = formData.phone.replace(/\s/g, "");

    if (!phoneRegex.test(cleanPhone)) {
      alert(
        "Please enter a valid Nigerian phone number (e.g., 08012345678, +2348012345678)",
      );
      return false;
    }

    return true;
  };

  const generateOrder = () => {
    const orderId = `ORD-${Math.random().toString(10).substr(2, 9)}`;

    return {
      id: orderId,
      items: cartItems,
      customer: formData,
      totals: calculateTotals(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  };

  const initializePaystackPayment = () => {
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!paystackLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      // Generate order
      const order = generateOrder();
      const { total } = calculateTotals();

      // Convert to kobo (Paystack expects amount in kobo)
      const amountInKobo = total * 100;

      // Paystack public key - Replace with your actual public key
      const PAYSTACK_PUBLIC_KEY =
        process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
        "pk_test_your_test_key_here";

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amountInKobo,
        currency: "NGN",
        ref: order.id,
        metadata: {
          custom_fields: [
            {
              display_name: "First Name",
              variable_name: "first_name",
              value: formData.firstName,
            },
            {
              display_name: "Last Name",
              variable_name: "last_name",
              value: formData.lastName,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: formData.phone,
            },
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: order.id,
            },
          ],
        },
        callback: function (response) {
          // Payment successful
          console.log("Payment successful!", response);

          // Update order status to paid
          order.status = "paid";
          order.paymentReference = response.reference;
          order.paidAt = new Date().toISOString();

          // Save order to localStorage
          const orders = JSON.parse(
            localStorage.getItem("amazon-world-orders") || "[]",
          );
          orders.push(order);
          localStorage.setItem("amazon-world-orders", JSON.stringify(orders));

          // Clear cart
          localStorage.removeItem(CART_STORAGE_KEY);

          // Dispatch cart update event
          window.dispatchEvent(new Event("cart-updated"));

          // Redirect to success page
          router.push(
            `/checkout/success?orderId=${order.id}&paymentRef=${response.reference}`,
          );
        },
        onClose: function () {
          // Payment cancelled
          alert("Payment was cancelled. Please try again.");
          setIsProcessing(false);
        },
      });

      // Open Paystack payment modal
      handler.openIframe();
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initializePaystackPayment();
  };

  const { subtotal, shippingFee, total } = calculateTotals();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add items to your cart before checkout
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Step 2 of 2: Checkout</div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">
                Complete your purchase with your details
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="you@example.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your payment receipt will be sent here
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="+234 907 7080 174"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: 08012345678 or +2348012345678
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="123 Fashion Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="Victoria Island"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      placeholder="101241"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300"
                      disabled
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300 resize-none"
                      placeholder="Gate code, landmarks, or special delivery notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Payment Method
                </h2>
                <div className="flex items-center p-4 bg-blue-50 rounded-xl mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Pay with Paystack
                    </h3>
                    <p className="text-sm text-gray-600">
                      Secured payment powered by Paystack. Accepts cards, bank
                      transfers, and USSD.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b border-gray-100 pb-4"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
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
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <label className="flex items-start">
                    <input type="checkbox" required className="mt-1 mr-3" />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and authorize this payment
                    </span>
                  </label>
                </div>

                {/* Pay with Paystack Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !paystackLoaded}
                  className={`w-full py-4 cursor-pointer rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${isProcessing || !paystackLoaded ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 transform hover:scale-[1.02]"}`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : !paystackLoaded ? (
                    "Loading Payment..."
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      Pay ₦{total.toLocaleString()}
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <Link
                  href="/cart"
                  className="block w-full border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 text-center mt-4"
                >
                  Back to Cart
                </Link>

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
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
                    Secured by Paystack
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
                    Your payment is 100% secure
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our customer support team for assistance with your
                  order.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +234 907 7080 174
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
