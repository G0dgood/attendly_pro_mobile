import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { RightC } from '@/assets/svg/RightC';
import { LeftC } from '@/assets/svg/LeftC';
import { colors } from '@/css/colorsIndex';
import AttendanceModal from './AttendanceModal';
import { getCalender } from '@/features/Attendance/attendanceSlice';
import { useAppDispatch } from '@/hooks/hooks';

const screenWidth = Dimensions.get('window').width;
// Calculate dynamic gap
const dynamicGap = screenWidth > 400 ? 10 : 6;

// Props type for CalendarMonth
type CalendarMonthProps = {
	calenderisLoading: boolean
	calenderdata: string | any
	months: number
};



const CalendarMonth: React.FC<CalendarMonthProps> = ({ calenderdata, calenderisLoading, months }) => {
	const dispatch = useAppDispatch();
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDateDetails, setSelectedDateDetails] = useState<{
		day: number;
		status: string;
		date?: string;
		morningCheckIn?: string;
		morningCheckout?: string;
		afternoonCheckIn?: string;
		afternoonCheckout?: string;
	} | null>(null);

	const getDaysInMonth = (year: number, month: number): number =>
		new Date(year, month + 1, 0).getDate();

	const calendarSummary = calenderdata?.data?.attendanceSummary?.calendarSummary || [];

	useEffect(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // Convert 0-based to 1-based
		dispatch(getCalender(month));
	}, [currentDate, dispatch]);

	useEffect(() => {
		if (months) {
			setCurrentDate(new Date(currentDate.getFullYear(), months - 1, 1));
		}
	}, [months]);

	const handleNextMonth = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	};

	const handlePreviousMonth = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	};



	const handleDayClick = (day: number) => {
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const formattedDate = `${year}-${month}-${String(day).padStart(2, '0')}`;

		const selectedRecord = calendarSummary.find((record: any) =>
			new Date(record.date).toISOString().split('T')[0] === formattedDate
		);

		if (selectedRecord) {
			setSelectedDateDetails({
				day,
				status: selectedRecord.status || 'No records',
				date: formattedDate,
				morningCheckIn: selectedRecord.morningCheckIn,
				morningCheckout: selectedRecord.morningCheckout,
				afternoonCheckIn: selectedRecord.afternoonCheckIn,
				afternoonCheckout: selectedRecord.afternoonCheckout,
			});
		} else {
			setSelectedDateDetails({ day, status: 'No records', date: formattedDate });
		}

		setModalVisible(true);
	};




	const renderDays = (): JSX.Element[] => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = getDaysInMonth(year, month);

		// Determine today's date for comparison
		const today = new Date();
		const isToday = (day: number) =>
			day === today.getDate() &&
			month === today.getMonth() &&
			year === today.getFullYear();

		const weeks: JSX.Element[] = [];
		let dayCells: JSX.Element[] = Array.from(
			{ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 },
			(_, i) => <View key={`empty-${i}`} style={styles.container_text} />
		);

		for (let day = 1; day <= daysInMonth; day++) {
			const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			const selectedRecord = calendarSummary.find((record: { date: string | number | Date }) =>
				new Date(record.date).toISOString().split('T')[0] === dateKey
			);

			const status = selectedRecord ? selectedRecord.status : 'No records';
			const isAbsent = status === 'Absent';
			const isPresent = status === 'Present';
			const isLate = status === 'Late';
			const isOnLeave = status === 'On Leave';

			const isWeekend =
				new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;

			dayCells.push(
				<TouchableOpacity
					key={day}
					style={[
						styles.container_text,
						isToday(day) && styles.current_day, // Apply special styling for today's date
					]}
					onPress={() => handleDayClick(day)}
				>
					{isPresent && <View style={styles.present} />}
					{isLate && <View style={styles.late} />}
					{isAbsent && <View style={styles.absent} />}
					{isOnLeave && <View style={styles.isOnLeave} />}

					<Text
						style={[
							styles.text,
							isToday(day) ? styles.current_day_text : null, // Highlight today's date text
							isWeekend && !isToday(day) && styles.weekend_day,
						]}
					>
						{day}
					</Text>
				</TouchableOpacity>
			);

			if (dayCells.length === 7) {
				weeks.push(<View key={`week-${weeks.length}`} style={styles.week_row}>{dayCells}</View>);
				dayCells = [];
			}
		}

		if (dayCells.length > 0) {
			weeks.push(<View key={`week-${weeks.length}`} style={styles.week_row}>{dayCells}</View>);
		}

		return weeks;
	};


	return (
		<View>
			{calenderisLoading ? (
				<View style={[styles.card_container, styles.loaderContainer]}>
					<ActivityIndicator size="small" color={colors.gray400} />
				</View>
			) : (
				<View>
					<View style={styles.calendar_container_main}>
						<View style={styles.month_container}>
							<Text style={styles.month_text}>
								{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
							</Text>
							<View style={styles.calendar_right_and_left}>
								<TouchableOpacity onPress={handlePreviousMonth}><LeftC /></TouchableOpacity>
								<TouchableOpacity onPress={handleNextMonth}><RightC /></TouchableOpacity>
							</View>
						</View>
						<View style={styles.day_container}>
							{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
								<Text key={index} style={[styles.title, (index === 5 || index === 6) && styles.weekend]}>
									{day}
								</Text>
							))}
						</View>
						<View style={styles.day_container_date}>{renderDays()}</View>
					</View>
					<Text style={styles.records_text}>Choose a day to see your records</Text>
					<AttendanceModal
						calenderisLoading={calenderisLoading}
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						selectedDateDetails={selectedDateDetails}
					/>

				</View>
			)}
		</View>
	);
};


