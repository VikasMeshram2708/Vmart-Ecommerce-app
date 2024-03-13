import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import ProductsProvider from './components/ProductsProvider';
import ProductState from './context/ProductState';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'vMart - Grab best deals',
  description: 'Ecommerce app grab the best deals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <ProductState>
          <Navbar />
          {children}
        </ProductState>
      </body>
    </html>
  );
}
