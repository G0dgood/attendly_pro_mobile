import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Close } from '@/assets/svg/Close'
import { BlueClock } from '@/assets/svg/BlueClock'
import { BlueTicket } from '@/assets/svg/BlueTicket'
import { colors } from '@/css/colorsIndex'
import { RootStackParamList } from '@/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import NotificationsModal from './NotificationsModal'

// Define type for the Notifications component props
type NotificationsProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Notifications'>;
};

const NotificationsCard: React.FC<NotificationsProps> = () => {
	const notifications = [
		{
			id: 1,
			icon: <BlueClock />,
			title: "Clock In reminder",
			message: "Remember to clock In after your lunch break at your workplace, try not to be late.",
			date: "23/10/24"
		},
		{
			id: 2,
			icon: <BlueClock />,
			title: "Clock In reminder",
			message: "Lunch time is here, remember to clock out.",
			date: "23/10/24"
		},
		{
			id: 3,
			icon: <BlueTicket />,
			title: "Login alert",
			message: "Review for your login request applied on 12/10/24 has arrived.",
			date: "23/10/24"
		}
	];

	return (
		<View style={styles.top_container}>
			{notifications.map((notification) => (
				<View key={notification.id} style={styles.card}>
					{notification.icon}
					<View style={styles.text_title_container}>
						<View>
							<View style={styles.title_container}>
								<Text style={styles.title}>{notification.title}</Text>
								<TouchableOpacity  >
									<Close />
								</TouchableOpacity>
							</View>
							<Text style={styles.reminderText}>{notification.message}</Text>
						</View>
						<View style={styles.time_container}>
							<View>
								<Text style={styles.dateText}>{notification.date}</Text>
							</View>
							{/* NotificationsModal */}
							<NotificationsModal />
						</View>
					</View>
				</View>
			))}
		</View>
	)
}

export default NotificationsCard

const styles = StyleSheet.create({


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


})