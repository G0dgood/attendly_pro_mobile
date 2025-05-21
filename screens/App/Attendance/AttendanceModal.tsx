import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '@/css/colorsIndex';
import { BlackX } from '@/assets/svg/BlackX';
import AttendanceCard from './AttendanceCard';

type AttendanceModalProps = {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	selectedDateDetails: string | any
	calenderisLoading: boolean
};

const AttendanceModal: React.FC<AttendanceModalProps> = ({ modalVisible, setModalVisible, selectedDateDetails, calenderisLoading }) => {



	return (
		<View>
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
					{/* Card */}
					{calenderisLoading}
					<AttendanceCard selectedDateDetails={selectedDateDetails} isLoading={calenderisLoading} topTime={true} />
				</View>
			</Modal>
		</View>
	);
};

export default AttendanceModal;

const styles = StyleSheet.create({
	text_accent_gray: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray400,
		display: 'flex',
		alignItems: 'center',
		flexGrow: 0,
	},

	text_accent_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
	},

	attachment_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
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

	textContainerPro: {
		gap: 5,
	},

	textContainerMain: {
		flexDirection: "column",
		justifyContent: "space-between",
		height: 125,
		marginTop: 20,
	},

	text_title: {
		width: 80,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		color: colors.gray400,
		alignItems: 'center',
	},

	textContainer: {
		flexDirection: "row",
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

	title_container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: colors.gray300,
		paddingBottom: 14,
	},

	rejectedText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 10,
		lineHeight: 14,
		color: colors.red,
	},

	RejectedContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 4,
		paddingHorizontal: 8,
		gap: 4,
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 4,
	},

	goText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		color: colors.accent_blue,
		textAlign: 'center',
	},

	go_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: colors.Overlaybackground,
		justifyContent: 'center',
		paddingHorizontal: 32,
	},

	card: {
		width: 364,
		height: 223,
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 20,
	},
});
