import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
  errors?: { message: string }[];
}

interface AuthState {
  user: any;
  userlogin: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userlogin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunk to authenticate user
export const authenticateUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(username, password); 
      await AsyncStorage.setItem('egf-user-info', JSON.stringify(response)); 
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const message = 
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        err.toString();
      return rejectWithValue(message);
    }
  }
);

// Thunk to initialize user from local storage
export const initializeUser = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = await AsyncStorage.getItem('egf-user-info');
      if (userInfo) {
        return JSON.parse(userInfo);
      }
      return null;
    } catch (error) {
       const err = error as AxiosError<ErrorResponse>;
       const message = 
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        err.toString();
      return rejectWithValue(message);
    }
  }
);

// Thunk to handle logout  

export const logoutUser:any = createAsyncThunk<null, void>('auth/logout', async () => {
  await AsyncStorage.removeItem('egf-user-info');
  return null;
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Authenticate User
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Initialize User
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.userlogin = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.userlogin = null;
        state.isAuthenticated = false;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.userlogin = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
