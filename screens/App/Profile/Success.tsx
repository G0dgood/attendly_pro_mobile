import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/css/colorsIndex'
import { Successful } from '@/assets/svg/Successful'
import { NavigationProp, StackActions } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import HeaderRight from '@/components/HeaderRight';

// Define the prop types for the component
type SuccessProps = {
	navigation: NavigationProp<RootStackParamList, "Success">;
};

const Success: React.FC<SuccessProps> = ({ navigation }) => {
	const headerMove = () => {
		navigation.dispatch(StackActions.replace("Profile"));
	};

	return (
		<View style={styles.headerContainer}>
			<HeaderRight text="Done" headerMove={headerMove} />
			<View style={styles.container}>
				<View style={styles.Successfulcontainer}>
					<Text style={styles.successText}>Successful</Text>
					<Text style={styles.passwordUpdateText}>You're password has been updated</Text>
					<View style={styles.Successful}>
						<Successful />
					</View>
				</View>
			</View>
		</View>
	)
}

export default Success

const styles = StyleSheet.create({

	headerContainer: {
		flex: 1
	},
	Successful: {
		marginTop: 24
	},

	Successfulcontainer: {
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 80,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		gap: 8,
		width: "100%",
		alignSelf: 'stretch',
		flexGrow: 0,
		zIndex: 1,
	},
	passwordUpdateText: {
		width: 233,
		height: 20,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 20,
		textAlign: 'center',
		color: colors.gray500,
	},
	successText: {
		width: 158,
		height: 38,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 30,
		lineHeight: 38,
		textAlign: 'center',
		letterSpacing: -0.01,
		color: colors.gray900,
	},
	container: {
		flexGrow: 1,
		paddingTop: Platform.OS === "android" ? 40 : 10,
		backgroundColor: colors.background,

	}
})