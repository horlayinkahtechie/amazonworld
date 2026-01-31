import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay (To make text pop) */}
      <div className="absolute z-10 w-full h-full bg-black/50" />

      {/* 3. Content Container */}
      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Designed for the Bold.
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light">
          Our collections combine modern aesthetics with premium craftsmanship
          to create timeless pieces for individuals who set trends, not follow
          them.
        </p>

        <Link
          href="/shop"
          className="bg-white text-black px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
