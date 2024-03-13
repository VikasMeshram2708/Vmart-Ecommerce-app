'use client';

import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import { ProductProvider } from '../context/ProductState';
import nookies from 'nookies';

export default function Navbar() {
  const { totalProducts, isAuthenticated } = ProductProvider();
  // const totalProducts = useSelector(
  //   (state: RootState) => state?.cart?.products.length
  // );

  const handleLogout = async () => {
    try {
      nookies.destroy(null, 'vMartAuth');
      alert('User Logged Out.');
      await new Promise(() => {
        window.location.reload();
      });
    } catch (e) {
      const err = e as Error;
      console.log(`Something went wrong : ${err?.message}`);
    }
  };

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
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
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
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <span>
          <h1>{totalProducts?.length >= 1 && totalProducts?.length}</h1>
        </span>
        <div className="">
          <Link href="/cart">
            <FaCartShopping className="mr-5" color="#08eaca" size={35} />
          </Link>
        </div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            type="button"
            className="ml-3 btn btn-error btn-outline"
          >
            Logout
          </button>
        ) : (
          <button type="button" className="btn btn-accent">
            <Link href="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
