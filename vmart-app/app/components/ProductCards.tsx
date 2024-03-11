'use client';

import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/Store';
import { addToCart } from '../store/CartSlice';

export default function ProductCards() {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {products?.length ? (
            products?.map((product) => (
              <div
                key={product?.id}
                className="border-2 hover:scale-105 transition border-[--bbg] cursor-pointer shadow-md shadow-accent rounded-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={product?.image}
                    alt={product?.title}
                    fill
                    className="object-contain"
                    onError={(event: SyntheticEvent<HTMLImageElement>) => {
                      event.currentTarget.src = 'https://rb.gy/m3dzuz';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {product?.title}
                  </h3>
                  <p className="text-gray-200 capitalize line-clamp-2 text-sm mt-2">
                    {product?.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ${product?.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(addToCart(product));
                      }}
                      className="bgAqua text-black py-2 px-4 rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="loading loading-bars loading-lg"></span>
          )}
        </div>
      </div>
    </section>
  );
}
