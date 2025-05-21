import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '@/css/colorsIndex';
import { RootStackParamList } from '@/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ModalHeader from '@/components/ModalHeader';
import BarCodeCamera from './BarCodeCamera';


// Define type for the Home component props
type ClockInProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'ClockIn'>;
};

const ClockIn: React.FC<ClockInProps> = ({ navigation }) => {



	return (
		// <View style={styles.headerContainer}>
		// 	<ModalHeader text={'Clock In'} />
		// 	<View style={styles.container}>
		// 		<View style={styles.containerSub}>
		// 			<View style={styles.photo_container}>
		// 				<View>
		// 					<Text style={styles.text_take}>Take a photo</Text>
		// 					<Text style={styles.text_take_sub}>Take a photo at your designated place of work, ensure its well lit</Text>
		// 				</View>
		// 			</View>

		// 			<TouchableOpacity style={styles.buttonContainer}  >
		// 				<Text style={styles.text}>Take photo</Text>
		// 			</TouchableOpacity>
		// 		</View>
		// 	</View>
		// </View>
		<BarCodeCamera />
	);
};

export default ClockIn;

const styles = StyleSheet.create({

	headerContainer: {
		flex: 1,
	},

	photo_container: {
		gap: 56
	},

	text_take_sub: {
		width: 253.5,
		height: 40,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 20,
		textAlign: 'center',
		color: colors.gray500,
	},
	text_take: {
		width: 253.5,
		height: 32,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 24,
		lineHeight: 32,
		textAlign: 'center',
		letterSpacing: -0.01,
		color: colors.gray900,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 18,
		gap: 8,
		width: '100%',
		height: 44,
		backgroundColor: colors.accent_blue,
		borderColor: colors.accent_blue,
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: 'rgba(16, 24, 40, 0.05)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 1,
		shadowRadius: 2,
		elevation: 2,
	},
	text: {
		width: 86,
		height: 24,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.white,
	},

	containerSub: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 24,
		width: '100%',
		height: '100%',
		backgroundColor: colors.white,
		borderRadius: 12,
		paddingVertical: 32,
		paddingHorizontal: 16,
	},
	container: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		flex: 1
	},
});
