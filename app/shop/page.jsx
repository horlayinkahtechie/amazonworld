import React from "react";
import Shop from "./Shop";

export const metadata = {
  title: "Shop Fashion Wears | Amazon World Clothing Brand Lagos",
  description:
    "Shop premium men and women fashion wears from Amazon World. Discover trendy outfits, quality fabrics, and affordable clothing in Lagos, Nigeria.",
  keywords: [
    "Amazon World shop",
    "buy clothes online Lagos",
    "fashion shop Nigeria",
    "men fashion Lagos",
    "women clothing Nigeria",
    "Amazon World clothing brand",
  ],
  openGraph: {
    title: "Shop Fashion Wears | Amazon World",
    description:
      "Explore and shop premium fashion wears from Amazon World, a leading clothing brand in Lagos, Nigeria.",
    url: "https://amazonwrld.com/shop",
    siteName: "Amazon World",
    images: [
      {
        url: "https://amazonwrld.com/images/amzworld-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Amazon World Clothing Brand Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Fashion Wears | Amazon World",
    description:
      "Shop trendy men and women fashion wears from Amazon World, Lagos-based clothing brand.",
    images: ["https://amazonwrld.com/images/amzworld-logo.jpg"],
  },
  metadataBase: new URL("https://amazonwrld.com"),
};

export default function Page() {
  return (
    <div>
      <Shop />
    </div>
  );
}
