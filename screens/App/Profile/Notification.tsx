import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { colors } from '@/css/colorsIndex';
import { BlackX } from '@/assets/svg/BlackX';


// Notification Setup
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

// Function to schedule notifications
const schedulePushNotification = async (clockInTime: string, clockOutTime: string) => {
	const [clockInHour, clockInMinute] = clockInTime.split(':').map(Number);
	const [clockOutHour, clockOutMinute] = clockOutTime.split(':').map(Number);

	// Schedule Clock-in Notification
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Clock-In Reminder',
			body: `It’s time to clock in at ${clockInTime}`,
		},
		trigger: {
			hour: clockInHour,
			minute: clockInMinute,
			repeats: false,
		},
	});

	// Schedule Clock-out Notification
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Clock-Out Reminder',
			body: `It’s time to clock out at ${clockOutTime}`,
		},
		trigger: {
			hour: clockOutHour,
			minute: clockOutMinute,
			repeats: false,
		},
	});
};

const Notification = () => {
	const [isClockInTimeVisible, setIsClockInTimeVisible] = useState(false);
	const [isClockOutTimeVisible, setIsClockOutTimeVisible] = useState(false);
	const [clockInTime, setClockInTime] = useState('');
	const [clockOutTime, setClockOutTime] = useState('');
	const [modalVisible, setModalVisible] = useState(false);


	const handleClockInConfirm = (time: { toTimeString: () => string; }) => {
		setClockInTime(time.toTimeString().slice(0, 5));
		setIsClockInTimeVisible(false);
	};

	const handleClockOutConfirm = (time: { toTimeString: () => string; }) => {
		setClockOutTime(time.toTimeString().slice(0, 5));
		setIsClockOutTimeVisible(false);
	};

	const handleSave = async () => {
		if (clockInTime && clockOutTime) {
			await AsyncStorage.setItem('clockInTime', clockInTime);
			await AsyncStorage.setItem('clockOutTime', clockOutTime);
			await schedulePushNotification(clockInTime, clockOutTime);
			Alert.alert('Success', 'Notifications scheduled successfully.');
		} else {
			Alert.alert('Error', 'Please select both Clock-in and Clock-out times.');
		}
	};

	useEffect(() => {
		const fetchSavedTimes = async () => {
			try {
				const savedClockInTime = await AsyncStorage.getItem('clockInTime');
				const savedClockOutTime = await AsyncStorage.getItem('clockOutTime');
				if (savedClockInTime) setClockInTime(savedClockInTime);
				if (savedClockOutTime) setClockOutTime(savedClockOutTime);
			} catch (error) {
				console.error('Failed to fetch saved times:', error);
			}
		};

		fetchSavedTimes();
	}, []);

	useEffect(() => {
		const checkPermissions = async () => {
			if (Device.isDevice) {
				const { status } = await Notifications.requestPermissionsAsync();
				if (status !== 'granted') {
					Alert.alert('Permission Required', 'Enable notifications in settings.');
				}
			}
		};

		checkPermissions();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date().toTimeString().slice(0, 5);
			if (currentTime === clockInTime) {
				Notifications.scheduleNotificationAsync({
					content: { title: 'Clock-In Reminder', body: 'It’s time to clock in!' },
					trigger: null,
				});
			}
			if (currentTime === clockOutTime) {
				Notifications.scheduleNotificationAsync({
					content: { title: 'Clock-Out Reminder', body: 'It’s time to clock out!' },
					trigger: null,
				});
			}
		}, 1000); // Check every minute

		return () => clearInterval(interval);
	}, [clockInTime, clockOutTime]);


	return (
		<View >
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Text style={styles.reminderText}>Clock-In/ Clock-Out reminders</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					{/* Round exit button */}
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => {
							setModalVisible(false);
						}}
					>
						<BlackX />
					</TouchableOpacity>

					<View style={styles.timeSelection}>
						<View style={styles.clockintime_container}>
							{clockInTime && (
								<Text style={styles.savedTimeText}>
									Current Clock-In Time: {clockInTime}
								</Text>
							)}
							{clockOutTime && (
								<Text style={styles.savedTimeText}>
									Current Clock-Out Time: {clockOutTime}
								</Text>
							)}
						</View>

						<TouchableOpacity
							style={styles.button}
							onPress={() => setIsClockInTimeVisible(true)}
						>
							<Text style={styles.buttonText}>Select Clock-in Time</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => setIsClockOutTimeVisible(true)}
						>
							<Text style={styles.buttonText}>Select Clock-out Time</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
							<Text style={styles.saveButtonText}>Set Notifications</Text>
						</TouchableOpacity>
					</View>

				</View>
			</Modal>
		</View>
	);
};
export default Notification;


const styles = StyleSheet.create({
	clockintime_container: {
		marginBottom: 40,
	},
	reminderText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		color: colors.gray700,
	},

	savedTimeText: {
		fontSize: 16,
		color: colors.white,
		marginBottom: 12,
		textAlign: 'center',
	},

	timeSelection: {
		marginTop: 20,
		paddingHorizontal: 16,
		gap: 12,
		alignItems: 'center',
	},
	button: {
		backgroundColor: colors.accent_blue,
		paddingVertical: 12,
		paddingHorizontal: 20,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: '600',
	},
	saveButton: {
		backgroundColor: colors.green,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 20,
		width: '100%',
		alignItems: 'center',
	},
	saveButtonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: '700',
	},

	closeButton: {
		position: 'absolute',
		width: 32,
		height: 30,
		right: 20,
		top: 40,
		backgroundColor: colors.white,
		borderRadius: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},

	text_accent: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 12,
		lineHeight: 16,
		color: colors.accent_blue,
		alignItems: 'center',
		flexGrow: 0,
	},


	textContainer: {
		flexDirection: "row",
	},



	title: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 24,
		color: colors.gray800,
		textAlign: 'center',
	},


	modalOverlay: {
		flex: 1,
		backgroundColor: colors.Overlaybackground,
		justifyContent: 'center',
		paddingHorizontal: 32,
	},




});


