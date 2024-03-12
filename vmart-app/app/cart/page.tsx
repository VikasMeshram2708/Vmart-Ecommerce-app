'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import Image from 'next/image';
import { SyntheticEvent } from 'react';
import { removeFromCart } from '../store/CartSlice';
import Checkout from './Checkout';
import { ProductProvider } from '../context/ProductState';

export default function Cart() {
  const { totalProducts: products, removeProduct } = ProductProvider();
  return (
    <section className="bg-primary min-h-screen">
      {/* CheckOut Section */}
      <div>
        <Checkout products={products?.length} />
      </div>

      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="border-2 hover:scale-105 transition border-[--bbg] cursor-pointer shadow-md shadow-accent rounded-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={product?.thumbnail}
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
                  <p className="text-lg font-bold">
                    ${product?.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeProduct(product?.id)}
                    className="ml-2 btn btn-error btn-outline btn-sm"
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
