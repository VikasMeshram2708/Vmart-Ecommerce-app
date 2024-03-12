'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store/Store';
import { useSelector } from 'react-redux';

type CheckoutProps = {
  products: number;
};

const Checkout = ({ products }: CheckoutProps) => {
  const grandTotal = useAppSelector((state) => state.cart.totalPrice);

  const [toggleCheckout, setToggleCheckout] = useState(products < 1);

  return (
    <section className="textAqua">
      <form
        action=""
        className="border-2 border-[--bbg] max-w-xl mx-auto rounded p-3"
      >
        <h1 className="text-center text-xl">Checkout</h1>
        <h1 className='text-center text-xl'>Grand Total : {grandTotal}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-center">
            {products < 1 ? (
              <>
                <p>
                  Add{' '}
                  <span>
                    <Link
                      href="/"
                      className="hover:border-b-2 border-whtie hover:italic"
                    >
                      products
                    </Link>
                  </span>{' '}
                  to your cart.
                </p>
              </>
            ) : (
              'Showing your products'
            )}
          </h1>
          <button
            disabled={toggleCheckout}
            type="button"
            className="btn btn-error text-white font-semibold btn-outline btn-md"
          >
            Checkout
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
