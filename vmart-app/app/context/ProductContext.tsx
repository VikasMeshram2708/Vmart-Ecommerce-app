import { createContext } from 'react';

export interface Login {
  email: String;
  password: String;
}
interface ProductDataProps {
  products: Product[];
  addToCart: (product: Product) => void;
  totalProducts: Product[];
  removeProduct: (productId: number) => void;
  makeLogin: (data: Login) => Promise<void>;
  isAuthenticated: boolean
}
const ProductContext = createContext<ProductDataProps | null>(null);
export default ProductContext;
