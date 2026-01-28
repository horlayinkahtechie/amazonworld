"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      title: "Wear Confidence, Wear Drip",
      subtitle: "Experience clothing that speaks the language of elegance.",
      cta: "SHOP NOW",
      bgColor: "bg-gradient-to-r from-gray-900 to-black",
      textColor: "text-white",
      image: "images/hero-banner-slide1-high.jpg",
      link: "/shop",
    },

    {
      id: 2,
      title: "Premium Craftsmanship",
      subtitle: "Every stitch tells a story of dedication and quality.",
      cta: "VIEW DETAILS",
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      textColor: "text-white",
      image: "images/hero-banner-slide2-high.jpg",
      link: "/shop",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [textAnimation, setTextAnimation] = useState("slide-in");

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger text slide-out before changing slide
      setTextAnimation("slide-out");

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTextAnimation("slide-in");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide change
  const goToSlide = (index) => {
    setTextAnimation("slide-out");
    setTimeout(() => {
      setCurrentSlide(index);
      setTextAnimation("slide-in");
    }, 300);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div
            className={`absolute inset-0 ${slides[currentSlide].bgColor} opacity-30`}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-start">
        <div className="container mx-auto px-4 text-start">
          <div
            className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
              textAnimation === "slide-in"
                ? "translate-x-0 opacity-100"
                : textAnimation === "slide-out"
                  ? "-translate-x-full opacity-0"
                  : ""
            }`}
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${slides[currentSlide].textColor} leading-tight`}
            >
              {slides[currentSlide].title}
            </h1>
            <p
              className={`text-xl md:text-2xl mb-10 ${slides[currentSlide].textColor} opacity-90`}
            >
              {slides[currentSlide].subtitle}
            </p>
            <Link
              href={slides[currentSlide].link}
              className="bg-white cursor-pointer text-black px-10 py-4 text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {slides[currentSlide].cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
