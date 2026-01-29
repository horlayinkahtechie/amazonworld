import React from "react";
import Collections from "./Collections";

export const metadata = {
  title: "Collections | Amazon World Clothing Brand Lagos",
  description:
    "Explore the latest fashion collections from Amazon World. Discover premium men and women clothing styles designed for modern fashion lovers in Lagos, Nigeria.",
  keywords: [
    "Amazon World collections",
    "fashion collections Lagos",
    "clothing collections Nigeria",
    "men and women fashion Lagos",
    "Amazon World new arrivals",
  ],
  openGraph: {
    title: "Fashion Collections | Amazon World",
    description:
      "Browse the latest fashion collections from Amazon World, a top clothing brand in Lagos, Nigeria.",
    url: "https://amazonwrld.com/collections",
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
    title: "Fashion Collections | Amazon World",
    description:
      "Discover premium fashion collections from Amazon World in Lagos.",
    images: ["https://amazonwrld.com/images/amzworld-logo.jpg"],
  },
  metadataBase: new URL("https://amazonwrld.com"),
};

export default function Page() {
  return (
    <div>
      <Collections />
    </div>
  );
}
