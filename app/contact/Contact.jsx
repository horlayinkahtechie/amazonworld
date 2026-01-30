import { InstagramIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiLogoSnapchat, BiLogoTiktok } from "react-icons/bi";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Email",
      details: "madubugochinonso2018@gmail.com",
      subtext: "Response within 24 hours",
      link: "mailto:madubugochinonso2018@gmail.com",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      title: "Phone",
      details: "+234 907 7080 174",
      subtext: "Mon-Fri, 9am-6pm WAT",
      link: "tel:+2349077080174",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We&apos;re here to help. Reach out for inquiries, support, or just
              to say hello. Our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact-form"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Send Message
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Link>
              <Link
                href="/faq"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Visit FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent">
                  <div
                    className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <svg
                      className={`w-8 h-8 ${method.iconColor}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={method.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    {method.details}
                  </p>
                  <p className="text-gray-600 text-sm">{method.subtext}</p>
                  <div className="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Contact us
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow us on social media for updates, style tips, and exclusive
              offers
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            {[
              {
                name: "Snapchat",
                icon: <BiLogoSnapchat />,
                link: "https://snapchat.com/amzz.zz25",
              },

              {
                name: "TikTok",
                icon: <BiLogoTiktok />,
                link: "https://tiktok.com/amazonwrld1",
              },
              {
                name: "Instagram",
                icon: <InstagramIcon />,
                link: "https://instagram.com/amz_wrld",
              },
            ].map((platform) => (
              <a key={platform.name} href={platform.link} className="group">
                <div
                  className={`w-16 h-16 ${platform.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}
                >
                  <span className="text-black font-bold text-sm">
                    {platform.icon}
                  </span>
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700">
                  {platform.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
        <button className="bg-white px-6 py-3 rounded-full shadow-2xl border border-gray-100 font-bold text-sm hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Chat with us
        </button>
        <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <span className="text-white text-2xl font-bold">W</span>
        </div>
      </div>
    </div>
  );
}
