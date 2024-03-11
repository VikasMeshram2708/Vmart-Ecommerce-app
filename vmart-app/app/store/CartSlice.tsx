import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = productsSlice.actions;

export const selectProduct = (state: RootState) => state.cart;

export default productsSlice.reducer;
