import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ColorSchemeName, Platform, useColorScheme, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Home from '@/screens/App/Clockin/Home';
import { RootTabParamList } from '@/types';
import { HomeIcon } from '@/assets/svg/HomeIcon';
import { LeaveIcon } from '@/assets/svg/LeaveIcon';
import { AttendanceIcon } from '@/assets/svg/AttendanceIcon';
import Attendance from '@/screens/App/Attendance/Attendance';
import { Back } from '@/assets/svg/Back';
import { colors } from '@/css/colorsIndex';
import Profile from '@/screens/App/Profile/Profile';



const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomTabNavigator = () => {
	const colorScheme: ColorSchemeName = useColorScheme() || 'light';


	// Shared header button component for going back
	const renderHeaderLeft = (text: string, style: object) => (
		<View style={styles.back_btn} 	>
			<Text style={style}>{text}</Text>
		</View>
	);


	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
				tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
				tabBarStyle: {
					height: Platform.OS === 'android' ? 60 : 80,
					paddingBottom: Platform.OS === 'android' ? 10 : 30,
					paddingTop: 10,
				},
				tabBarLabelStyle: {
					fontSize: 10,
				},
				tabBarIconStyle: {
					width: 20,
					height: 20,
				},
			}}>
			<BottomTab.Screen
				name="Home"
				component={Home}

				options={{
					title: '',
					headerTitle: '',
					tabBarIcon: ({ size, color }) => (
						<HomeIcon size={size} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Attendance"
				component={Attendance}
				options={{
					title: '',
					headerTitle: '',
					headerShown: true,
					headerLeft: () => renderHeaderLeft("Attendance overview", styles.back_btn_text),
					tabBarIcon: ({ size, color }) => (
						<AttendanceIcon size={size} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={Profile}
				options={{
					title: '',
					headerTitle: '',
					headerShown: true,
					headerLeft: () => renderHeaderLeft("Profile", styles.back_btn_text),
					tabBarIcon: ({ size, color }) => (
						<LeaveIcon size={size} color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;


const styles = StyleSheet.create({
	back_btn_text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 28,
		color: colors.gray900,
	},

	back_btn: {
		width: 300,
		marginLeft: 24,
	},
});
