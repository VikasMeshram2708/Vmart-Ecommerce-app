import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import CartSlice from './CartSlice';
import ProductSlice from './ProductSlice';
import LoginSlice from './LoginSlice';

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: ProductSlice,
    login: LoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
