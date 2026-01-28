import Navbar from './_components/Navbar';
import Carousel from './_components/Carousel';
import TopPicks from './_components/TopPicks';
import HeroBanner from './_components/HeroBanners';
import RecomendedProducts from './_components/RecomendedProducts';

export default function Home() {
  return (
    <div className="min-h-screen">

      <Carousel />
      <HeroBanner/>
      <TopPicks/>
      <RecomendedProducts/>
      
    </div>
  );
}