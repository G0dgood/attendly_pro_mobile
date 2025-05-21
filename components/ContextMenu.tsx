import React, { useRef, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Animated,
	Easing,
	TouchableWithoutFeedback,
	Dimensions,
	ScrollView,
} from 'react-native';
import { Calender } from '@/assets/svg/Calender';
import { SmallDown } from '@/assets/svg/SmallDown';
import { colors } from '@/css/colorsIndex';
import { data } from './data';



const ContextMenu = ({ setMonth }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState({ title: data[0].title, number: data[0].number });
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
	const dropdownOpacity = useRef(new Animated.Value(0)).current;
	const buttonRef: any = useRef(null);

	const toggleDropdown = () => {
		if (isVisible) {
			// Close dropdown
			Animated.timing(dropdownOpacity, {
				toValue: 0,
				duration: 300,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}).start(() => setIsVisible(false));
		} else {
			// Open dropdown
			buttonRef.current?.measure((fx: any, fy: any, width: any, height: any, px: any, py: any) => {
				const screenWidth = Dimensions.get('window').width;
				setDropdownPosition({
					top: py + height,
					right: screenWidth - (px + width), // Calculate distance from the right edge
				});
				setIsVisible(true);
				Animated.timing(dropdownOpacity, {
					toValue: 1,
					duration: 300,
					easing: Easing.out(Easing.ease),
					useNativeDriver: true,
				}).start();
			});
		}
	};

	const handleSelect = (item: { title: string; number: number }) => {
		setSelectedItem(item); // Update the selected item
		setMonth({ title: item.title, number: item.number }); // Pass the title and number
		toggleDropdown();
	};


	return (
		<>
			{/* Trigger Button */}
			<TouchableOpacity
				style={styles.date_main_container}
				onPress={toggleDropdown}
				ref={buttonRef}
			>
				<View style={styles.date_main}>
					<View style={styles.calender_container}>
						<Calender />
						<Text style={styles.text}>
							{selectedItem?.title || 'This Month'}
						</Text>
					</View>
					<SmallDown />
				</View>
			</TouchableOpacity>

			{/* Dropdown Modal */}
			{isVisible && (
				<Modal visible transparent animationType="none">
					<TouchableWithoutFeedback onPress={toggleDropdown}>
						<View style={styles.modalOverlay} />
					</TouchableWithoutFeedback>
					<Animated.View
						style={[
							styles.dropdownMenuStyle,
							{
								opacity: dropdownOpacity,
								top: dropdownPosition.top,
								right: dropdownPosition.right,
							},
						]}
					>
						<ScrollView style={styles.scrollableContainer}>
							{data.map((item, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.dropdownItemStyle,
										selectedItem.title === item.title && styles.selectedDropdownItemStyle,
									]}
									onPress={() => handleSelect(item)}
								>
									<Text
										style={[
											styles.dropdownItemTxtStyle,
											selectedItem.title === item.title && styles.selectedDropdownItemTxtStyle,
										]}
									>
										{item.title}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</Animated.View>
				</Modal>
			)}
		</>
	);
};

export default ContextMenu;

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		color: colors.gray800,
	},
	calender_container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	date_main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 6,
		paddingHorizontal: 12,
		width: 155,
		height: 28,
		backgroundColor: colors.gray25,
		borderWidth: 1,
		borderColor: colors.gray300,
		borderRadius: 5,
	},
	date_main_container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '100%',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.273)',
	},
	dropdownMenuStyle: {
		position: 'absolute',
		width: 170,
		backgroundColor: colors.white,
		borderRadius: 5,
		shadowColor: '#000000c2',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	scrollableContainer: {
		maxHeight: 200,
	},
	dropdownItemStyle: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: colors.gray300,
		borderRadius: 5,
	},
	dropdownItemTxtStyle: {
		fontSize: 13,
		color: colors.gray800,
	},
	selectedDropdownItemStyle: {
		backgroundColor: colors.gray200,
	},
	selectedDropdownItemTxtStyle: {
		color: colors.gray800,
		fontWeight: '600',
	},
});
