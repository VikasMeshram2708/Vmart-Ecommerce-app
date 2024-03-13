'use client';

import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import ProductContext, { Login } from './ProductContext';
import { UserLoginSchema } from '@/models/User';
import { ZodError } from 'zod';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';

interface ProductChildrenProps {
  children: ReactNode;
}

const ProductState = ({ children }: ProductChildrenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   Create a function to fetch the products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      // console.log('data', data?.products);
      setProducts(data?.products);
      return data;
    } catch (error) {
      return console.log('Something went wrong. Failed to fetch the products.');
    }
  };

  // Add to Cart Function
  const addToCart = useMemo(() => {
    const productAdder = (product: Product) => {
      // console.log('product-added');
      setTotalProducts((prev) => [...prev, product]);
    };
    return productAdder;
  }, []);

  // Remove Product Function
  const removeProduct = (productId: number) => {
    const filteredProducts = totalProducts.filter(
      (product) => product?.id !== productId
    );
    setTotalProducts(filteredProducts);
  };


  // Login Function
  const makeLogin = async (data: Login) => {
    try {
      // Sanitize the incoming data
      UserLoginSchema.parse(data);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result?.message);
      }
      nookies.set(null, 'vMartAuth', JSON.stringify(result?.user), {
        maxAge: 60 * 60,
      });
      setIsAuthenticated(true);
      console.log('result', result?.user);
      return alert(result?.message);
    } catch (e) {
      const err = e as Error;
      if (e instanceof ZodError) {
        return alert(e?.errors[0]?.message);
      }
      return alert(err?.message);
    }
  };

  useEffect(() => {
    const cookieValue = nookies.get(null, 'vMartAuth');
    if (cookieValue?.vMartAuth) {
      return setIsAuthenticated(true);
    }
    return;
  }, [makeLogin, fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addToCart,
        totalProducts,
        removeProduct,
        makeLogin,
        isAuthenticated,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;

export const ProductProvider = () => {
  const UseProductsProvier = useContext(ProductContext);

  if (!UseProductsProvier) {
    throw new Error('ProductState must be wrapped in ProductProvider.');
  }

  return UseProductsProvier;
};
