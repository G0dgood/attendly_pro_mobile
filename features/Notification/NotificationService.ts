import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { BACKGROUND_NOTIFICATION_TASK } from '@/shared/baseUrl'; 
import { useCurrentDate } from '@/Context/DateProvider';



// Define the background task
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
  try {
			// Get the current date from AsyncStorage
			const { currentDate } = useCurrentDate();
    const currentDateString = await AsyncStorage.getItem('currentDate');
			// const currentDate = currentDateString ? new Date(currentDateString) : new Date();
			
   

    const clockInTime = await AsyncStorage.getItem('clockInTime');
    const clockOutTime = await AsyncStorage.getItem('clockOutTime');

    if (!clockInTime || !clockOutTime) {
      console.log('No clock-in or clock-out time set');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Check if it's time for clock-in or clock-out
    if (currentDate.getHours() === parseInt(clockInTime.split(':')[0]) &&
        currentDate.getMinutes() === parseInt(clockInTime.split(':')[1])) {
      await Notifications.scheduleNotificationAsync({
        content: { title: 'Clock-In Reminder', body: 'It’s time to clock in!' },
        trigger: { hour: parseInt(clockInTime.split(':')[0]), minute: parseInt(clockInTime.split(':')[1]), repeats: true },
      });
    }

    if (currentDate.getHours() === parseInt(clockOutTime.split(':')[0]) &&
        currentDate.getMinutes() === parseInt(clockOutTime.split(':')[1])) {
      await Notifications.scheduleNotificationAsync({
        content: { title: 'Clock-Out Reminder', body: 'It’s time to clock out!' },
        trigger: { hour: parseInt(clockOutTime.split(':')[0]), minute: parseInt(clockOutTime.split(':')[1]), repeats: true },
      });
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error in background task:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register the background task only once
const registerBackgroundTask = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
    if (isRegistered) {
      console.log('Background task is already registered');
      return;
    }

    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
      minimumInterval: 60, // Minimum interval in seconds
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log('Background task registered successfully:', status);
  } catch (err: any) {
    console.error('Failed to register background task:', err.message);
  }
};

export { registerBackgroundTask };