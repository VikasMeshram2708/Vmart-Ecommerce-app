'use client';

import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import { RootState, useAppSelector } from '../store/Store';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const totalProducts = useSelector(
    (state: RootState) => state.products.length
  );
  console.log('total-products', totalProducts);

  return (
    <nav
      data-testid="navbar"
      className="navbar bg-primary textAqua sticky top-0 z-40"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/">Privacy</Link>
            </li>
            <li>
              <Link href="/">Terms</Link>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-xl"
          data-testid="companyName"
        >
          vMart
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
          <li>
            <Link href="/">Privacy</Link>
          </li>
          <li>
            <Link href="/">Terms</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <span><h1>{totalProducts}</h1></span>
        <div className="">
          <Link href="/cart">
            <FaCartShopping className="mr-5" color="#08eaca" size={35} />
          </Link>
        </div>
        <button
          type="button"
          className="text-[.95rem] rounded  py-[.3rem] px-4 border-2 border-[--bbg] hover:bg-[--bbg] hover:text-black font-semibold"
        >
          <Link href="/">Login</Link>
        </button>
      </div>
    </nav>
  );
}
