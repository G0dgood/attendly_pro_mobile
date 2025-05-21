import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@/css/colorsIndex';

interface PasswordInputProps {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
	showPasswordToggle?: boolean;
	onTogglePassword?: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	placeholder,
	value,
	onChangeText,
	secureTextEntry = false,
	showPasswordToggle = false,
	onTogglePassword,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={[styles.container, isFocused && styles.activeContainer]}>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor="#667085"
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				onFocus={() => setIsFocused(true)}
				// onBlur={() => {
				//   setTimeout(() => setIsFocused(false), 5000); // 1 second delay
				// }}
				autoCapitalize="none"
			/>
			{/* {showPasswordToggle && (
				<TouchableOpacity onPress={onTogglePassword} style={styles.iconContainer}>
					<Ionicons
						name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
						size={20}
						color={colors.gray900}
					/>
				</TouchableOpacity>
			)} */}
		</View>
	);
};



const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#D3D3D3',
		borderRadius: 8,
		backgroundColor: colors.white,
		paddingHorizontal: 14,
		paddingVertical: 10,
		height: 44,
	},
	activeContainer: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 14,
		paddingVertical: 10,
		gap: 8,
		backgroundColor: colors.white,
		borderColor: colors.accent_blue_light,
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: '#101828',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 4,
	},
	input: {
		fontFamily: 'Inter,',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 16,
		color: '#667085',
		flexGrow: 1,
	},
	iconContainer: {
		paddingHorizontal: 5,
	},
});

export default PasswordInput;
