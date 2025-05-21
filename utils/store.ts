import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/slices/authSlice'; 
import profileSlice from '@/features/Profile/profileSlice';
import attendanceSlice from '@/features/Attendance/attendanceSlice';
import clockInSlice from '@/features/clockInandOut/clockInSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    profile: profileSlice, 
    attendance: attendanceSlice, 
    clock: clockInSlice,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
