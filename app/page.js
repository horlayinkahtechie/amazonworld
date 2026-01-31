import Carousel from './_components/Carousel';
import TopPicks from './_components/TopPicks';
import HeroBanner from './_components/HeroBanners';
import RecomendedProducts from './_components/RecomendedProducts';
import HeroSection from './_components/Hero';

export const metadata = {
  title: "Amazon World | Fashion & Clothing Brand in Lagos, Nigeria",
  description:
    "Amazon World is a Lagos-based clothing brand offering premium fashion wears for men and women. Shop trendy outfits, quality fabrics, and affordable styles online.",
  keywords: [
    "Amazon World",
    "Amazon World clothing",
    "clothing brand in Lagos",
    "fashion brand Nigeria",
    "buy clothes online Nigeria",
    "men and women fashion Lagos",
  ],
  openGraph: {
    title: "Amazon World | Fashion & Clothing Brand in Lagos",
    description:
      "Discover premium fashion wears from Amazon World, a top clothing brand in Lagos, Nigeria.",
    url: "https://amazonwrld.com",
    siteName: "Amazon World",
    images: [
      {
        url: "images/amzworld-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Amazon World Clothing Brand Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon World | Fashion & Clothing Brand in Lagos",
    description:
      "Shop premium fashion wears from Amazon World, Lagos-based clothing brand.",
    images: ["https://amazonwrld.com/images/amzworld-logo.jpg"],
  },
  metadataBase: new URL("https://amazonwrld.com"),
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Carousel />
      <HeroBanner />
      <TopPicks />
      <HeroSection/>
      <RecomendedProducts />
    </div>
  );
}
