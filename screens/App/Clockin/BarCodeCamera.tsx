import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/css/colorsIndex';
import { getUserInfo } from '@/hooks/config';
import { BlackX } from '@/assets/svg/BlackX';
import { baseUrl } from '@/shared/baseUrl';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getLoggedInUserAttendance, handleAttendance, reset } from '@/features/Attendance/attendanceSlice';

const BarCodeCamera = ({ navigation }: any) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const { data, isLoading, handleAttendanceisError, handleAttendanceisSuccess, handleAttendanceisLoading, handleAttendancemessage }: any = useAppSelector((state) => state.attendance);
	const [scanned, setScanned] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | any>(null);
	const [hasClockedIn, setHasClockedIn] = useState(false);
	const [input, setInput] = useState({
		token: "",
		userId: "",
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchUser = async () => {
			const user: any = await getUserInfo();
			if (user) {
				setUserId(user?.data?.user?.id)
			}
		};

		fetchUser();
	}, []);



	// Prefill the form when modal opens
	useEffect(() => {
		if (handleAttendanceisSuccess) {
			Alert.alert('Success', handleAttendancemessage, [
				{
					text: 'OK',
					onPress: () => {
						dispatch(getLoggedInUserAttendance(userId));
						navigation.goBack();
					},
				},
			]);
			dispatch(reset());
		}
	}, [handleAttendanceisSuccess]);



	useEffect(() => {
		if (handleAttendanceisError) {
			Alert.alert('Error', handleAttendancemessage, [
				{ text: 'OK' },
			]);
			dispatch(reset());
		}
	}, [handleAttendanceisError]);

	useEffect(() => {
		if (userId && token) {
			setInput(prev => ({
				...prev,
				token: token,
				userId: userId,
			}));
		}
	}, [token, userId]);


	useEffect(() => {
		const fetchUser = async () => {
			const user: any = await getUserInfo();
			if (user) {

				// Fetch attendance status
				const response = await fetch(`${baseUrl}/api/v1/attendance/${userId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const status = await response.json();
				setHasClockedIn(status?.hasClockedIn);
			}
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const requestPermission = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		requestPermission();
	}, []);

	const handleBarcodeScanned = ({ data }: { type: string; data: string }) => {
		setScanned(true);
		setToken(data);
	};

	const handleClockAction = async () => {
		dispatch(handleAttendance(input));
	};

	const handleClose = () => {
		navigation.goBack();
	};

	// -- UI for permissions or camera issues --
	if (hasPermission === null) {
		return (
			<View style={styles.permissionContainer}>
				<ActivityIndicator size="large" color={colors.accent_blue} />
				<Text style={styles.permissionText}>Requesting Camera Permission...</Text>
			</View>
		);
	}

	if (hasPermission === false) {
		return (
			<View style={styles.permissionContainer}>
				<Ionicons name="camera-outline" size={64} color={colors.accent_blue} />
				<Text style={styles.permissionTitle}>Camera Access Denied</Text>
				<Text style={styles.permissionText}>We need access to your camera to scan QR codes.</Text>
				<TouchableOpacity style={styles.permissionButton} onPress={() => Linking.openSettings()}>
					<Text style={styles.permissionButtonText}>Go to Settings</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
				<BlackX />
			</TouchableOpacity>

			<View style={styles.container}>
				<CameraView
					style={styles.camera}
					onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
					barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417'] }}
				/>

				{scanned && (
					<View>
						<TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
							<Text style={styles.scanAgainText}>Scan Again</Text>
						</TouchableOpacity>

						<View style={styles.subContainer}>
							<View style={styles.photo_container}>
								<Text style={styles.text_take}>
									{hasClockedIn ? 'Scan to Clock Out' : 'Scan to Clock In'}
								</Text>
								<Text style={styles.text_take_sub}>
									Scan the barcode at your designated office location to {hasClockedIn ? 'end your shift' : 'verify your attendance'}.
								</Text>
							</View>

							<TouchableOpacity style={styles.buttonContainer} onPress={handleClockAction}>
								{handleAttendanceisLoading ? (
									<ActivityIndicator color={colors.white} size="small" />
								) : (
									<Text style={styles.text}>{hasClockedIn ? 'Clock Out' : 'Clock In'}</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({

	closeButton: {
		position: 'absolute',
		width: 32,
		height: 30,
		right: 20,
		top: 40,
		backgroundColor: colors.white,
		borderRadius: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		backgroundColor: '#fff',
	},
	permissionTitle: {
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 12,
		textAlign: 'center',
	},
	permissionText: {
		fontSize: 15,
		color: '#555',
		textAlign: 'center',
		marginBottom: 20,
	},
	permissionButton: {
		backgroundColor: colors.accent_blue,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginBottom: 10,
	},
	permissionButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '500',
	},

	headerContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	subContainer: {
		padding: 16,
		backgroundColor: '#fff',
	},
	photo_container: {
		marginBottom: 16,
	},
	text_take: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	text_take_sub: {
		fontSize: 14,
		color: '#555',
		marginTop: 4,
	},
	buttonContainer: {
		backgroundColor: colors.accent_blue,
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 10,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},


	permissionSubtitle: {
		fontSize: 15,
		color: '#4b5563',
		textAlign: 'center',
		marginTop: 8,
		marginBottom: 20,
	},


	scanAgainButton: {
		backgroundColor: '#e5e7eb',
		alignSelf: 'center',
		marginTop: 10,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	scanAgainText: {
		fontWeight: '500',
		color: '#111827',
	},
});

export default BarCodeCamera;

