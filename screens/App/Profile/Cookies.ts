import { getToken } from "@/hooks/config";
import axios from "axios";

declare module 'react-native-cookies' {
  
  export interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
  }

  export default class Cookies {
    static setAsync(
      url: string,
      cookie: Cookie
    ): Promise<void>;
    static get(url: string): Promise<Record<string, Cookie>>;
    static clear(url: string): Promise<void>;
  }
}


 

export const api = axios.create({
  baseURL: 'https://egf-logistics-admin-nine.vercel.app',
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the token from AsyncStorage
 const token = await getToken();

      if (token) {
        // Attach the token to the Authorization header
        // config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
