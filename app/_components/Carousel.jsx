"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const heroData = {
    title: "Style That Makes Sense",
    subtitle: "Elevate your everyday look with timeless fashion pieces.",
    cta: "EXPLORE COLLECTION",
    bgColor: "bg-gradient-to-r from-gray-900 to-black",
    textColor: "text-white",
    image: "/images/AMZ_Image.png", // Note: Added leading slash
    link: "/shop",
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image using Next.js Image */}
      <div className="absolute inset-0">
        <Image
          src={heroData.image}
          alt="Fashion Hero Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
          // Optional: Add placeholder or blur effect
          // placeholder="blur"
          // blurDataURL="data:image/jpeg;base64,..."
        />
        <div
          className={`absolute inset-0 ${heroData.bgColor} opacity-30`}
        ></div>
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
            <h1 // Changed from h3 to h1 for better SEO
              className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${heroData.textColor} leading-tight`}
            >
              {heroData.title}
            </h1>
            <p
              className={`text-xl sm:text-2xl md:text-3xl mb-8 md:mb-10 ${heroData.textColor} opacity-90`}
            >
              {heroData.subtitle}
            </p>
            <Link
              href={heroData.link}
              className="inline-block bg-white text-black px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl active:scale-95"
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
