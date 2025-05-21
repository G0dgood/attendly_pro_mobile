import AsyncStorage from '@react-native-async-storage/async-storage';

const saveNotificationTimes = async (clockInTime: string, clockOutTime: string) => {

  try {
    await AsyncStorage.setItem('clockInTime', clockInTime);
    await AsyncStorage.setItem('clockOutTime', clockOutTime);
  } catch (error) {
    console.error('Error saving notification times:', error);
  }
};

export { saveNotificationTimes };
