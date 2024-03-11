import ProductCards from './components/ProductCards';
import ProductsCarousel from './components/ProductsCarousel';

export default function Home() {
  // #171718
  return (
    <main className="min-h-screen w-full bg-primary">
      {/* Carousel */}
      <ProductsCarousel />

      {/* Product Carts */}
      <ProductCards />
    </main>
  );
}
