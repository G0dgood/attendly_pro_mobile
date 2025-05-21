import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/css/colorsIndex'
import Header from '@/components/Header'
import SwitchApp from '@/components/Switch';
import Notification from './Notification';


const NotificationsSettings = () => {


	return (
		<View style={styles.headerContainer}>
			<Header text={'Manage Notifications'} />
			<View style={styles.container}>
				<View style={styles.settingsContainer}>
					<View style={styles.text_container}>
						<Notification />
						<SwitchApp />
					</View>
					<View style={styles.text_container}>
						<Text style={styles.reminderText}>Login request updates</Text>
						<SwitchApp />
					</View>
				</View>
			</View>
		</View>
	)
}

export default NotificationsSettings

const styles = StyleSheet.create({

	headerContainer: {
		flex: 1,
		backgroundColor: colors.background,
	},

	text_container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},

	reminderText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		color: colors.gray700,
	},
	container: {
		flexGrow: 1,
		paddingTop: 20,
		marginHorizontal: 24,
	},
	settingsContainer: {
		width: "100%",
		backgroundColor: colors.white,
		borderRadius: 8,
		paddingVertical: 20,
		paddingLeft: 16,
		paddingRight: 10,
		gap: 22,
		flexDirection: 'column',
	},
})