'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RiEyeCloseFill } from 'react-icons/ri';
import { HiEye } from 'react-icons/hi2';
// import { UserLogin } from '../store/LoginSlice';
// import { useAppDispatch, useAppSelector } from '../store/Store';
// import { UserLoginSchema } from '@/models/User';
// import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import { ProductProvider } from '../context/ProductState';

export default function Login() {
  const { makeLogin } = ProductProvider();

  const [toggleEye, setToggleEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };
    makeLogin(data);
    setEmail('');
    setPassword('');
    // router.push('/');
  };

  return (
    <section className="min-h-screen bg-primary flex items-center textAqua justify-center">
      <div className="max-w-md w-full p-6 border-2 border-[--bbg] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold  mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block  font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none input border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e?.target?.value)
              }
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
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e?.target?.value)
              }
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
              Login
            </button>
            <p className="">
              Not a User?{' '}
              <Link
                href="/signup"
                className="hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
