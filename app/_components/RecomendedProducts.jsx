"use client";

import { useRouter } from "next/navigation";
import productsData from "../data/Products";
import Link from "next/link";

export default function ShopPage() {
  const router = useRouter();

  const getRandomProducts = (productsArray, count = 4) => {
    const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get random products (adjust the count as needed)
  const randomProducts = getRandomProducts(productsData, 4);

  const handleProductClick = (productId) => {
    router.push(`/shop/${productId}`);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      {/* Page Title Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 pb-5">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Shop Products</h1>
            <p className="text-gray-500">
              Discover our randomly selected collection. Refresh for new picks!
            </p>
          </div>
          <Link
            href="/products"
            className="group flex lg:justify-end justify-start items-center text-[14px] font-bold tracking-[0.2em] text-[#C5A25D] uppercase transition-hover"
          >
            View All
            <span className="ml-2 text-lg transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="border border-gray-200 p-6 flex flex-col group cursor-pointer relative rounded-lg hover:shadow-xl transition-shadow duration-300 hover:border-gray-300"
            >
              {/* Image Container */}
              <div className="flex-grow flex items-center justify-center p-4 min-h-[300px] bg-gray-50 rounded-lg">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-w-full max-h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info Section */}
              <div className="mt-6 space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {product.category}
                </p>
                <h3 className="text-md font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-lg font-black pt-2">
                  ₦ {product.price.toLocaleString()}
                </p>
              </div>

              {/* Out of Stock Label */}
              {!product.in_stock && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-lg uppercase shadow-md">
                  Out of Stock
                </div>
              )}

              {/* Quick View Button */}
              <button className="mt-4 cursor-pointer w-full bg-gray-900 text-white py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
