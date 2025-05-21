import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cookie from 'cookie';

const api = axios.create({
  baseURL: 'https://egf-logistics-admin-nine.vercel.app',
  headers: { 'Content-Type': 'application/json' },
});

export const loginUser = async (username: string, password: string) => {
  try {
    // Make the login request
    const { data, headers } = await api.post(
      '/api/auth/login',
      { username, password },
      {
        withCredentials: true, // Ensure cookies are sent and received
      }
    );

 

    // Extract cookies from the response headers
    const setCookieHeaders = headers['set-cookie'];
    

    if (setCookieHeaders) {
      // Parse cookies from the Set-Cookie header
      const parsedCookies = setCookieHeaders.map((cookieStr: string) => cookie.parse(cookieStr));
 // Extract the token
    const token = parsedCookies.find((cookieObj) => cookieObj.token)?.token;  
      if (token) {  
        // Save the token to AsyncStorage
        await AsyncStorage.setItem('user-token', token); 
      }  
    } 

    return data; // Return the response data
  } catch (error) { 
    throw error;
  }
};

 