import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '@/css/colorsIndex';
import { GrayMail } from '@/assets/svg/GrayMail';

interface Props {
	label: string;
	error?: string;
	showTopLabel?: boolean;
	childholdmain?: any;
	setShowDatePicker?: (show: boolean) => void;
	selectedDate?: string | null;
	placeholder?: string;
	isDate?: string;
}

const DateInput: React.FC<Props> = ({
	label,
	error = '',
	childholdmain,
	showTopLabel = false,
	selectedDate,
	isDate,
	setShowDatePicker
}) => {

	return (
		<View style={[childholdmain]}>
			{showTopLabel && <Text style={styles.label}>{label}</Text>}

			<View style={[styles.text_input, error ? styles.errorBorder : null]}>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => setShowDatePicker && setShowDatePicker(true)} // Corrected to use boolean for setShowDatePicker
				>
					<Text style={[styles.inputText, !selectedDate && styles.placeholder]}>
						{selectedDate ? selectedDate : isDate} {/* Display selected date or placeholder */}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setShowDatePicker && setShowDatePicker(true)}>
					<GrayMail />
				</TouchableOpacity>
			</View>

			{error ? <Text style={styles.errorText}>{error}</Text> : null}
		</View>
	);
};

export default DateInput;

const styles = StyleSheet.create({
	label: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray700,
		marginBottom: 6,
	},
	text_input: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		gap: 8,
		backgroundColor: colors.white,
		borderColor: '#D0D5DD',
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: '#101828',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	inputText: {
		fontSize: 14,
		color: colors.gray800,
	},
	placeholder: {
		color: colors.gray500,
	},
	errorBorder: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},
	datePickerWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	iosPickerContainer: {
		width: '100%',
		alignItems: 'flex-end',
		paddingBottom: 10,
	},
	closeButton: {
		padding: 10,
		backgroundColor: colors.gray200,
		borderRadius: 8,
	},
	closeButtonText: {
		color: colors.gray800,
		fontSize: 14,
		fontWeight: '600',
		borderRadius: 50,
	},
	iosDatePicker: {
		width: '100%',
		alignSelf: 'center',
	},
});
