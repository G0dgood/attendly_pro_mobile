import { colors } from '@/css/colorsIndex';
import React, { useState, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

// Define type for the TabToggle component props
type AttendanceProps = {
	activeIndex: number;
	setActiveIndex: (index: number) => void;
};

const TabToggle: React.FC<AttendanceProps> = ({ activeIndex, setActiveIndex }) => {
	// Animated value for the slider
	const sliderX = useRef(new Animated.Value(0)).current;

	// Function to handle the button click and trigger the sliding effect
	const handlePress = (index: number) => {
		setActiveIndex(index);
		Animated.spring(sliderX, {
			toValue: index * 120, // Adjust 120 based on your button width
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={styles.tab}>
			{/* Uncomment and adjust this line to use the animated slider view */}
			{/* <Animated.View style={[styles.slider, { transform: [{ translateX: sliderX }] }]} /> */}
			<TouchableOpacity
				style={[styles.btn, activeIndex === 0 && styles.btn_active]}
				onPress={() => handlePress(0)}
			>
				<Text style={[styles.btn_text, activeIndex === 0 && styles.btn_text_active]}>Daily log</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.btn, activeIndex === 1 && styles.btn_active]}
				onPress={() => handlePress(1)}
			>
				<Text style={[styles.btn_text, activeIndex === 1 && styles.btn_text_active]}>Calendar</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.btn, activeIndex === 2 && styles.btn_active]}
				onPress={() => handlePress(2)}
			>
				<Text style={[styles.btn_text, activeIndex === 2 && styles.btn_text_active]}>Summary</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	btn_text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		color: colors.black,
	},
	btn_text_active: {
		color: colors.white,
	},

	btn: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 6,
		height: 30,
		borderRadius: 6,
		paddingHorizontal: 25,
	},
	btn_active: {
		backgroundColor: colors.accent_blue,
	},
	tab: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 4,
		paddingHorizontal: 3,
		gap: 12,
		height: 38,
		backgroundColor: colors.gray25,
		borderWidth: 1,
		borderColor: colors.gray300,
		borderRadius: 8,
		marginTop: 10,
		marginHorizontal: 20,
	},
	slider: {
		width: 120, // Adjust as per the button width
		height: '100%',
		backgroundColor: colors.accent_blue,
		borderRadius: 6,
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

export default TabToggle;
