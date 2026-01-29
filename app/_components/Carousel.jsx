"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const heroData = {
    title: "Style That Makes Sense",
    subtitle: "Elevate your everyday look with timeless fashion pieces.",
    cta: "EXPLORE COLLECTION",
    bgColor: "bg-gradient-to-r from-gray-900 to-black",
    textColor: "text-white",
    image: "images/AMZ_Image.png",
    link: "/shop",
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.image})` }}
        >
          <div
            className={`absolute inset-0 ${heroData.bgColor} opacity-30`}
          ></div>
        </div>
      </div>

      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-start">
        <div className="container mx-auto px-4 text-start">
          <div
            className={`max-w-3xl mx-auto transform transition-all duration-1000 ease-out ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h3
              className={`text-5xl md:text-4xl lg:text-6xl font-bold mb-6 ${heroData.textColor} leading-tight animate-fade-up`}
              style={{ animationDelay: "0.2s" }}
            >
              {heroData.title}
            </h3>
            <p
              className={`text-2xl md:text-2xl lg:text-3xl mb-10 ${heroData.textColor} opacity-90 animate-fade-up`}
              style={{ animationDelay: "0.4s" }}
            >
              {heroData.subtitle}
            </p>
            <Link
              href={heroData.link}
              className="inline-block bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-up hover:shadow-3xl active:scale-95"
              style={{ animationDelay: "0.6s" }}
            >
              {heroData.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
