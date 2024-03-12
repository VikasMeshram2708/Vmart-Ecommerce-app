import { createContext } from 'react';

interface ProductDataProps {
  products: Product[];
  addToCart: (product: Product) => void;
  totalProducts: Product[];
  removeProduct: (productId: number) => void
}
const ProductContext = createContext<ProductDataProps | null>(null);
export default ProductContext;
