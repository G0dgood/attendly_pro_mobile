import { getConfig } from '@/hooks/config';
import { baseUrl } from '@/shared/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
 
  
interface ChangePasswordInput {
  input: Record<string, any>;  
}

const changePassword = async ({ input }: ChangePasswordInput) => {   
    const config = await getConfig();  
  const { data } = await axios.patch(`${baseUrl}/api/v1/users/update-password`,
    input, config);  
    return data;
};
 
 
// Login user 
const loginUser = async ( ) => { 
  const userInfo:any = await AsyncStorage.getItem('attendly-user-info')   
  return JSON.parse(userInfo)
}

const clockInService = {changePassword ,loginUser}

export default clockInService
