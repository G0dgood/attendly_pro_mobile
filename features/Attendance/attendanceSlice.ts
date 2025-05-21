import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import attendanceService from './attendanceService';

// Define the structure of the state
interface AttendanceState {
  data: AttendanceInfo | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;

  calenderdata: CalendarData[] | null;
  calenderisError: boolean;
  calenderisSuccess: boolean;
  calenderisLoading: boolean;
  calendermessage: string;

  summarydata: AttendanceSummary | null;
  summaryisError: boolean;
  summaryisSuccess: boolean;
  summaryisLoading: boolean;
  summarymessage: string;
}

// Define the initial state
const initialState: AttendanceState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  calenderdata: null,
  calenderisError: false,
  calenderisSuccess: false,
  calenderisLoading: false,
  calendermessage: '',

  summarydata: null,
  summaryisError: false,
  summaryisSuccess: false,
  summaryisLoading: false,
  summarymessage: '',
};

// Thunk to get logged-in user attendance
export const getLoggedInUserAttendance = createAsyncThunk<
  AttendanceInfo,
  void,
  { rejectValue: string }
>('clock/getLoggedInUserAttendance', async (_, thunkAPI) => {
  try {
    return await attendanceService.getLoggedInUserAttendance();
  } catch (error: any) {
    const message =
      (error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        error.toString()) as string;
    return thunkAPI.rejectWithValue(message);
  }
});

// Thunk to get calendar data
export const getCalender:any = createAsyncThunk<
  CalendarData[],
  number,
  { rejectValue: string }
>('clock/getCalender', async (day, thunkAPI) => {
  try {
    return await attendanceService.getCalender(day);
  } catch (error: any) {
    const message =
      (error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        error.toString()) as string;
    return thunkAPI.rejectWithValue(message);
  }
});

// Thunk to get attendance summary
export const getAttendanceSummary:any = createAsyncThunk<
  AttendanceSummary,
  number,
  { rejectValue: string }
>('clock/getAttendanceSummary', async (months, thunkAPI) => {
  try {
    return await attendanceService.getAttendanceSummary(months);
  } catch (error: any) {
    const message =
      (error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        error.toString()) as string;
    return thunkAPI.rejectWithValue(message);
  }
});

// Attendance slice
export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';

      state.calenderisLoading = false;
      state.calenderisSuccess = false;
      state.calenderisError = false;
      state.calendermessage = '';

      state.summaryisLoading = false;
      state.summaryisSuccess = false;
      state.summaryisError = false;
      state.summarymessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Attendance
      .addCase(getLoggedInUserAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUserAttendance.fulfilled, (state, action: PayloadAction<AttendanceInfo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getLoggedInUserAttendance.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || '';
        state.data = null;
      })

      // Calendar
      .addCase(getCalender.pending, (state) => {
        state.calenderisLoading = true;
      })
      .addCase(getCalender.fulfilled, (state, action: PayloadAction<CalendarData[]>) => {
        state.calenderisLoading = false;
        state.calenderisSuccess = true;
        state.calenderdata = action.payload;
      })
      .addCase(getCalender.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.calenderisLoading = false;
        state.calenderisError = true;
        state.calendermessage = action.payload || '';
        state.calenderdata = null;
      })

      // Summary
      .addCase(getAttendanceSummary.pending, (state) => {
        state.summaryisLoading = true;
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action: PayloadAction<AttendanceSummary>) => {
        state.summaryisLoading = false;
        state.summaryisSuccess = true;
        state.summarydata = action.payload;
      })
      .addCase(getAttendanceSummary.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.summaryisLoading = false;
        state.summaryisError = true;
        state.summarymessage = action.payload || '';
        state.summarydata = null;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;

// Define response types
interface AttendanceInfo {
  morningCheckIn: string | null;
  morningCheckout: string | null;
  afternoonCheckIn: string | null;
  afternoonCheckout: string | null;
  [key: string]: any; // To handle additional properties
}

interface CalendarData {
  date: string;
  isHoliday: boolean;
  events: string[];
  [key: string]: any; // To handle additional properties
}

interface AttendanceSummary {
  totalPresentDays: number;
  totalAbsentDays: number; 
  [key: string]: any; // To handle additional properties
}
