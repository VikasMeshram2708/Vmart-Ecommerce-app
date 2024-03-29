'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RiEyeCloseFill } from 'react-icons/ri';
import { HiEye } from 'react-icons/hi2';

export default function Signup() {
  const [toggleEye, setToggleEye] = useState(false);

  return (
    <section className="min-h-screen bg-primary flex items-center textAqua justify-center">
      <div className="max-w-md w-full p-6 border-2 border-[--bbg] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold  mb-6 text-center">SignUp</h1>
        <form>
          <div className="mb-4">
            <label className="block  font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none input border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block  font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none input border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block  font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full input py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={toggleEye ? 'text' : 'password'}
              placeholder="Enter your password"
            />
            <div className="absolute right-0 bottom-3 pr-3 flex items-center">
              {toggleEye ? (
                <HiEye
                  onClick={() => setToggleEye((prev) => !prev)}
                  className=" cursor-pointer"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={() => setToggleEye((prev) => !prev)}
                  className=" cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="hover:bg-[--bbg] hover:text-black border-2 border-[--bbg] font-semibold py-2 px-4 rounded"
              type="submit"
            >
              Sign Up
            </button>
            <p className="">
              Already a User?{' '}
              <Link
                href="/login"
                className="hover:underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
