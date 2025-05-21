import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType, useCameraPermissions, CameraCapturedPicture, CameraView } from "expo-camera";
import { PhotoFrameAvater } from "@/assets/svg/PhotoFrameAvater";
import { colors } from "@/css/colorsIndex";
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, ActivityIndicator } from "react-native";
import { Camera as CameraIcon } from "@/assets/svg/Camera";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { profileImage, reset } from "@/features/Profile/profileSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/utils/store";

// Define type for the Change Profile With Camera component props
type ChangeProfileWithCameraProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, "ChangeProfileWithCamera">;
};

const ChangeProfileWithCamera: React.FC<ChangeProfileWithCameraProps> = ({ navigation }) => {
	const { imageIsError, imageIsSuccess, imageIsLoading, imageMessage } = useAppSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();
	const [permission, requestPermission] = useCameraPermissions();
	const [photoUri, setPhotoUri] = useState<string | null>(null);
	const cameraRef = useRef<null>(null);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container_one}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
					<Text style={styles.permissionText}>Grant Permission</Text>
				</TouchableOpacity>
			</View>
		);
	}

	async function takePhoto() {
		if (cameraRef.current) { //  @ts-ignore   
			const photoData: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
			setPhotoUri(photoData.uri);
		}
	}




	const uploadImage = async () => {
		if (!photoUri) {
			Alert.alert('No image selected', 'Please select an image first.');
			return;
		}
		const formData = new FormData();
		const fileUri = photoUri;
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
		<View style={styles.container}>
			{/* Camera Component */}
			<CameraView
				facing={"front"}
				style={styles.camera}
				ref={cameraRef}
			/>

			{/* Preview of the captured image */}
			{photoUri && (
				<View style={styles.previewContainer}>
					<Image source={{ uri: photoUri }} style={styles.previewImage} />
				</View>
			)}

			<View style={styles.container_sub_one}>
				<View style={styles.frameTop}>
					<Text style={styles.title}>Center your face into the frame</Text>
				</View>
				{/* <View style={styles.frameSideContainer}> */}
				{/* <View style={styles.frameSide} /> */}
				{/* <View style={styles.frameContainer}>
						<PhotoFrameAvater />
					</View> */}
				{/* <View style={styles.frameSide} /> */}
				{/* </View> */}
			</View>

			<View style={styles.container_sub_two}>
				{/* Capture button */}
				<View style={styles.controls}>
					{photoUri ? <TouchableOpacity style={styles.btn_colored} onPress={uploadImage}
						disabled={imageIsLoading}>
						<Text style={styles.btn_colored_text}>
							{imageIsLoading ? (
								<ActivityIndicator color={colors.white} size="small" />
							) : (
								<Text style={styles.btn_colored_text}>Upload Image</Text>
							)}
						</Text>
					</TouchableOpacity> : <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
						<CameraIcon />
					</TouchableOpacity>}
				</View>
			</View>
		</View>
	);
};

export default ChangeProfileWithCamera;

const styles = StyleSheet.create({
	container_one: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#f9f9f9',
	},
	message: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
		marginBottom: 20,
		lineHeight: 24,
	},
	permissionButton: {
		backgroundColor: '#4CAF50',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	permissionText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
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

	btn_colored_text: {
		fontFamily: 'Inter',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: colors.white,
	},
	frameTop: {
		width: "100%",
		// backgroundColor: "rgba(16, 24, 40, 0.4)",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 50,
	},
	frameSideContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",

	},
	title: {
		width: 180,
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 16,
		textAlign: "center",
		letterSpacing: -0.01,
		color: colors.gray25,
	},
	container_sub_one: {
		width: "100%",
	},
	container_sub_two: {
		height: "90%",
		// backgroundColor: "rgba(16, 24, 40, 0.4)",
		position: "relative",
	},
	frameSide: {
		width: "20%",
		height: 240,
		backgroundColor: "rgba(16, 24, 40, 0.4)",
	},
	frameContainer: {
		height: 240,
		borderRadius: 10,
		overflow: "hidden",
	},
	container: {
		flex: 1,
	},

	camera: {
		flex: 1,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	controls: {
		position: "absolute",
		bottom: 120,
		width: "100%",
		alignItems: "center",
		zIndex: 3,
	},
	captureButton: {
		width: 70,
		height: 70,
		backgroundColor: colors.white,
		borderRadius: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	previewContainer: {
		position: "absolute",
		top: 40,
		right: 20,
		width: 100,
		height: 150,
		borderWidth: 2,
		backgroundColor: colors.white,
		borderRadius: 10,
		overflow: "hidden",
	},
	previewImage: {
		width: "100%",
		height: "100%",
	},
});
