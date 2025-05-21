import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../css/colorsIndex'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';





// Define type for the BottomButton component props
type BottomButtonProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
	isLoading: boolean; // Indicates if the button is in a loading state
	handleSubmit: any; // Indicates if the button is in a loading state
};

const BottomButton: React.FC<BottomButtonProps> = ({ navigation, isLoading, handleSubmit }) => {
	const handleBack = () => {
		navigation.goBack();
	};


	return (
		<View style={[styles.container_back_next]}>
			<TouchableOpacity style={styles.button} onPress={handleBack}>
				<Text style={styles.text}>Cancel</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button_active} onPress={handleSubmit}>
				{isLoading ?
					<ActivityIndicator color='white' size={20} /> :
					<Text style={styles.text_active}>
						Apply
					</Text>}
			</TouchableOpacity>
		</View>
	)

}

export default BottomButton



const styles = StyleSheet.create({

	text: {
		width: 53,
		height: 24,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.accent_blue,
	},

	text_active: {
		width: 53,
		height: 24,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.white,
	},

	button_active: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 18,
		width: "50%",
		height: 44,
		backgroundColor: colors.accent_blue,
		borderWidth: 1,
		borderColor: colors.accent_blue,
		borderRadius: 8,
		shadowColor: '#101828',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2, // Shadow for Android
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 18,
		width: "50%",
		height: 44,
		borderWidth: 1,
		borderColor: colors.accent_blue,
		borderRadius: 8,
		boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
		elevation: 2,
	},
	container_back_next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		paddingTop: 30,
		paddingBottom: Platform.OS === 'ios' ? 50 : 30,
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "rgba(31, 31, 31, 0.08)",
		height: 50,
		zIndex: 100,
		gap: 10,
	},
	buttonText: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.005,
		color: colors.white,
	}

})