import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ColorSchemeName, Platform, useColorScheme, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
	const insets = useSafeAreaInsets();

	// Fallback for Android system navigation bar height
	const androidNavBarHeight = Platform.OS === 'android' ? 48 : 0;
	const bottomInset = Platform.OS === 'android' ? Math.max(insets.bottom, androidNavBarHeight) : insets.bottom;


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
					height: Platform.OS === 'web' 
						? 68 
						: (Platform.OS === 'android' ? 62 + bottomInset : 66 + bottomInset),
					paddingBottom: Platform.OS === 'web' 
						? 6 
						: (Platform.OS === 'android' ? bottomInset + 6 : bottomInset + 4),
					paddingTop: Platform.OS === 'web' ? 6 : 8,
					backgroundColor: colors.white,
					borderTopWidth: 1,
					borderTopColor: colors.gray200,
					elevation: 12,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: -3 },
					shadowOpacity: 0.1,
					shadowRadius: 6,
					...(Platform.OS === 'android' ? {
						position: 'absolute',
						bottom: 0,
					} : {}),
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600',
					marginTop: 2,
				},
				tabBarIconStyle: {
					width: 28,
					height: 28,
				},
				tabBarItemStyle: {
					paddingVertical: Platform.OS === 'web' ? 0 : 4,
				},
			}}>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Home',
					headerTitle: '',
					tabBarIcon: ({ color }) => (
						<HomeIcon size={28} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Attendance"
				component={Attendance}
				options={{
					title: 'Attendance',
					headerTitle: '',
					headerShown: true,
					headerLeft: () => renderHeaderLeft("Attendance overview", styles.back_btn_text),
					tabBarIcon: ({ color }) => (
						<AttendanceIcon size={28} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={Profile}
				options={{
					title: 'Profile',
					headerTitle: '',
					headerShown: true,
					headerLeft: () => renderHeaderLeft("Profile", styles.back_btn_text),
					tabBarIcon: ({ color }) => (
						<LeaveIcon size={28} color={color} />
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
