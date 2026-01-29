import React from "react";
import Contact from "./Contact";

export const metadata = {
  title: "Contact Amazon World | Clothing Brand in Lagos, Nigeria",
  description:
    "Get in touch with Amazon World Clothing Brand in Lagos. Contact us for inquiries, orders, partnerships, or customer support.",
  keywords: [
    "Contact Amazon World",
    "Amazon World Lagos",
    "clothing brand contact Nigeria",
    "fashion brand Lagos contact",
    "Amazon World customer support",
  ],
  openGraph: {
    title: "Contact Amazon World | Lagos Clothing Brand",
    description:
      "Contact Amazon World for fashion inquiries, orders, and customer support in Lagos, Nigeria.",
    url: "https://amazonwrld.com/contact",
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
    title: "Contact Amazon World",
    description:
      "Reach out to Amazon World Clothing Brand in Lagos for inquiries and support.",
    images: ["https://amazonwrld.com/images/amzworld-logo.jpg"],
  },
  metadataBase: new URL("https://amazonwrld.com"),
};

export default function Page() {
  return (
    <div>
      <Contact />
    </div>
  );
}
