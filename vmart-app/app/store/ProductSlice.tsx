import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    removeProduct(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productsSlice.reducer;
