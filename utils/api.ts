import { baseUrl } from '@/shared/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 

export const loginUser = async (username: string, password: string) => { 
  try {
    const { data } = await axios.post(baseUrl+'/api/v1/users/login', {
              email: username,
              password:password,
            });

    const token = data?.data?.token;
    if (token) {
      await AsyncStorage.setItem('user-token', token);
    }

    return data;
  } catch (error: any) {  
  }
 
};

 