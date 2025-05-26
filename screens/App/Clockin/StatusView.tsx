import { colors } from "@/css/colorsIndex";
import { View, Text, StyleSheet } from "react-native";

type Props = {
	entry: {
		clockIn?: string;
		clockOut?: string;
	};
};

const StatusView: React.FC<Props> = ({ entry }) => {
	return (
		<View style={styles.userStatus}>
			<View>
				<Text style={styles.userStatusText}>Status</Text>
			</View>
			{entry.clockIn && !entry.clockOut ? (
				<View style={styles.userStatus_text_in}>
					<Text style={styles.userStatus_in_text}>Clocked In</Text>
				</View>
			) : entry.clockIn && entry.clockOut ? (
				<View style={styles.userStatus_text_out}>
					<Text style={styles.userStatus_out_text}>Clocked Out</Text>
				</View>
			) : (
				<View style={styles.userStatus_text_none}>
					<Text style={styles.userStatus_none_text}>Not Clocked In</Text>
				</View>
			)}
		</View>
	);
};

export default StatusView;

const styles = StyleSheet.create({
	userStatusText: {
		width: 38,
		height: 18,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: colors.gray500,
	},
	userStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 3,
		gap: 8,
		// width: 148,
		height: 28,
		borderWidth: 1,
		borderColor: '#D0D5DD',
		borderRadius: 8,
	},

	userStatus_text_in: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
		paddingHorizontal: 10,
		width: 91,
		height: 22,
		backgroundColor: '#09C16929', // greenish background
		borderRadius: 5,
	},
	userStatus_in_text: {
		width: 71,
		height: 18,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: colors.green,
		textAlign: 'center',
	},
	userStatus_text_out: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
		paddingHorizontal: 10,
		width: 91,
		height: 22,
		backgroundColor: '#FF6B6B29', // reddish background for out
		borderRadius: 5,
	},
	userStatus_out_text: {
		width: 71,
		height: 18,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: colors.red,
		textAlign: 'center',
	},
	userStatus_text_none: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
		paddingHorizontal: 10,
		width: 110,
		height: 22,
		backgroundColor: '#CCCCCC29', // gray background
		borderRadius: 5,
	},
	userStatus_none_text: {
		width: 90,
		height: 18,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: colors.gray500,
		textAlign: 'center',
	},


})