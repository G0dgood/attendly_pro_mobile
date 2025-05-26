import { colors } from '@/css/colorsIndex';
import React, { ReactNode } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

type DaysCardProps = {
	icon: ReactNode;
	toptext: string;
	text: string;
	loading: boolean;
};

const DaysCard: React.FC<DaysCardProps> = ({ icon, toptext, text, loading }) => {
	return (
		<View style={styles.card}>
			<View style={styles.card_icon_text}>
				<Text style={styles.workedHours}>{toptext}</Text>
				{icon}
			</View>
			{loading ? <ActivityIndicator size="small" color={colors.gray400} /> : <Text style={styles.daysText}>{text}</Text>}
		</View>
	);
};

export default DaysCard;

const styles = StyleSheet.create({

	daysText: {
		height: 24,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.gray900,
	},
	workedHours: {
		height: 18,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: '#98A2B3',
	},
	card_icon_text: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},

	card: {
		width: "48%",
		height: 94,
		paddingVertical: 12,
		paddingHorizontal: 14,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 24,
		backgroundColor: colors.white,
		borderRadius: 8,
	},
});


