"use client";

import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { BiStore } from "react-icons/bi";

export default function ContactForPayment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productDetails: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        productDetails: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BiStore className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete Your Purchase
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <FiAlertTriangle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-yellow-800 font-medium">
                    Payment System Update in Progress
                  </p>
                  <p className="text-yellow-700 mt-1">
                    We&apos;re currently upgrading our payment system to provide
                    you with a better checkout experience. Please use the
                    contact methods below to complete your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Contact Us Directly?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Secure Payment Processing
                  </h3>
                  <p className="mt-1 text-gray-600">
                    We&apos;re enhancing our payment security with Paystack
                    verification to ensure your transactions are 100% safe.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0">
                  <FiCheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personalized Service
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Direct communication allows us to provide you with
                    personalized assistance and answer any questions about your
                    order.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Response Time
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Our team responds within 1-2 hours during business hours to
                    ensure you get your products as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Us to Complete Your Purchase
            </h2>

            {/* Direct Contact Options */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4">
                <a
                  href="mailto:orders@yourstore.com"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiMail className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-600">
                      madubugochinonso2018@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+2349077080174"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiPhone className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+234 907 708 0174</p>
                  </div>
                </a>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FiMessageSquare className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">+234 907 708 0174</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why can&apos;t I pay directly on the website?
              </h3>
              <p className="text-gray-600">
                We&apos;re currently undergoing verification with Paystack to
                enhance payment security and add more payment options. This
                temporary process ensures your transactions remain secure during
                this upgrade.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long will this process take?
              </h3>
              <p className="text-gray-600">
                Our payment portal will be active within 7-14 days. Once
                verified, you&apos;ll enjoy faster checkout with multiple
                payment options including cards, bank transfers, and mobile
                money.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my payment information safe?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use secure payment methods and never store your
                card details. All transactions are encrypted and processed
                through verified payment channels.
              </p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
      </div>
    </div>
  );
}
