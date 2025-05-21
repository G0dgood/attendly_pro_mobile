import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import ClockIn from '@/screens/App/Clockin/ClockIn';
import { RootStackParamList } from '@/types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '@/css/colorsIndex';
import Notifications from '@/screens/App/Notifications/Notifications';
import Profile from '@/screens/App/Profile/Profile';
import ChangePassword from '@/screens/App/Profile/ChangePassword';
import Success from '@/screens/App/Profile/Success';
import NotificationsSettings from '@/screens/App/Profile/NotificationsSettings';
import ChangeProfilePicture from '@/screens/App/Profile/ChangeProfilePicture';
import ChangeProfileWithCamera from '@/screens/App/Profile/ChangeProfileWithCamera';
import SuccessProfile from '@/screens/App/Profile/SuccessProfile';

// Define the type for the stack navigator's routes 
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();



	const headerRight = (text: string, style: object, moves: string | any) => (
		<TouchableOpacity onPress={() => {
			navigation.navigate(moves);
		}}>
			<Text style={style}>{text}</Text>
		</TouchableOpacity>
	);


	return (
		<Stack.Navigator
			initialRouteName="Root"
			screenOptions={{
				headerShown: false,
				headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Inter' },
			}}
		>
			<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="Notifications" component={Notifications} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ChangePassword" component={ChangePassword} />
			<Stack.Screen name="ChangeProfilePicture" component={ChangeProfilePicture} />

			<Stack.Screen name="ChangeProfileWithCamera" component={ChangeProfileWithCamera} />
			<Stack.Screen name="NotificationsSettings" component={NotificationsSettings} />
			<Stack.Screen name="Success" component={Success} options={{
				headerRight: () => headerRight("Done", styles.done, "Profile")
			}} />
			<Stack.Screen name="SuccessProfile" component={SuccessProfile} options={{
				headerRight: () => headerRight("Done", styles.done, "Homeanek00")
			}} />
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="ClockIn" component={ClockIn} />

			</Stack.Group>
		</Stack.Navigator>
	);
};

export default RootNavigator;

const styles = StyleSheet.create({

	done: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 28,
		color: colors.accent_blue,
	},

	back_btn_text_white: {
		color: colors.white,
	},
	back_btn_text: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 28,
		color: colors.gray900,
		textAlign: 'center',
	},
	back_btn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15.5
	},
});
