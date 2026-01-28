import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    {
      year: "2023",
      title: "Founded",
      description: "Started with a small boutique in Lagos",
    },
    {
      year: "2025",
      title: "Premium Line",
      description: "Introduced luxury collection",
    },
    {
      year: "2026",
      title: "Online Expansion",
      description: "Launched e-commerce platform",
    },
  ];

  const values = [
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Quality First",
      description: "Every product undergoes rigorous quality checks",
    },
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Customer Trust",
      description: "Secure transactions and data protection",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Fast Delivery",
      description: "Same-day delivery in major cities",
    },
    {
      icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
      title: "Sustainability",
      description: "Eco-friendly materials and packaging",
    },
    {
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Community",
      description: "Supporting local artisans and designers",
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
              Our Story
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Where passion for fashion meets commitment to quality. We&apos;re
              redefining the shopping experience, one premium product at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Shop Collection
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
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Redefining Fashion Retail
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At AMAZON WORLD, we believe that fashion should be accessible,
                sustainable, and expressive. Our mission is to provide premium
                quality clothing that combines style with comfort, while
                maintaining ethical production standards.
              </p>
              <div className="pt-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-black"
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
                  <div>
                    <h3 className="font-bold text-gray-900">Premium Quality</h3>
                    <p className="text-gray-600">
                      Every product is carefully curated and quality-checked
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sustainability</h3>
                    <p className="text-gray-600">
                      Committed to eco-friendly practices and materials
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Our workspace"
                  width={600}
                  height={600}
                  className="w-full h-125 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Our Vision
                    </h3>
                    <p className="text-gray-700">
                      To become Africa&apos;s leading fashion destination,
                      inspiring confidence through quality and style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a fashion destination
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 bg-black rounded-full border-4 border-white z-10"></div>

                  {/* Content */}
                  <div
                    className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"} mt-4 lg:mt-0`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Spacing for alternating sides */}
                  <div
                    className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
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
