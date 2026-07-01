import React, { useEffect, useState, useRef } from 'react';
import { Alert, Linking, Platform, TextInput } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/css/colorsIndex';
import { getUserInfo } from '@/hooks/config';
import { BlackX } from '@/assets/svg/BlackX';
import { baseUrl } from '@/shared/baseUrl';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getLoggedInUserAttendance, handleAttendance, reset } from '@/features/Attendance/attendanceSlice';
import jsQR from 'jsqr';

const BarCodeCamera = ({ navigation }: any) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const { data, isLoading, handleAttendanceisError, handleAttendanceisSuccess, handleAttendanceisLoading, handleAttendancemessage }: any = useAppSelector((state) => state.attendance);
	const [scanned, setScanned] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | any>(null);
	const [hasClockedIn, setHasClockedIn] = useState(false);
	const [manualToken, setManualToken] = useState("");
	const [useManual, setUseManual] = useState(false);
	const [scanning, setScanning] = useState(false);
	const [input, setInput] = useState({
		token: "",
		userId: "",
	});

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestRef = useRef<number | null>(null);
	const dispatch = useAppDispatch();

	const showAlert = (title: string, message: string, buttons?: any[]) => {
		alert(`${title ? title + ': ' : ''}${message}`);
		if (buttons && buttons.length > 0 && buttons[0].onPress) {
			buttons[0].onPress();
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			const user: any = await getUserInfo();
			if (user) {
				const uId = user?.data?.user?.id;
				const userJwtToken = user?.token;
				setUserId(uId);
				
				if (uId && userJwtToken) {
					try {
						// Fetch attendance status
						const response = await fetch(`${baseUrl}/api/v1/attendance/${uId}`, {
							headers: { Authorization: `Bearer ${userJwtToken}` },
						});
						const status = await response.json();
						setHasClockedIn(status?.hasClockedIn);
					} catch (err) {
						console.error("Error fetching attendance status:", err);
					}
				}
			}
		};

		fetchUser();
	}, []);

	// Prefill the form when modal opens
	useEffect(() => {
		if (handleAttendanceisSuccess) {
			showAlert('Success', handleAttendancemessage, [
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
			showAlert('Error', handleAttendancemessage, [
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

	const tick = () => {
		if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
			const videoWidth = videoRef.current.videoWidth;
			const videoHeight = videoRef.current.videoHeight;

			let canvasElement = canvasRef.current;
			if (!canvasElement) {
				canvasElement = document.createElement('canvas');
			}
			canvasElement.width = videoWidth;
			canvasElement.height = videoHeight;

			const canvasContext = canvasElement.getContext('2d');
			if (canvasContext) {
				canvasContext.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
				const imageData = canvasContext.getImageData(0, 0, videoWidth, videoHeight);
				const code = jsQR(imageData.data, imageData.width, imageData.height, {
					inversionAttempts: "dontInvert",
				});

				if (code) {
					setToken(code.data);
					setScanned(true);
					stopCamera();
					return;
				}
			}
		}
		requestRef.current = requestAnimationFrame(tick);
	};

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' }
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.setAttribute("playsinline", "true");
				videoRef.current.play();
				setScanning(true);
				setHasPermission(true);
				requestRef.current = requestAnimationFrame(tick);
			}
		} catch (err) {
			console.error("Error accessing camera:", err);
			setHasPermission(false);
		}
	};

	const stopCamera = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			const tracks = stream.getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}
		if (requestRef.current) {
			cancelAnimationFrame(requestRef.current);
		}
		setScanning(false);
	};

	useEffect(() => {
		if (!useManual) {
			startCamera();
		} else {
			stopCamera();
		}
		return () => {
			stopCamera();
		};
	}, [useManual]);

	const handleClockAction = async () => {
		const payload = useManual 
			? { token: manualToken, userId } 
			: input;
		dispatch(handleAttendance(payload));
	};

	const handleClose = () => {
		navigation.goBack();
	};

	if (hasPermission === false && !useManual) {
		return (
			<View style={styles.permissionContainer}>
				<Ionicons name="camera-outline" size={64} color={colors.accent_blue} />
				<Text style={styles.permissionTitle}>Camera Access Required</Text>
				<Text style={styles.permissionText}>We need access to your camera to scan QR codes.</Text>
				<TouchableOpacity style={styles.permissionButton} onPress={() => setUseManual(true)}>
					<Text style={styles.permissionButtonText}>Enter Token Manually</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
				<BlackX />
			</TouchableOpacity>

			{useManual ? (
				<View style={styles.webContainer}>
					<View style={styles.webForm}>
						<Text style={styles.webTitle}>
							{hasClockedIn ? 'Clock Out' : 'Clock In'} (Web)
						</Text>
						<Text style={styles.webSubtitle}>
							Enter the QR code token displayed on the Admin Dashboard to clock {hasClockedIn ? 'out' : 'in'}.
						</Text>
						<TextInput
							style={styles.webInput}
							placeholder="Paste QR Code Token here..."
							value={manualToken}
							onChangeText={(text) => {
								setManualToken(text);
								setToken(text);
							}}
						/>
						<TouchableOpacity 
							style={[styles.buttonContainer, { marginTop: 24, width: '100%' }]} 
							onPress={handleClockAction}
							disabled={!manualToken || handleAttendanceisLoading}
						>
							{handleAttendanceisLoading ? (
								<ActivityIndicator color={colors.white} size="small" />
							) : (
								<Text style={styles.text}>{hasClockedIn ? 'Clock Out' : 'Clock In'}</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity style={styles.toggleButton} onPress={() => setUseManual(false)}>
							<Text style={styles.toggleButtonText}>Switch to Camera Scanner</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View style={styles.container}>
					{hasPermission === null && (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color={colors.accent_blue} />
							<Text style={styles.loadingText}>Initializing Scanner...</Text>
						</View>
					)}
					
					<View style={styles.videoWrapper}>
						<video
							ref={videoRef as any}
							style={styles.video}
							playsInline
						/>
					</View>

					{scanned && (
						<View style={styles.scannedContainer}>
							<TouchableOpacity onPress={() => { setScanned(false); startCamera(); }} style={styles.scanAgainButton}>
								<Text style={styles.scanAgainText}>Scan Again</Text>
							</TouchableOpacity>

							<View style={styles.subContainer}>
								<View style={styles.photo_container}>
									<Text style={styles.text_take}>
										{hasClockedIn ? 'Scan to Clock Out' : 'Scan to Clock In'}
									</Text>
									<Text style={styles.text_take_sub}>
										Scanned token: {token?.substring(0, 15)}... Click button below to complete shift action.
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

					{!scanned && (
						<TouchableOpacity style={styles.manualEntryButton} onPress={() => setUseManual(true)}>
							<Text style={styles.manualEntryText}>Manual Code Entry</Text>
						</TouchableOpacity>
					)}
				</View>
			)}
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
		zIndex: 10,
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
		backgroundColor: '#000',
	},
	videoWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	video: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		zIndex: 2,
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: '#555',
	},
	scannedContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	subContainer: {
		paddingVertical: 16,
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
	scanAgainButton: {
		backgroundColor: '#e5e7eb',
		alignSelf: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		marginBottom: 10,
	},
	scanAgainText: {
		fontWeight: '500',
		color: '#111827',
	},
	manualEntryButton: {
		position: 'absolute',
		bottom: 40,
		alignSelf: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	manualEntryText: {
		fontWeight: '600',
		color: colors.accent_blue,
	},
	webContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 24,
		paddingTop: 80,
	},
	webForm: {
		width: '100%',
		maxWidth: 400,
		alignItems: 'center',
	},
	webTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: colors.gray900,
		marginBottom: 12,
		textAlign: 'center',
	},
	webSubtitle: {
		fontSize: 14,
		color: colors.gray500,
		textAlign: 'center',
		marginBottom: 24,
		lineHeight: 20,
	},
	webInput: {
		width: '100%',
		height: 48,
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#111827',
		backgroundColor: '#f9fafb',
	},
	toggleButton: {
		marginTop: 20,
		padding: 10,
	},
	toggleButtonText: {
		color: colors.accent_blue,
		fontWeight: '600',
		fontSize: 14,
	},
});

export default BarCodeCamera;
