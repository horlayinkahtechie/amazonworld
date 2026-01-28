"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    title: "DL 2018 Tee",
    category: "Shirts",
    price: 60000,
    in_stock: true,
    description:
      "Premium quality cotton t-shirt with modern design and comfortable fit. Perfect for casual wear and everyday style.",
    specifications: {
      material: "100% Premium Cotton",
      fit: "Regular Fit",
      sleeve: "Short Sleeve",
      washCare: "Machine wash cold, tumble dry low",
    },
    images: ["/product-images/product2.jpg", "/product-images/product8.jpg"],
    image_url: "/product-images/product2.jpg",
  },
  {
    id: 2,
    title: "Drippo Lifestyle Sleeveless",
    category: "Activewear",
    price: 80000,
    in_stock: true,
    description:
      "High-performance sleeveless shirt for active lifestyles. Moisture-wicking fabric and ergonomic design.",
    specifications: {
      material: "Polyester-Spandex Blend",
      fit: "Athletic Fit",
      sleeve: "Sleeveless",
      washCare: "Machine wash cold, do not tumble dry",
    },
    images: ["/product-images/product1.jpg", "/product-images/product9.jpg"],
    image_url: "/product-images/product1.jpg",
  },
  {
    id: 3,
    title: "I'm Broken Tee",
    category: "Shirts",
    price: 60000,
    in_stock: true,
    description:
      "Edgy graphic tee with unique distressed design. Made from soft, breathable cotton for all-day comfort.",
    specifications: {
      material: "100% Organic Cotton",
      fit: "Oversized Fit",
      sleeve: "Short Sleeve",
      washCare: "Hand wash recommended",
    },
    images: ["/product-images/product3.jpg", "/product-images/product10.jpg"],
    image_url: "/product-images/product3.jpg",
  },
  {
    id: 4,
    title: "Woke Civilian",
    category: "Premium",
    price: 110000,
    in_stock: true,
    description:
      "Luxury hoodie made from premium French terry cotton. Features embroidered logo and reinforced stitching.",
    specifications: {
      material: "French Terry Cotton",
      fit: "Relaxed Fit",
      sleeve: "Long Sleeve",
      washCare: "Dry clean recommended",
    },
    images: ["product-images/product4.jpg", "/product-images/product10.jpg"],
    image_url: "product-images/product4.jpg",
  },
];

export default function TopPicks() {
  const router = useRouter();

  const handleRedirectToCheckout = (productId) => {
    router.push(`/shop/${productId}`);
  };
  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Popular Products
          </h2>
          <Link
            href="/shop"
            className="group flex items-center text-[14px] font-bold tracking-[0.2em] text-[#C5A25D] uppercase transition-hover"
          >
            View All
            <span className="ml-2 text-lg transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-6 flex flex-col min-h-112.5 group cursor-pointer hover:border-black transition-colors"
            >
              {/* Image Container */}
              <div className="grow flex items-center justify-center p-4">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-w-full max-h-64 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-end mt-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-black">
                    ₦ {product.price}
                  </p>
                </div>
                <button
                  onClick={() => handleRedirectToCheckout(product.id)}
                  className="text-[13px] bg-black p-4 cursor-pointer text-white font-bold transform group-hover:translate-x-1 transition-transform"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
