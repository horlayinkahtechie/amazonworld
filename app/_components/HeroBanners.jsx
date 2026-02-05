import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSplit = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[80vh] overflow-hidden font-sans">
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 h-full group cursor-pointer">
        <Image
          src="/product-images/Image1.png"
          alt="Style meets quality"
          fill
          priority
          className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold max-w-xs leading-tight mb-6">
            Timeless Designs, Modern Soul
          </h2>

          <Link
            href="/shop"
            className="text-red-600 font-bold flex items-center gap-2 hover:gap-4 transition-all tracking-wider text-sm uppercase"
          >
            Explore Shop <span className="text-xl">→</span>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative w-full md:w-1/2 h-full group cursor-pointer">
        <Image
          src="/product-images/Image2.jpg"
          alt="Stay ahead of the trend"
          fill
          priority
          className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold max-w-xs leading-tight mb-6">
            Redefining the Urban Aesthetic
          </h2>

          <Link
            href="/collections"
            className="text-red-600 font-bold flex items-center gap-2 hover:gap-4 transition-all tracking-wider text-sm uppercase"
          >
            Our Collection <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSplit;
