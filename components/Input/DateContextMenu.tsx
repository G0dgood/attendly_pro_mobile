import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Animated,
	RefreshControl,
	TouchableWithoutFeedback,
} from 'react-native';



const DateContextMenu = () => {
	const [date, setDate] = useState(new Date());
	const [isCalendarVisible, setIsCalendarVisible] = useState(false);
	const [calendarHeight] = useState(new Animated.Value(0));
	const [refreshing, setRefreshing] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

	const toggleCalendar = () => {
		setIsCalendarVisible((prev) => !prev);
		Animated.timing(calendarHeight, {
			toValue: isCalendarVisible ? 0 : 200,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
	};

	const handleMenuPress = (action: string) => {
		if (action === 'Show Date Picker') {
			setDate(new Date()); // Update date when selected
		} else if (action === 'Toggle Calendar') {
			toggleCalendar();
		}
		setIsMenuVisible(false); // Close menu after selection
	};

	const showMenu = (event: any) => {
		const { locationX, locationY } = event.nativeEvent;
		setMenuPosition({ x: locationX, y: locationY });
		setIsMenuVisible(true);
	};

	const hideMenu = () => setIsMenuVisible(false);

	return (
		<View style={styles.container}>
			<View style={styles.top_container}>
				<View style={styles.top_container_top}>
					{/* Context Menu Simulation */}
					<TouchableOpacity
						onLongPress={showMenu}
						style={styles.date_main_container}>
						<View style={styles.date_main}>
							<View style={styles.calender_container}>
								<Text style={styles.text}>This Month</Text>
							</View>
						</View>
					</TouchableOpacity>

					{/* Animated Calendar */}
					<Animated.View style={[styles.calendarWrapper, { height: calendarHeight }]}>
						{isCalendarVisible && <Text>Calendar Component</Text>}
					</Animated.View>
				</View>

				{/* DateTime Picker */}


			</View>


			{/* Context Menu View */}
			{isMenuVisible && menuPosition && (
				<View
					style={[
						styles.menuContainer,
						{
							top: menuPosition?.y,
							left: menuPosition?.x,
						},
					]}>
					<TouchableOpacity onPress={() => handleMenuPress('Show Date Picker')} style={styles.menuItem}>
						<Text style={styles.menuItemText}>Show Date Picker</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleMenuPress('Toggle Calendar')} style={styles.menuItem}>
						<Text style={styles.menuItemText}>Toggle Calendar</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default DateContextMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f8f8',
		padding: 16,
	},
	top_container: {
		marginVertical: 16,
	},
	top_container_top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	date_main_container: {
		padding: 12,
		backgroundColor: '#ffffff',
		borderRadius: 8,
		elevation: 2,
	},
	date_main: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	calender_container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		marginLeft: 8,
	},
	calendarWrapper: {
		overflow: 'hidden',
	},
	contentWrapper: {
		marginTop: 16,
	},
	menuContainer: {
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 8,
		elevation: 5,
		zIndex: 100,
		padding: 10,
		width: 200,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	menuItem: {
		padding: 10,
	},
	menuItemText: {
		fontSize: 16,
		color: '#000',
	},
});
