import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/css/colorsIndex';
import { BlueRightAngle } from '@/assets/svg/BlueRightAngle';
import { BlackX } from '@/assets/svg/BlackX';
import Card from './Card';


const NotificationsModal = () => {
	const [modalVisible, setModalVisible] = useState(false);

	// Function to handle "Go" button click
	const handleGoClick = () => {
		setModalVisible(true);
	};
	return (
		<View>
			<TouchableOpacity style={styles.go_container} onPress={handleGoClick}>
				<Text style={styles.goText}>Go</Text>
				<BlueRightAngle />
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
						onPress={() => { setModalVisible(false) }}
					>
						<BlackX />
					</TouchableOpacity>
					{/* Card */}
					<Card />
				</View>
			</Modal>
		</View>
	)
}

export default NotificationsModal

const styles = StyleSheet.create({

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
		flexDirection: "row"
	},
	text: {
		width: 252,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		color: colors.gray600,
		alignItems: 'center',
		flexGrow: 1,
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


	goText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 16,
		color: colors.accent_blue,
		textAlign: 'center',
	},
	go_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: colors.Overlaybackground,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: 364,
		height: 223,
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 20,
	},

})