export default CalendarMonth;



const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	card_container: {
		height: 500,
	},
	weekend_day: {
		color: colors.red,
	},
	records_text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 20,
		color: colors.gray500,
		marginTop: 5,
	},

	day_container_date: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	week_row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: dynamicGap,
	},

	isOnLeave: {
		position: 'absolute',
		width: 4,
		height: 4,
		right: 3.71,
		top: 4,
		backgroundColor: colors.purple,
		borderRadius: 2,
		zIndex: 1,
	},
	absent: {
		position: 'absolute',
		width: 4,
		height: 4,
		right: 3.71,
		top: 4,
		backgroundColor: colors.red,
		borderRadius: 2,
		zIndex: 1,
	},
	late: {
		position: 'absolute',
		width: 4,
		height: 4,
		right: 3.71,
		top: 4,
		backgroundColor: colors.orange,
		borderRadius: 2,
		zIndex: 1,
	},
	present: {
		position: 'absolute',
		width: 4,
		height: 4,
		right: 3.71,
		top: 4,
		backgroundColor: colors.green,
		borderRadius: 2,
		zIndex: 1,
	},
	clockIn: {
		position: 'absolute',
		width: 4,
		height: 4,
		right: 3.71,
		top: 4,
		backgroundColor: colors.green,
		borderRadius: 2,
		zIndex: 1,
	},

	weekend: {
		color: colors.red
	},

	current_day_text: {
		color: colors.white,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
	},

	current_day: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		width: 40,
		height: 32,
		backgroundColor: colors.accent_blue,
		borderRadius: 8,
	},

	container_text: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 32,
		padding: 8,
	},
	text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 16,
		textAlign: 'center',
		color: colors.gray400,
	},
	title: {
		width: 40,
		height: 32,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 16,
		textAlign: 'center',
		color: colors.gray900,
	},
	day_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: "space-between"
	},
	month_text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray800,
	},

	month_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
		width: "100%"
	},

	calendar_right_and_left: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 40
	},
	calendar_container_main: {
		flexDirection: 'column',
		padding: 16,
		gap: 20,
		backgroundColor: colors.white,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: colors.gray300,
		width: "100%"
	},
});
