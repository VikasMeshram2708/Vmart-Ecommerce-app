'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import banner from '@/public/banner.jpg';
import banner2 from '@/public/banner2.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ProductsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const products = [
    {
      id: 1,
      url: banner,
    },
    {
      id: 2,
      url: banner2,
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <Slider {...settings}>
          {products?.map((product) => (
            <div key={product.id} className="w-full relative overflow-hidden">
              <div className="relative h-80 m-3 shadow-accent shadow-md border-2 border-accent rounded-md">
                <Image src={product.url} alt="banner" fill />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
