import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
  token: string;
}

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('user-token');
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
    return null;
  }
};

export const getConfig = async (): Promise<{ headers: Record<string, string> }> => {
  const token = await getToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const userInfo = await AsyncStorage.getItem('eezypass-user-info');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  } catch (error) {
    console.error('Error fetching user info from AsyncStorage:', error);
    return null;
  }
};
