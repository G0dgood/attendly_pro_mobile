import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Close } from '@/assets/svg/Close'
import { colors } from '@/css/colorsIndex'
import { RootStackParamList } from '@/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import NotificationsModal from './NotificationsModal'
import { BlueRightAngle } from '@/assets/svg/BlueRightAngle'
import { useAppSelector } from '@/hooks/hooks'
import { generateNotifications } from '@/components/Options'

// Define type for the Notifications component props
type NotificationsProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Notifications'>;
};

const NotificationsCard: React.FC<NotificationsProps> = () => {
	const { calenderdata }: any = useAppSelector((state) => state.attendance);

	// Try different possible data paths
	const attendanceData = calenderdata?.data?.data?.data ||
		calenderdata?.data?.data ||
		calenderdata?.data ||
		calenderdata ||
		[];

	const [selectedNotification, setSelectedNotification] = useState(null);

	const openModal = (notification: any) => {
		setSelectedNotification(notification);
	};

	const closeModal = () => {
		setSelectedNotification(null);
	};



	const notifications = generateNotifications(attendanceData); // from previous logic

	return (
		<View style={styles.top_container}>
			{notifications && notifications.length > 0 ? (
				notifications.map((notification: any) => (
					<View key={notification.id} style={styles.card}>
						{notification.icon}
						<View style={styles.text_title_container}>
							<View>
								<View style={styles.title_container}>
									<Text style={styles.title}>{notification.title}</Text>
									<TouchableOpacity>
										<Close />
									</TouchableOpacity>
								</View>
								<Text style={styles.reminderText}>{notification.message}</Text>
							</View>
							<View style={styles.time_container}>
								<Text style={styles.dateText}>{notification.date}</Text>
								<TouchableOpacity style={styles.go_container} onPress={() => openModal(notification)}>
									<Text  >Go</Text>
									<BlueRightAngle />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				))
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No notifications available</Text>
					<Text style={styles.emptySubtext}>You're all caught up!</Text>
				</View>
			)}

			{/* Modal for notification details */}
			<NotificationsModal
				visible={!!selectedNotification}
				onClose={closeModal}
				notification={selectedNotification}
			/>
		</View>
	);
};

export default NotificationsCard

const styles = StyleSheet.create({


	go_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},


	dateText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		color: colors.gray400,
		textAlign: 'center',
	},
	time_container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

	},

	reminderText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		color: colors.gray600,
		marginTop: 16
	},


	text_title_container: {
		width: "100%",
		height: "100%",
		flexShrink: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},

	title_container: {
		flexDirection: 'row',
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: colors.gray300,
		paddingBottom: 8
	},
	title: {
		fontFamily: 'Inter',
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray800,
		textAlign: 'center',
	},
	card: {
		flexDirection: 'row',
		alignItems: "flex-start",
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 16,
		width: "100%",
		height: 147,
		backgroundColor: colors.white,
		borderRadius: 8,
	},

	top_container: {
		marginHorizontal: 20,
		marginTop: 16,
		gap: 16
	},

	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 60,
	},
	emptyText: {
		fontFamily: 'Inter',
		fontSize: 18,
		fontWeight: '600',
		color: colors.gray600,
		marginBottom: 8,
	},
	emptySubtext: {
		fontFamily: 'Inter',
		fontSize: 14,
		color: colors.gray400,
	},


})