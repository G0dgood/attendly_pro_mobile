import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Attachment } from '@/assets/svg/Attachment'
import { XRed } from '@/assets/svg/XRed'
import { colors } from '@/css/colorsIndex'

const Card = () => {
	return (
		<View style={styles.card}>
			<View>
				<View style={styles.title_container}>
					<Text style={styles.title}>Vacation</Text>
					<TouchableOpacity style={styles.RejectedContainer}>
						<Text style={styles.rejectedText}>Rejected</Text>
						<XRed />
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.textContainerMain}>
				<View style={styles.textContainer}>
					<Text style={styles.text_title}>Reason:</Text>
					<Text style={styles.text}>Application to be absent for work for 4 days due to a recent illness. Please find my doctors report attached below
					</Text>
				</View>

				<View style={styles.textContainerPro}>
					<View style={styles.textContainer}>
						<Text style={styles.text_title}>Duration:</Text>
						<Text style={styles.text_accent}>4 days</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.text_title}>Start/End:</Text>

						<View style={styles.text_accent_container}>
							<Text style={styles.text_accent}>12/2/24</Text>
							<Text style={styles.text_accent_gray}>to</Text>
							<Text style={styles.text_accent}>16/2/24</Text>
						</View>

					</View>
					<View style={styles.textContainer}>
						<Text style={styles.text_title}>Attachments</Text>
						<View style={styles.attachment_container} >
							<Attachment />
							<Text style={styles.text_accent}>1 Attachment</Text>
						</View>
					</View>
				</View>
			</View>

		</View>
	)
}

export default Card

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
		gap: 3
	},

	attachment_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
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
		marginTop: 20
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
		flexDirection: "row"
	},
	text: {
		width: 245,
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
		paddingBottom: 14
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

	card: {
		width: "92%",
		height: 223,
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 20,
	},

})