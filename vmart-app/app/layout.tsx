import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import ProductsProvider from './components/ProductsProvider';

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
        <ProductsProvider>
          <Navbar />
          {children}
        </ProductsProvider>
      </body>
    </html>
  );
}
