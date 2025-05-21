import { colors } from '@/css/colorsIndex';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';

interface TextareaProps extends Omit<TextInputProps, 'onChangeText'> {
	label?: string;
	value: string;
	showTopLabel: boolean;
	placeholder: string;
	onChangeText: (text: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({
	onFocus,
	onBlur,
	label,
	value,
	showTopLabel,
	placeholder,
	onChangeText,
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View>
			{showTopLabel ? <Text style={styles.label}>{label}</Text> : ''}
			<TextInput
				{...rest}
				multiline
				numberOfLines={4}
				value={value}
				onChangeText={onChangeText}
				style={[styles.textArea, isFocused && styles.focusedStyle]}
				placeholder={placeholder || 'Enter text'}
				placeholderTextColor="gray"
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</View>
	);
};

export default Textarea;

const styles = StyleSheet.create({
	label: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray800,
	},
	textArea: {
		fontFamily: 'Inter',
		width: "100%",
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		height: 100,
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
	focusedStyle: {
		borderColor: colors.accent_blue,
		borderWidth: 2,
	},
});
