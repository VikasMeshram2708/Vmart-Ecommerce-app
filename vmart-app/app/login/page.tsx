'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RiEyeCloseFill } from 'react-icons/ri';
import { HiEye } from 'react-icons/hi2';
import { UserLoginSchema } from '@/models/User';

export default function Login() {
  const [toggleEye, setToggleEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      // sanitize the incoming data
      UserLoginSchema.parse({ email, password });
      if (!response.ok) {
        return alert(result?.message);
      }

      console.log('result', result);
      return alert(result?.message);
    } catch (e) {
      const err = e as Error;
      console.log('Something went wrong.', err?.message);
    }
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
