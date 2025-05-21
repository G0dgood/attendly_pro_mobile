import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileImageBig } from '@/assets/svg/ProfileImageBig'
import { colors } from '@/css/colorsIndex'
import { RootStackParamList } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '@/utils/store';
import { useAppSelector } from '@/hooks/hooks';
import { useDispatch } from 'react-redux';
import { profileImage, reset } from '@/features/Profile/profileSlice';
import Header from '@/components/Header';



// Define type for the ChangeProfilePicture component props
type ChangeProfilePictureProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'ChangeProfilePicture'>;
};
const ChangeProfilePicture: React.FC<ChangeProfilePictureProps> = ({ navigation }) => {
	// Redux state and selectors
	const { imageIsError, imageIsSuccess, imageIsLoading, imageMessage } = useAppSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();
	const [imageUri, setImageUri] = useState<string | null>(null);

	// Handle success, error, and reset based on the redux state
	useEffect(() => {
		if (imageIsSuccess) {
			Alert.alert('Success', 'Profile image updated successfully!');
			dispatch(reset());
			navigation.goBack();
		}

		if (imageIsError) {
			Alert.alert('Error', imageMessage || 'An error occurred while updating the profile image.');
			dispatch(reset());
		}
	}, [imageIsSuccess, imageIsError, imageMessage, navigation]);



	// Navigation to camera screen
	const handleChangeProfile = () => {
		navigation.navigate('ChangeProfileWithCamera');
	};

	// Choose image from gallery
	const handleChooseFromGallery = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission required', 'Please grant media library permissions to continue.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected for Expo ImagePicker
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled && result.assets?.length) {
			setImageUri(result.assets[0].uri); // Set image URI after choosing from gallery
		}
	};



	const uploadImage = async () => {
		if (!imageUri) {
			Alert.alert('No image selected', 'Please select an image first.');
			return;
		}
		const formData = new FormData();
		const fileUri = imageUri;
		const fileName = fileUri.split('/').pop(); // Extract the file name from URI

		// Append the image to FormData
		formData.append('profileImage', {
			uri: fileUri,
			type: 'image/jpeg', // MIME type of the file
			name: fileName || 'profile.jpg', // Default file name
		} as any); // Add `as any` if FormData type complains about `uri`

		try {
			// Dispatch the async thunk to upload the image
			//  @ts-ignore   
			dispatch(profileImage(formData));
		} catch (error: any) {
			console.error('Upload Error:', error);
			const errorMessage = error?.message || 'An unexpected error occurred during the upload.';
			Alert.alert('Upload Failed', errorMessage);
		}
	};



	return (
		<View style={styles.headerContainer}>
			<Header text={'Change Profile Picture'} />
			<View style={styles.container}>
				<View style={styles.containerSub}>
					{/* Assuming ProfileImageBig is another component to show the profile image */}
					{imageUri ? (
						<Image source={{ uri: imageUri }} style={styles.profileImage} />
					) : (
						<ProfileImageBig />
					)}


					<View style={styles.btn_colored_container}>
						<TouchableOpacity style={styles.btn_colored} onPress={handleChangeProfile}>
							<Text style={styles.btn_colored_text}>Take a Photo</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btn_outline} onPress={handleChooseFromGallery}>
							<Text style={styles.btn_outline_text}>Choose from gallery</Text>
						</TouchableOpacity>


						{imageUri && <TouchableOpacity style={styles.btn_colored} onPress={uploadImage}
							disabled={imageIsLoading}>
							<Text style={styles.btn_colored_text}>
								{imageIsLoading ? (
									<ActivityIndicator color={colors.white} size="small" />
								) : (
									<Text style={styles.btn_colored_text}>Upload Image</Text>
								)}
							</Text>
						</TouchableOpacity>}


					</View>
				</View>
			</View>
		</View>
	);
};

export default ChangeProfilePicture;

const styles = StyleSheet.create({

	headerContainer: {
		flex: 1,
	},

	profileImage: {
		width: 112,
		height: 112,
		borderRadius: 100,
		marginBottom: 20,
	},

	btn_colored_container: {
		gap: 16
	},

	btn_outline_text: {
		fontFamily: 'Inter',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.accent_blue,
	},

	btn_outline: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 18,
		width: 332,
		height: 44,
		borderWidth: 1,
		borderColor: colors.accent_blue,
		borderRadius: 8,
		shadowColor: 'rgba(16, 24, 40, 0.05)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},


	btn_colored_text: {
		fontFamily: 'Inter',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.white,
	},

	btn_colored: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 18,
		width: 332,
		height: 44,
		backgroundColor: colors.accent_blue,
		borderColor: colors.accent_blue,
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: colors.gray800,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},

	containerSub: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 36,
		paddingHorizontal: 24,
		gap: 40,
		width: "100%",
		zIndex: 2,
		alignSelf: 'stretch',
	},
	container: {
		flexGrow: 1,
		paddingTop: Platform.OS === 'android' ? 40 : 10,
		backgroundColor: colors.background,
	},
})

