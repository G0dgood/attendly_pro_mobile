import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'; 
import { BACKGROUND_NOTIFICATION_TASK } from '@/shared/baseUrl';
import { useCurrentDate } from '@/Context/DateProvider';
 ;

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
	try {
			const { currentDate:currentTime } = useCurrentDate();
    // const currentTime = new Date().toTimeString().slice(0, 5); // Format: HH:mm
    const clockInTime = await AsyncStorage.getItem('clockInTime');
			const clockOutTime = await AsyncStorage.getItem('clockOutTime');
			
			console.log('parseInt(clockInTime.split)',  currentTime , clockInTime ,clockOutTime);


    if (!clockInTime || !clockOutTime) {
      console.log('No clock-in or clock-out time set');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

  		// Check if it's time for clock-in or clock-out
						if (currentTime.getHours() === parseInt(clockInTime.split(':')[0]) &&
										currentTime.getMinutes() === parseInt(clockInTime.split(':')[1])) {
								await Notifications.scheduleNotificationAsync({
										content: { title: 'Clock-In Reminder', body: 'It’s time to clock in!' },
										trigger: { hour: parseInt(clockInTime.split(':')[0]), minute: parseInt(clockInTime.split(':')[1]), repeats: true },
								});
						}
		
						if (currentTime.getHours() === parseInt(clockOutTime.split(':')[0]) &&
										currentTime.getMinutes() === parseInt(clockOutTime.split(':')[1])) {
								await Notifications.scheduleNotificationAsync({
										content: { title: 'Clock-Out Reminder', body: 'It’s time to clock out!' },
										trigger: { hour: parseInt(clockOutTime.split(':')[0]), minute: parseInt(clockOutTime.split(':')[1]), repeats: true },
								});
						}
		
const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
if (isRegistered) {
  console.log('Task is already registered');
} else {
  await registerBackgroundTask();
}
console.log('BackgroundFetch.BackgroundFetchResult.NewData',BackgroundFetch.BackgroundFetchResult.NewData)
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error in background task:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});


const registerBackgroundTask = async () => {
  try {
    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
      minimumInterval: 60, // Minimum interval in seconds
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log('Background task registered successfully:', status);
  } catch (err:any) {
    console.error('Failed to register background task:', err.message);
  }
};


export { registerBackgroundTask };

