import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';

interface CartState {
  products: Product[];
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart(state, action) {
      // state.push(action.payload);
      state.products.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action) {
      const removedProduct = state.products.find(
        (product) => product.id === action.payload
      );
      if (removedProduct) {
        state.totalPrice -= removedProduct.price;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = productsSlice.actions;

export const selectProduct = (state: RootState) => state.cart;

export default productsSlice.reducer;
