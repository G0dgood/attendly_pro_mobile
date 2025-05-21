import { getConfig } from '@/hooks/config';
import { baseUrl } from '@/shared/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
 
 
  
 
  // clock In and Out
const clockInOut = async () => {   
    const config = await getConfig();  
  const {data} = await axios.get(baseUrl +`/api/attendance/check-in-out`, config)  
   return data
};
 
 
// Login user 
const loginUser = async ( ) => { 
  const userInfo:any = await AsyncStorage.getItem('egf-user-info')   
  return JSON.parse(userInfo)
}

const clockInService = {clockInOut ,loginUser}

export default clockInService
