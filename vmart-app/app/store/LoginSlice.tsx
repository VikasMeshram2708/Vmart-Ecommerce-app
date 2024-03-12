import { UserLoginSchema } from '@/models/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserData {
  email: string;
  password: string;
}

interface LoginState {
  data: {
    email: string;
    password: string;
  };
  status: 'idle' | 'loading' | 'error';
}

const initialState: LoginState = {
  data: {
    email: '',
    password: '',
  },
  status: 'idle',
};

const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export default LoginSlice.reducer;

export const UserLogin = createAsyncThunk(
  'users/login',
  async (data: UserData) => {
    // Sanitize the incoming data
    UserLoginSchema.parse(data);
    const response = await fetch('/api/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return alert(result?.message);
    }
    alert(result?.message);
    return result;
  }
);
