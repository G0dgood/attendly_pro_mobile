import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import profileService from './profileService';

// Define the types for the slice state
interface ProfileState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  data?: any;

  profileData?: any;
  profileIsError: boolean;
  profileIsSuccess: boolean;
  profileIsLoading: boolean;
  profileMessage: string;

  imageData?: any;
  imageIsError: boolean;
  imageIsSuccess: boolean;
  imageIsLoading: boolean;
  imageMessage: string;

  forgetData?: any;
  forgetIsError: boolean;
  forgetIsSuccess: boolean;
  forgetIsLoading: boolean;
  forgetMessage: string;
}

// Define the input type for the `changePassword` action
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Define the input type for the `forgetPassword` action
interface ForgetPasswordData {
  email: string;
}

// Define the type for the generic API response
interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

// Initial state with type
const initialState: ProfileState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  profileData: null,
  profileIsError: false,
  profileIsSuccess: false,
  profileIsLoading: false,
  profileMessage: '',

  imageData: null,
  imageIsError: false,
  imageIsSuccess: false,
  imageIsLoading: false,
  imageMessage: '',

  forgetData: null,
  forgetIsError: false,
  forgetIsSuccess: false,
  forgetIsLoading: false,
  forgetMessage: '',
};

// Async thunk for changing the password
export const changePassword = createAsyncThunk<
  ApiResponse<any>,
  ChangePasswordData,
  { rejectValue: string }
>('profile/changePassword', async (data, thunkAPI) => {
  try {
    return await profileService.changePassword(data);
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for getting the user profile
export const getUserProfile = createAsyncThunk<
  ApiResponse<any>,
  void,
  { rejectValue: string }
>('profile/getUserProfile', async (_, thunkAPI) => {
  try {
    return await profileService.getUserProfile();
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for uploading the profile image
export const profileImage = createAsyncThunk<
  ApiResponse<any>,
  FormData,
  { rejectValue: string }
>('profile/profileImage', async (formData, thunkAPI) => {
  try {
    return await profileService.profileImage(formData);
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for forget password 
export const forgetPassword = createAsyncThunk<
  ApiResponse<any>,
  ForgetPasswordData,
  { rejectValue: string }
>('profile/forgetPassword', async (data, thunkAPI) => {
  try {
    return await profileService.forgetPassword(data);
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create the slice
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';

      state.profileIsLoading = false;
      state.profileIsSuccess = false;
      state.profileIsError = false;
      state.profileMessage = '';

      state.imageIsLoading = false;
      state.imageIsSuccess = false;
      state.imageIsError = false;
      state.imageMessage = '';

      state.forgetIsLoading = false;
      state.forgetIsSuccess = false;
      state.forgetIsError = false;
      state.forgetMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action: PayloadAction<ApiResponse<any>>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'An error occurred';
      })

      .addCase(getUserProfile.pending, (state) => {
        state.profileIsLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<ApiResponse<any>>) => {
        state.profileIsLoading = false;
        state.profileIsSuccess = true;
        state.profileData = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.profileIsLoading = false;
        state.profileIsError = true;
        state.profileMessage = action.payload || 'An error occurred';
      })

      .addCase(profileImage.pending, (state) => {
        state.imageIsLoading = true;
      })
      .addCase(profileImage.fulfilled, (state, action: PayloadAction<ApiResponse<any>>) => {
        state.imageIsLoading = false;
        state.imageIsSuccess = true;
        state.imageData = action.payload.data;
      })
      .addCase(profileImage.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.imageIsLoading = false;
        state.imageIsError = true;
        state.imageMessage = action.payload || 'An error occurred';
      })

      .addCase(forgetPassword.pending, (state) => {
        state.forgetIsLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action: PayloadAction<ApiResponse<any>>) => {
        state.forgetIsLoading = false;
        state.forgetIsSuccess = true;
        state.forgetData = action.payload.data;
      })
      .addCase(forgetPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.forgetIsLoading = false;
        state.forgetIsError = true;
        state.forgetMessage = action.payload || 'An error occurred';
      });
  },
});

// Export the actions and reducer
export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
