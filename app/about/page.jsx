import React from "react";
import About from "./About";

export const metadata = {
  title: "About Amazon World | Clothing Brand in Lagos, Nigeria",
  description:
    "Learn more about Amazon World, a Lagos-based clothing brand dedicated to delivering premium fashion wears for men and women across Nigeria.",
  keywords: [
    "About Amazon World",
    "Amazon World clothing brand",
    "fashion brand Lagos",
    "clothing brand Nigeria",
    "Amazon World story",
  ],
  openGraph: {
    title: "About Amazon World | Lagos Clothing Brand",
    description:
      "Amazon World is a premium clothing brand based in Lagos, Nigeria, offering stylish fashion wears for men and women.",
    url: "https://amazonwrld.com/about",
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
    title: "About Amazon World",
    description:
      "Discover the story behind Amazon World, a Lagos-based fashion brand.",
    images: ["https://amazonwrld.com/images/amzworld-logo.jpg"],
  },
  metadataBase: new URL("https://amazonwrld.com"),
};

export default function Page() {
  return (
    <div>
      <About />
    </div>
  );
}
