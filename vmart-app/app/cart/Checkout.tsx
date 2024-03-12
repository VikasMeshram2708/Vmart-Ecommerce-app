'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { GiSplitCross } from 'react-icons/gi';
import { ProductProvider } from '../context/ProductState';

type CheckoutProps = {
  products: number;
};

const Checkout = ({ products }: CheckoutProps) => {
  const { totalProducts } = ProductProvider();
  // console.log('mocked-total', totalProducts?.length)
  const grandTotal = totalProducts?.length;

  const [otp, setOtp] = useState('');
  const [currentOtp, setCurrentOtp] = useState<number | null>(null);
  const [toggleValidateForm, setToggleValidateForm] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [toggleCheckout, setToggleCheckout] = useState(products < 1);

  const handleValidate = () => {
    setToggleValidateForm((prev) => !prev);
    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log('OTP : ', OTP);
    setCurrentOtp(OTP);
  };

  const ConfirmValidateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp === currentOtp?.toString()) {
      alert('OTP Confirmed. Your order has been confirmed.');
      setOrderConfirm(true);
      setToggleValidateForm(false);
      setOtp('');
      setCurrentOtp(null);
    } else {
      alert('Invalid OTP entered.');
    }
  };

  return (
    <section className="textAqua">
      {/* <button
        onClick={() => {
          setToggleValidateForm((prev) => !prev);
        }}
        type="button"
        className="btn btn-error btn-outline"
      >
        Toggle
      </button> */}
      <center>
        {toggleValidateForm && (
          <div className="fixed bg-black w-full h-full top-0 z-40 flex justify-center items-center">
            <form
              onSubmit={ConfirmValidateForm}
              className="shadow-lg shadow-accent border-2 rounded max-w-sm mx-auto p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <GiSplitCross
                  onClick={() => setToggleValidateForm((prev) => !prev)}
                  size={25}
                  color="red"
                  className="cursor-pointer"
                />
              </div>
              <div className="grid gap-3">
                <input
                  type="text"
                  className="input flex-grow mr-2 w-full"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOtp(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="btn btn-outline btn-accent btn-md"
                >
                  Validate
                </button>
              </div>
            </form>
          </div>
        )}
      </center>
      <form
        action=""
        className="border-2 border-[--bbg] max-w-xl mx-auto rounded p-3"
      >
        <h1 className="text-center text-xl">Checkout</h1>
        {orderConfirm ? (
          <h1 className="text-center">
            Your Order has been <span className="font-bold">Confirmed.</span>
          </h1>
        ) : (
          <h1 className="text-center text-xl">Grand Total : {grandTotal}</h1>
        )}
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
            onClick={handleValidate}
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
