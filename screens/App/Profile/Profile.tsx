import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRefresh } from '@/Context/RefreshContext';
import { colors } from '@/css/colorsIndex';
import { RightGrayAngle } from '@/assets/svg/RightGrayAngle';
import { ProfileCamera } from '@/assets/svg/ProfileCamera';
import { logoutUser } from '@/slices/authSlice';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '@/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/utils/store';
import { getUserProfile } from '@/features/Profile/profileSlice';
import { Skeleton } from '@rneui/base';
import Header from '@/components/Header';

// Define type for the Profile component props
type ProfileProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};
const Profile: React.FC<ProfileProps> = ({ navigation }) => {
	const { refreshing, onRefresh } = useRefresh();
	const dispatch = useDispatch<any>();
	const { profileData, profileIsLoading, imageIsSuccess } = useAppSelector((state: RootState) => state.profile);
	const user = profileData?.user;
	const profileImage = { uri: profileData?.user?.profileImage?.url };
	const handleSignOut = () => {
		Alert.alert(
			"Are you sure you want to sign out?",
			"",
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () => dispatch(logoutUser()),
				},
			]
		);
	};


	useEffect(() => {
		if (!profileData || imageIsSuccess) {
			dispatch(getUserProfile());
		}
	}, [dispatch, profileData, imageIsSuccess]);



	const handlePress = () => {
		navigation.navigate('ChangePassword')
	};
	const handleManage = () => {
		navigation.navigate('NotificationsSettings')
	};
	const handleChangeProfile = () => {
		navigation.navigate('ChangeProfilePicture')
	};


	return (
		<View style={styles.headerContainer}>
			{/* <Header text={'My profile'} /> */}
			<View style={styles.container}>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={styles.scrollViewContent}>
					<View style={styles.top_container}>
						<View style={styles.personalDetailsContainer}>
							<View style={styles.profileImageContainerMain}>
								<View style={styles.skeletonContainer}>
									{profileIsLoading ? <Skeleton circle width={48} height={48} /> :
										<TouchableOpacity style={styles.profileImageContainer} onPress={handleChangeProfile}>
											<Image source={profileImage} style={styles.image} />
											<View style={styles.profileImage}>
												<ProfileCamera />
											</View>
										</TouchableOpacity>}
									<View style={styles.profileText}>
										{profileIsLoading ? <Skeleton width={60} height={15} /> :
											<Text style={styles.text}>Hi,</Text>}
										{profileIsLoading ? <Skeleton width={120} height={15} /> :
											<Text style={styles.textsub}>
												{user?.firstName || "N/A"} {user?.lastName || "N/A"}
											</Text>}
									</View>
								</View>


							</View>
							{profileIsLoading ? <Skeleton width={"100%"} height={15} /> :
								<View style={styles.passwordsContainerMain}>
									<Text style={styles.passwordLabelText}>Username:</Text>
									<Text style={styles.passwordDotsText}>{user?.username || "N/A"}</Text>
								</View>}
							{profileIsLoading ? <Skeleton width={"100%"} height={15} /> :
								<View style={styles.passwordsContainerMain}>
									<Text style={styles.passwordLabelText}>Job position:</Text>
									<Text style={styles.passwordDotsText}>{user?.role || "N/A"}</Text>
								</View>}
							{profileIsLoading ? <Skeleton width={"100%"} height={15} /> :
								<View style={styles.passwordsContainerMain}>
									<Text style={styles.passwordLabelText}>Department:</Text>
									<Text style={styles.passwordDotsText}>{user?.department || "N/A"}</Text>
								</View>}
						</View>

						<View style={styles.passwordsContainer}>
							{profileIsLoading ? <Skeleton width={"100%"} height={15} /> :
								<TouchableOpacity style={styles.passwordsContainerMain} onPress={handlePress}>
									<Text style={styles.passwordLabelText}>Password:</Text>
									<View style={styles.passwordTextContainer}>
										<Text style={styles.passwordDotsText}>******</Text>
										<RightGrayAngle />
									</View>
								</TouchableOpacity>}
						</View>

						<TouchableOpacity style={styles.manageContainer} onPress={handleManage}>
							<Text style={styles.manageNotificationsText}>Manage notifications</Text>
							<RightGrayAngle />
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.Setting_Edit_container_List} onPress={handleSignOut}>
						<Text style={styles.Setting_Edit_text_list}>Sign out</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</View>

	)
}

export default Profile

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1
	},
	profileText: {
		gap: 2
	},

	skeletonContainer: {
		flexDirection: "row",
		gap: 10
	},

	textsub: {
		height: 24,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 24,
		color: colors.gray900,
	},
	image: {
		width: 48,
		height: 48,
		borderRadius: 50
	},
	text: {
		width: 16,
		height: 14,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 14,
		color: colors.gray500,
	},
	Setting_Edit_text_list: {
		color: colors.red,
		fontSize: 14,
		fontFamily: "Inter",
		textAlign: "center",
		fontWeight: "800"
	},

	Setting_Edit_container_List: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 15,
		backgroundColor: "#FFCDD2",
		gap: 4,
		borderRadius: 10,
		marginTop: 50,
		marginHorizontal: 20
	},

	profileImageContainerMain: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},

	profileImage: {
		position: "absolute",
		right: -5,
		bottom: 0,
	},
	profileImageContainer: {
		position: "relative",
	},

	passwordsContainerMain: {
		flexDirection: 'row',
		justifyContent: "space-between",
		width: "100%"
	},
	passwordDotsText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		color: colors.gray800,
	},
	passwordTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5
	},

	passwordLabelText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 12,
		color: colors.gray500,
		alignSelf: 'center',
	},
	manageNotificationsText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		color: colors.gray800,
		alignSelf: 'center',
	},
	manageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
		padding: 16,
		gap: 20,
		width: "100%",
		height: 52,
		backgroundColor: colors.white,
		borderRadius: 8,
	},
	passwordsContainer: {
		flexDirection: 'column',
		padding: 16,
		width: "100%",
		backgroundColor: colors.white,
		borderRadius: 8,
		gap: 18
	},
	top_container: {
		marginHorizontal: 20,
		marginTop: 16,
		gap: 16
	},
	personalDetailsContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: 16,
		gap: 20,
		width: "100%",
		height: 192,
		backgroundColor: colors.white,
		borderRadius: 8,
	},

	scrollViewContent: {
		paddingBottom: 100,
	},
	container: {
		flexGrow: 1,
		paddingTop: 10,
		backgroundColor: colors.background,
	}
})