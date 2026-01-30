import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogoSnapchat, BiLogoTiktok } from "react-icons/bi";
import { InstagramIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F9F9F9] pt-16 pb-8 px-6 md:px-20 border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo Section */}

        <Image
          className="object-cover"
          src="/images/amzworld-logo.jpg"
          alt="Amz World Logo"
          width={100}
          height={100}
        />

        {/* Column 1: Shopping */}
        <div className="space-y-4">
          <h4 className="font-black text-black uppercase tracking-wider text-sm">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-500 text-sm font-medium">
            <li>
              <Link href="/shop" className="hover:text-black transition-colors">
                Buy Now
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-black transition-colors">
                All products
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-black transition-colors"
              >
                Collections
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Support */}
        <div className="space-y-4">
          <h4 className="font-black text-black uppercase tracking-wider text-sm">
            Support
          </h4>
          <ul className="space-y-3 text-gray-500 text-sm font-medium">
            <li>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-4">
          <h4 className="font-black text-black uppercase tracking-wider text-sm">
            Get in Touch
          </h4>
          <p className="text-gray-500 text-sm font-medium">
            Active 24/7, Year Round.
          </p>
          <a
            href="mailto:support@modernstreet.com"
            className="block text-gray-800 underline font-medium text-sm"
          >
            madubugochinonso2018@gmail.com
          </a>
          <div className="pt-2 flex gap-4">
            {/* Simple TikTok Icon Placeholder */}
            <Link
              href="https://tiktok.com/amazonwrld1"
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="text-white text-[18px]">
                <BiLogoTiktok />
              </span>
            </Link>
            <Link
              href="https://instagram.com/amz_wrld"
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="text-white text-[18px]">
                <InstagramIcon />
              </span>
            </Link>
            <Link
              href="https://snapchat.com/amzz.zz25"
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="text-white text-[18px]">
                <BiLogoSnapchat />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
        <p className="text-gray-400 text-xs">
          © 2026 Amazon World. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
