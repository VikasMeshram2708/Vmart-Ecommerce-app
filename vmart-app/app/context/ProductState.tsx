'use client';

import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import ProductContext from './ProductContext';

interface ProductChildrenProps {
  children: ReactNode;
}

const ProductState = ({ children }: ProductChildrenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<Product[]>([]);

  //   Create a function to fetch the products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      console.log('data', data?.products);
      setProducts(data?.products);
      return data;
    } catch (error) {
      return console.log('Something went wrong. Failed to fetch the products.');
    }
  };

  // Add to Cart Function
  const addToCart = useMemo(() => {
    const productAdder = (product: Product) => {
      console.log('product-added');
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, addToCart, totalProducts, removeProduct }}
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
