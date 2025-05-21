import { getConfig } from '@/hooks/config';
import { baseUrl } from '@/shared/baseUrl';
import axios from 'axios';

// Define types for the responses
interface AttendanceInfo {
  morningCheckIn: string | null;
  morningCheckout: string | null;
  afternoonCheckIn: string | null;
  afternoonCheckout: string | null;
  [key: string]: any; // Add this to handle other possible properties in the response
}

interface CalendarData {
  date: string;
  isHoliday: boolean;
  events: string[];
  [key: string]: any;
}

interface AttendanceSummary {
  totalPresentDays: number;
  totalAbsentDays: number; 
  [key: string]: any;
}

// Attendance
const getLoggedInUserAttendance = async (): Promise<AttendanceInfo> => {
  const config = await getConfig();
  const { data } = await axios.get<AttendanceInfo>(`${baseUrl}/api/attendance/info`, config);
  return data;
};

// Get Calendar
const getCalender = async (months: number): Promise<CalendarData[]> => {  
  const config = await getConfig();
  const { data } = await axios.get<CalendarData[]>(`${baseUrl}/api/attendance/info/total/logged-in/${months}`, config);
  return data;
};

// Get Attendance Summary
const getAttendanceSummary = async (months: number): Promise<AttendanceSummary> => {
  const config = await getConfig();
  const { data } = await axios.get<AttendanceSummary>(`${baseUrl}/api/attendance/info/total/logged-in/${months}?summarize=true`, config);
  return data;
};

// Service
const attendanceService = {
  getLoggedInUserAttendance,
  getAttendanceSummary,
  getCalender,
};

export default attendanceService;
