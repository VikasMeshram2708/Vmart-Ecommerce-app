import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface STATUS {
  IDLE: string;
  ERROR: string;
  LOADING: string;
}

type ProductInitialState = {
  data: Product[];
  status: 'idle' | 'loading' | 'error';
};

const initialState: ProductInitialState = {
  data: [],
  status: 'idle',
};
const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export default ProductSlice.reducer;

// Thunk
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
});
