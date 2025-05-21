import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DaysPresent } from '@/assets/svg/DaysPresent';
import { colors } from '@/css/colorsIndex';
import { DaysAbsent } from '@/assets/svg/DaysAbsent';
import { LateArrivals } from '@/assets/svg/LateArrivals';

// Define types for props
type SummaryProps = {
	summarydata?: any;
	summaryisLoading: boolean;
};

// Define the structure of the`data`array
type DataItem = {
	title: string;
	value: string;
	icon: React.ReactNode;
};

const Summary: React.FC<SummaryProps> = ({ summarydata, summaryisLoading }) => {
	// Transform summarydata into the data array format
	const data: DataItem[] = summarydata?.data?.attendanceSummary
		? [
			{
				title: 'Days present',
				value: `${summarydata?.data?.attendanceSummary?.presentCount || 0} Days`,
				icon: <DaysPresent />,
			},
			{
				title: 'Days absent',
				value: `${summarydata?.data?.attendanceSummary?.absentCount || 0} Days`,
				icon: <DaysAbsent />,
			},
			{
				title: 'Late arrivals',
				value: `${summarydata?.data?.attendanceSummary?.lateCount || 0} Days`,
				icon: <LateArrivals />,
			},
			{
				title: 'Early departures',
				value: `${summarydata?.data?.attendanceSummary?.earlyCount || 0} Days`,
				icon: <LateArrivals />,
			}
		]
		: [];

	return (
		<View style={styles.container}>
			{summaryisLoading ? (
				<View style={[styles.card_container, styles.loaderContainer]}>
					<ActivityIndicator size="small" color={colors.gray400} />
				</View>
			) : (
				data?.map((item, index) => (
					<View style={styles.card} key={index}>
						<View style={styles.card_title}>
							<Text style={styles.text}>{item.title}</Text>
							{item.icon}
						</View>
						<Text style={styles.days}>{item.value}</Text>
					</View>
				))
			)}
		</View>
	);
};

export default Summary;

const styles = StyleSheet.create({


	card_container: {
		height: 500,
	},
	loaderContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		flex: 1,
	},
	card: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 14,
		width: '48%',
		height: 94,
		backgroundColor: colors.white,
		borderRadius: 8,
		marginBottom: 14,
	},
	card_title: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 18,
		color: colors.gray400,
		alignSelf: 'center',
	},
	days: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.gray900,
	},
})
