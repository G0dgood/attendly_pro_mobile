import { getConfig, getToken } from '@/hooks/config';
import { baseUrl } from '@/shared/baseUrl';
import axios, { AxiosRequestConfig } from 'axios';

// Define the type for the Email input data
interface EmailData {
  email: string; 
}

// Define the type for the changePassword input data
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Define the type for the response data
interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}


// Define the type for the user profile data
interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

// Change password
const changePassword = async (input: ChangePasswordData): Promise<ApiResponse<null>> => {
  const config: AxiosRequestConfig = await getConfig();    
  const response = await axios.put<ApiResponse<null>>(`${baseUrl}/api/auth/change-password`, input, config);
  return response.data;
};

// Get user profile
const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const config: AxiosRequestConfig = await getConfig();    
  const response = await axios.get<ApiResponse<UserProfile>>(`${baseUrl}/api/users/profile`, config);
  return response.data;
};

// Profile image upload 
const profileImage = async (formData: FormData): Promise<ApiResponse<null>> => { 
  const token = await getToken(); 
  const response = await axios.put<ApiResponse<null>>(
    `${baseUrl}/api/users/profile-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  return response.data;  
};
  
// Forget password
const forgetPassword = async (email: EmailData): Promise<ApiResponse<null>> => {
  const config: AxiosRequestConfig = await getConfig();
  const response = await axios.post<ApiResponse<null>>(`${baseUrl}/api/auth/forgot-password`, {"email":email}, config);
  return response.data;
};

export default { changePassword, getUserProfile, profileImage, forgetPassword };
