import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import Colors from '@/constants/Colors';
import { colors } from '@/css/colorsIndex';


const BarCodeCamera: React.FC = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		const requestPermission = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		requestPermission();
	}, []);

	const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
		setScanned(true);
		alert(`Scanned barcode of type ${type}: ${data}`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission...</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.headerContainer}>
			<View style={styles.container}>
				<CameraView
					style={styles.camera}
					onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
					barcodeScannerSettings={{
						barcodeTypes: ['qr', 'pdf417'], // or add 'code128', 'ean13', etc.
					}}
				/>

				{scanned && (
					<Button title="Scan Again" onPress={() => setScanned(false)} />
				)}

				<View style={styles.subContainer}>
					<View style={styles.photo_container}>
						<Text style={styles.text_take}>Take a photo</Text>
						<Text style={styles.text_take_sub}>
							Take a photo at your designated place of work, ensure it's well lit
						</Text>
					</View>

					<TouchableOpacity style={styles.buttonContainer}>
						<Text style={styles.text}>Take photo</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
	},
	buttonContainer: {
		backgroundColor: colors.accent_blue,
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 16,
	},
});

export default BarCodeCamera;
